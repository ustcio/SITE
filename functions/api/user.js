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

        // 还原 signature
        const signature = Uint8Array.from(
            atob(encodedSignature.replace(/-/g, '+').replace(/_/g, '/')),
            c => c.charCodeAt(0)
        );

        const valid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(signatureInput));
        
        if (!valid) return null;

        // 解析 payload
        const payload = JSON.parse(atob(encodedPayload));
        
        // 检查过期
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

export async function onRequestGet(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    };

    try {
        // 从 Authorization header 获取 token
        const authHeader = context.request.headers.get('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '未登录' 
            }), { status: 401, headers: corsHeaders });
        }

        const token = authHeader.substring(7);
        const payload = await verifyToken(token, context.env.JWT_SECRET);

        if (!payload) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Token 无效或已过期' 
            }), { status: 401, headers: corsHeaders });
        }

        // 从数据库获取最新用户信息
        const user = await context.env.DB.prepare(
            'SELECT id, username, email, created_at FROM users WHERE id = ?'
        ).bind(payload.userId).first();

        if (!user) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '用户不存在' 
            }), { status: 404, headers: corsHeaders });
        }

        return new Response(JSON.stringify({ 
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.created_at
            }
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Get user error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: '服务器错误' 
        }), { status: 500, headers: corsHeaders });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
