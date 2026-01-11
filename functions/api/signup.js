// 简单的密码哈希（生产环境建议用 bcrypt）
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

// 验证 Turnstile
async function verifyTurnstile(token, secret) {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
    });

    return await result.json();
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
        const { username, email, password, 'cf-turnstile-response': turnstileToken } = await context.request.json();

        // 验证必填字段
        if (!username || !email || !password) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '请填写所有必填字段' 
            }), { status: 400, headers: corsHeaders });
        }

        // 验证用户名长度
        if (username.length < 2 || username.length > 20) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '用户名需要2-20个字符' 
            }), { status: 400, headers: corsHeaders });
        }

        // 验证密码长度
        if (password.length < 6) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '密码至少需要6个字符' 
            }), { status: 400, headers: corsHeaders });
        }

        // 验证 Turnstile（如果有）
        if (turnstileToken && context.env.TURNSTILE_SECRET) {
            const turnstileResult = await verifyTurnstile(turnstileToken, context.env.TURNSTILE_SECRET);
            if (!turnstileResult.success) {
                return new Response(JSON.stringify({ 
                    success: false, 
                    message: '人机验证失败，请重试' 
                }), { status: 400, headers: corsHeaders });
            }
        }

        // 检查邮箱是否已存在
        const existingUser = await context.env.DB.prepare(
            'SELECT id FROM users WHERE email = ?'
        ).bind(email).first();

        if (existingUser) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: '该邮箱已被注册' 
            }), { status: 400, headers: corsHeaders });
        }

        // 哈希密码并存储
        const hashedPassword = await hashPassword(password);
        
        const result = await context.env.DB.prepare(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
        ).bind(username, email, hashedPassword).run();

        // 生成 JWT Token
        const token = await generateToken(
            { userId: result.meta.last_row_id, username, email },
            context.env.JWT_SECRET
        );

        return new Response(JSON.stringify({ 
            success: true, 
            message: '注册成功',
            token,
            user: { username, email }
        }), { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Signup error:', error);
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
