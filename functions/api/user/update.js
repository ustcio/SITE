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

        const { username } = await context.request.json();

        // 验证用户名
        if (!username || username.length < 2 || username.length > 20) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Username must be 2-20 characters' 
            }), { status: 400, headers: corsHeaders });
        }

        // 更新用户名
        await context.env.DB.prepare(
            'UPDATE users SET username = ? WHERE id = ?'
        ).bind(username, payload.userId).run();

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Profile updated successfully',
            user: { username, email: payload.email }
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Update profile error:', error);
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
