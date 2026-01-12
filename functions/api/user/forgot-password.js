// 生成随机重置 token
function generateResetToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

export async function onRequestPost(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        const { email } = await context.request.json();

        if (!email) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Please enter your email' 
            }), { status: 400, headers: corsHeaders });
        }

        // 查找用户
        const user = await context.env.DB.prepare(
            'SELECT id, username, email FROM users WHERE email = ?'
        ).bind(email).first();

        // 即使用户不存在也返回成功（安全考虑，防止邮箱枚举）
        if (!user) {
            return new Response(JSON.stringify({ 
                success: true, 
                message: 'If this email exists, a reset link will be sent' 
            }), { status: 200, headers: corsHeaders });
        }

        // 生成重置 token
        const resetToken = generateResetToken();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1小时后过期

        // 存储重置 token（需要先创建 password_resets 表）
        await context.env.DB.prepare(
            'INSERT OR REPLACE INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)'
        ).bind(user.id, resetToken, expiresAt).run();

        // 发送邮件（使用 Resend）
        if (context.env.RESEND_API_KEY) {
            const resetUrl = `https://agiera.net/reset-password?token=${resetToken}`;
            
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: context.env.FROM_EMAIL || 'noreply@agiera.net',
                    to: email,
                    subject: 'Reset your AGI Era password',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1 style="color: #00d4ff;">AGI Era</h1>
                            <h2>Reset Your Password</h2>
                            <p>Hi ${user.username},</p>
                            <p>You requested to reset your password. Click the button below to create a new password:</p>
                            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00d4ff, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
                            <p>This link will expire in 1 hour.</p>
                            <p>If you didn't request this, you can safely ignore this email.</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                            <p style="color: #666; font-size: 12px;">© 2025 AGI Era. All rights reserved.</p>
                        </div>
                    `
                })
            });
        }

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Password reset link sent to your email' 
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Forgot password error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Server error, please try again' 
        }), { status: 500, headers: corsHeaders });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
