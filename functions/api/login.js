// 简单的密码哈希
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

// 生成 JWT Token
async function generateToken(payload, secret) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const tokenPayload = {
        ...payload,
        iat: now,
        exp: now + 7 * 24 * 60 * 60 // 7天过期
    };

    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '');
    const encodedPayload = btoa(JSON.stringify(tokenPayload)).replace(/=/g, '');
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signatureInput));
    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function onRequestPost(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        const { email, password } = await context.request.json();

        // 验证必填字段
        if (!email || !password) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '请输入邮箱和密码' 
            }), { status: 400, headers: corsHeaders });
        }

        // 查找用户
        const user = await context.env.DB.prepare(
            'SELECT id, username, email, password FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '邮箱或密码错误' 
            }), { status: 401, headers: corsHeaders });
        }

        // 验证密码
        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== user.password) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '邮箱或密码错误' 
            }), { status: 401, headers: corsHeaders });
        }

        // 生成 JWT Token
        const token = await generateToken(
            { userId: user.id, username: user.username, email: user.email },
            context.env.JWT_SECRET
        );

        return new Response(JSON.stringify({ 
            success: true, 
            message: '登录成功',
            token,
            user: { 
                username: user.username, 
                email: user.email 
            }
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: '服务器错误，请稍后重试' 
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
