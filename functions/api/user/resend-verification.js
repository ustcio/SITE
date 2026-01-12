// 验证 JWT Token
async function verifyToken(token, secret) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [encodedHeader, encodedPayload, encodedSignature] = parts;
        const signatureInput = `${encodedHeader}.${encodedPayload}`;

        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        const signature = Uint8Array.from(
            atob(encodedSignature.replace(/-/g, '+').replace(/_/g, '/')),
            c => c.charCodeAt(0)
        );

        const valid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(signatureInput));
        
        if (!valid) return null;

        const payload = JSON.parse(atob(encodedPayload));
        
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

// 生成验证 token
function generateVerificationToken() {
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
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    };

    try {
        // 验证 token
        const authHeader = context.request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Unauthorized' 
            }), { status: 401, headers: corsHeaders });
        }

        const token = authHeader.substring(7);
        const payload = await verifyToken(token, context.env.JWT_SECRET);

        if (!payload) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Invalid or expired token' 
            }), { status: 401, headers: corsHeaders });
        }

        // 获取用户信息
        const user = await context.env.DB.prepare(
            'SELECT id, username, email, email_verified FROM users WHERE id = ?'
        ).bind(payload.userId).first();

        if (!user) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'User not found' 
            }), { status: 404, headers: corsHeaders });
        }

        if (user.email_verified) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Email is already verified' 
            }), { status: 400, headers: corsHeaders });
        }

        // 生成验证 token
        const verificationToken = generateVerificationToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24小时后过期

        // 存储验证 token
        await context.env.DB.prepare(
            'INSERT OR REPLACE INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)'
        ).bind(user.id, verificationToken, expiresAt).run();

        // 发送邮件
        if (context.env.RESEND_API_KEY) {
            const verifyUrl = `https://agiera.net/verify-email?token=${verificationToken}`;
            
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: context.env.FROM_EMAIL || 'noreply@agiera.net',
                    to: user.email,
                    subject: 'Verify your AGI Era email',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1 style="color: #00d4ff;">AGI Era</h1>
                            <h2>Verify Your Email</h2>
                            <p>Hi ${user.username},</p>
                            <p>Please click the button below to verify your email address:</p>
                            <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00d4ff, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Verify Email</a>
                            <p>This link will expire in 24 hours.</p>
                            <p>If you didn't create an account, you can safely ignore this email.</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                            <p style="color: #666; font-size: 12px;">© 2025 AGI Era. All rights reserved.</p>
                        </div>
                    `
                })
            });
        }

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Verification email sent'
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Resend verification error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Server error' 
        }), { status: 500, headers: corsHeaders });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
