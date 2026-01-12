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

// 密码哈希
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
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

        const { currentPassword, newPassword } = await context.request.json();

        // 验证密码
        if (!currentPassword || !newPassword) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Please fill in all fields' 
            }), { status: 400, headers: corsHeaders });
        }

        if (newPassword.length < 6) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'New password must be at least 6 characters' 
            }), { status: 400, headers: corsHeaders });
        }

        // 获取当前用户
        const user = await context.env.DB.prepare(
            'SELECT id, password FROM users WHERE id = ?'
        ).bind(payload.userId).first();

        if (!user) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'User not found' 
            }), { status: 404, headers: corsHeaders });
        }

        // 验证当前密码
        const hashedCurrentPassword = await hashPassword(currentPassword);
        if (hashedCurrentPassword !== user.password) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Current password is incorrect' 
            }), { status: 400, headers: corsHeaders });
        }

        // 更新密码
        const hashedNewPassword = await hashPassword(newPassword);
        await context.env.DB.prepare(
            'UPDATE users SET password = ? WHERE id = ?'
        ).bind(hashedNewPassword, payload.userId).run();

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Password changed successfully'
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Change password error:', error);
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
