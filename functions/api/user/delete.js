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

export async function onRequestDelete(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
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

        // 删除用户
        await context.env.DB.prepare(
            'DELETE FROM users WHERE id = ?'
        ).bind(payload.userId).run();

        // 删除相关的密码重置记录
        await context.env.DB.prepare(
            'DELETE FROM password_resets WHERE user_id = ?'
        ).bind(payload.userId).run();

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Account deleted successfully'
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Delete account error:', error);
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
            'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
