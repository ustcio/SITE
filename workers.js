// ================================================================================
// AGI Era Backend API - 完整整合版（支持大文件上传）
// ================================================================================
// 
// 功能模块：
// 1. 通义千问 ChatBot
// 2. 用户注册/登录
// 3. 访客统计 (PV/UV)
// 4. 管理员系统（登录、文件管理）
// 5. Resend 邮件通知
// 6. R2 大文件上传（Multipart Upload）
//
// 域名：
// - https://api.agiera.net (自定义域名)
// - https://visitor-stats.metanext.workers.dev (Workers域名)
//
// ================================================================================

export default {
  async fetch(request, env, ctx) {
    // CORS 预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // ==================== 路由分发 ====================
      
      // --- 原有接口 ---
      if (path === '/api/chat') {
        return await handleChat(request, env);
      }
      if (path === '/api/doubao') {
        return await handleDoubao(request, env);
      }
      if (path === '/api/signup') {
        return await handleSignup(request, env, ctx);
      }
      if (path === '/api/login') {
        return await handleLogin(request, env);
      }
      if (path === '/api/visitor') {
        return await handleVisitor(request, env);
      }
      if (path === '/stats/visit') {
        return await handleStatsVisit(request, env);
      }
      if (path === '/stats/visitor') {
        return await handleStatsGet(request, env);
      }
      
      // --- 管理员接口 ---
      if (path === '/api/admin/login') {
        return await handleAdminLogin(request, env);
      }
      if (path === '/api/admin/verify') {
        return await handleAdminVerify(request, env);
      }
      if (path === '/api/admin/files') {
        return await handleAdminFiles(request, env);
      }
      if (path === '/api/admin/folders') {
        return await handleAdminFolders(request, env);
      }
      if (path.startsWith('/api/admin/folders/')) {
        return await handleAdminFolderAction(request, env, path);
      }
      if (path === '/api/admin/stats') {
        return await handleAdminStats(request, env);
      }
      if (path === '/api/admin/change-password') {
        return await handleAdminChangePassword(request, env);
      }
      
      // --- 大文件上传接口（Multipart Upload） ---
      if (path === '/api/admin/upload/init') {
        return await handleUploadInit(request, env);
      }
      if (path === '/api/admin/upload/part') {
        return await handleUploadPart(request, env);
      }
      if (path === '/api/admin/upload/complete') {
        return await handleUploadComplete(request, env);
      }
      if (path === '/api/admin/upload/abort') {
        return await handleUploadAbort(request, env);
      }
      
      // 文件操作（带ID的动态路由）
      if (path.startsWith('/api/admin/files/')) {
        return await handleAdminFileAction(request, env, path);
      }
      
      // 404
      return jsonResponse({ error: 'Not Found' }, 404);
      
    } catch (error) {
      console.error('Server Error:', error);
      return jsonResponse({ error: 'Internal Server Error', message: error.message }, 500);
    }
  }
};

// ================================================================================
// CORS 处理
// ================================================================================

function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
}

// ================================================================================
// 1. 通义千问 ChatBot
// ================================================================================

async function handleChat(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const { message } = await request.json();
  
  if (!message) {
    return jsonResponse({ success: false, message: 'Message is required' });
  }

  const DASHSCOPE_API_KEY = env.DASHSCOPE_API_KEY;
  
  if (!DASHSCOPE_API_KEY) {
    return jsonResponse({ success: false, message: 'API not configured' });
  }

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are AGI Era AI Assistant, a helpful, harmless, and honest AI assistant. You can help users with coding, analysis, creative writing, and various other tasks. Please respond in the same language as the user.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return jsonResponse({
        success: true,
        reply: data.choices[0].message.content
      });
    } else if (data.error) {
      console.error('Qwen API error:', data.error);
      return jsonResponse({
        success: false,
        message: data.error.message || 'AI service error'
      });
    } else {
      return jsonResponse({
        success: false,
        message: 'Unexpected response from AI'
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    return jsonResponse({
      success: false,
      message: 'Failed to get AI response'
    });
  }
}

// ================================================================================
// 1.1 豆包 ChatBot (火山引擎)
// ================================================================================

async function handleDoubao(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const { prompt, model } = await request.json();
  
  if (!prompt) {
    return jsonResponse({ error: 'Prompt is required' }, 400);
  }

  const DOUBAO_API_KEY = env.DOUBAO_API_KEY;
  
  if (!DOUBAO_API_KEY) {
    return jsonResponse({ error: 'Doubao API key not configured' }, 500);
  }

  // Model mapping - 根据火山引擎实际模型ID调整
  const modelMap = {
    'doubao-2.0-pro': 'Doubao-Seed-2.0-pro',
    'doubao-2.0-code': 'Doubao-Seed-2.0-Code'
  };

  const endpointId = modelMap[model] || 'Doubao-Seed-2.0-pro';

  try {
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DOUBAO_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: endpointId,
        messages: [
          {
            role: 'system',
            content: 'You are AGI Era AI Assistant, a helpful, harmless, and honest AI assistant. You can help users with coding, analysis, creative writing, and various other tasks. Please respond in the same language as the user.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return jsonResponse({
        answer: data.choices[0].message.content
      });
    } else if (data.error) {
      console.error('Doubao API error:', data.error);
      return jsonResponse({
        error: data.error.message || 'AI service error'
      }, 500);
    } else {
      return jsonResponse({
        error: 'Unexpected response from AI'
      }, 500);
    }

  } catch (error) {
    console.error('Doubao chat error:', error);
    return jsonResponse({
      error: 'Failed to get AI response: ' + error.message
    }, 500);
  }
}

// ================================================================================
// 2. 用户注册
// ================================================================================

async function handleSignup(request, env, ctx) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return jsonResponse({ success: false, message: '请填写所有字段' });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';

  try {
    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first();

    if (existing) {
      return jsonResponse({ success: false, message: '该邮箱已注册' });
    }

    const hashedPassword = await hashUserPassword(password);
    const token = generateToken();

    await env.DB.prepare(
      `INSERT INTO users (username, email, password, ip, token, login_count, created_at, last_login) 
       VALUES (?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
    ).bind(username, email, hashedPassword, ip, token).run();

    // 异步发送邮件，不阻塞响应
    ctx.waitUntil(sendRegistrationEmail(username, email, ip, env));

    return jsonResponse({
      success: true,
      token,
      user: { username, email, loginCount: 1 }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return jsonResponse({ success: false, message: '注册失败，请重试' });
  }
}

// ================================================================================
// 3. 用户登录
// ================================================================================

async function handleLogin(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const { email, password } = await request.json();

  if (!email || !password) {
    return jsonResponse({ success: false, message: '请填写邮箱和密码' });
  }

  try {
    const user = await env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    if (!user) {
      return jsonResponse({ success: false, message: '邮箱或密码错误' });
    }

    const isValid = await verifyUserPassword(password, user.password);
    if (!isValid) {
      return jsonResponse({ success: false, message: '邮箱或密码错误' });
    }

    const newLoginCount = user.login_count + 1;
    const newToken = generateToken();

    await env.DB.prepare(
      `UPDATE users SET login_count = ?, last_login = datetime('now'), token = ? WHERE id = ?`
    ).bind(newLoginCount, newToken, user.id).run();

    return jsonResponse({
      success: true,
      token: newToken,
      user: {
        username: user.username,
        email: user.email,
        loginCount: newLoginCount
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return jsonResponse({ success: false, message: '登录失败，请重试' });
  }
}

// ================================================================================
// 4. 访客统计 - 旧版（保留兼容）
// ================================================================================

async function handleVisitor(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
  const today = new Date().toISOString().split('T')[0];

  try {
    const existing = await env.DB.prepare(
      'SELECT id FROM visitors WHERE ip = ? AND date = ?'
    ).bind(ip, today).first();

    if (!existing) {
      await env.DB.prepare(
        'INSERT INTO visitors (ip, date, created_at) VALUES (?, ?, datetime("now"))'
      ).bind(ip, today).run();
    }

    const total = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM visitors'
    ).first();

    const online = await env.DB.prepare(
      `SELECT COUNT(DISTINCT ip) as count FROM visitors 
       WHERE created_at > datetime('now', '-30 minutes')`
    ).first();

    return jsonResponse({
      success: true,
      total: total?.count || 0,
      online: online?.count || 1
    });

  } catch (error) {
    console.error('Visitor error:', error);
    return jsonResponse({ success: true, total: 0, online: 1 });
  }
}

// ================================================================================
// 5. 访客统计 - 新版 PV/UV
// ================================================================================

async function handleStatsVisit(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json().catch(() => ({}));
    const page = body.page || '/';
    const referrer = body.referrer || null;
    const userAgent = body.userAgent || request.headers.get('User-Agent') || '';
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    const visitorId = await generateVisitorId(ip, userAgent);
    const today = new Date().toISOString().split('T')[0];

    // 记录 PV
    await env.DB.prepare(
      `INSERT INTO page_views (page, referrer, visitor_id, created_at) VALUES (?, ?, ?, datetime('now'))`
    ).bind(page, referrer, visitorId).run();

    // 检查并记录 UV
    const existingVisitor = await env.DB.prepare(
      `SELECT id FROM unique_visitors WHERE visitor_id = ? AND date = ?`
    ).bind(visitorId, today).first();

    if (!existingVisitor) {
      await env.DB.prepare(
        `INSERT INTO unique_visitors (visitor_id, date) VALUES (?, ?)`
      ).bind(visitorId, today).run();
    }

    return await getStatsResponse(env);

  } catch (error) {
    console.error('Stats visit error:', error);
    return jsonResponse({ pv: 0, uv: 0 });
  }
}

async function handleStatsGet(request, env) {
  try {
    return await getStatsResponse(env);
  } catch (error) {
    console.error('Stats get error:', error);
    return jsonResponse({ pv: 0, uv: 0 });
  }
}

async function getStatsResponse(env) {
  const pvResult = await env.DB.prepare(`SELECT COUNT(*) as count FROM page_views`).first();
  const uvResult = await env.DB.prepare(`SELECT COUNT(DISTINCT visitor_id) as count FROM unique_visitors`).first();
  return jsonResponse({ pv: pvResult?.count || 0, uv: uvResult?.count || 0 });
}

// ================================================================================
// 6. 管理员登录
// ================================================================================

async function handleAdminLogin(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return jsonResponse({ success: false, message: '请输入用户名和密码' }, 400);
    }

    // 计算密码哈希
    const passwordHash = await hashAdminPassword(password);

    // 从数据库验证
    const user = await env.DB.prepare(
      'SELECT id, username, role FROM admin_users WHERE username = ? AND password_hash = ?'
    ).bind(username, passwordHash).first();

    if (!user) {
      console.log('Admin login failed for:', username);
      return jsonResponse({ success: false, message: '用户名或密码错误' }, 401);
    }

    // 更新最后登录时间
    await env.DB.prepare(
      "UPDATE admin_users SET last_login = datetime('now') WHERE id = ?"
    ).bind(user.id).run();

    // 生成 JWT Token
    const token = await createAdminToken(
      { userId: user.id, username: user.username, role: user.role },
      env.JWT_SECRET || 'agiera-default-jwt-secret-2024'
    );

    console.log('Admin login success:', user.username);

    return jsonResponse({
      success: true,
      token,
      user: { username: user.username, role: user.role }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return jsonResponse({ success: false, message: '服务器错误' }, 500);
  }
}

// ================================================================================
// 7. 验证管理员 Token
// ================================================================================

async function handleAdminVerify(request, env) {
  const authResult = await verifyAdminAuth(request, env);
  
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  return jsonResponse({ success: true, user: authResult.user });
}

// ================================================================================
// 8. 管理员文件列表/上传（小文件直接上传）
// ================================================================================

async function handleAdminFiles(request, env) {
  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  // GET - 获取文件列表
  if (request.method === 'GET') {
    try {
      const url = new URL(request.url);
      const folderId = url.searchParams.get('folder_id') || null;
      
      let files, folders;
      
      if (folderId) {
        // 获取指定文件夹内的文件
        files = await env.DB.prepare(
          'SELECT id, name, type, size, downloads, folder_id, created_at as date FROM files WHERE folder_id = ? ORDER BY created_at DESC'
        ).bind(folderId).all();
        // 获取子文件夹
        folders = await env.DB.prepare(
          'SELECT id, name, parent_id, created_at as date FROM folders WHERE parent_id = ? ORDER BY name ASC'
        ).bind(folderId).all();
      } else {
        // 获取根目录文件（folder_id 为 null）
        files = await env.DB.prepare(
          'SELECT id, name, type, size, downloads, folder_id, created_at as date FROM files WHERE folder_id IS NULL ORDER BY created_at DESC'
        ).all();
        // 获取根目录文件夹
        folders = await env.DB.prepare(
          'SELECT id, name, parent_id, created_at as date FROM folders WHERE parent_id IS NULL ORDER BY name ASC'
        ).all();
      }

      return jsonResponse({
        success: true,
        files: files.results || [],
        folders: folders.results || [],
        currentFolder: folderId
      });
    } catch (error) {
      console.error('Get files error:', error);
      return jsonResponse({ success: false, message: '获取文件列表失败' }, 500);
    }
  }

  // POST - 上传文件到 R2（小文件直接上传，大文件使用 multipart）
  if (request.method === 'POST') {
    try {
      const contentType = request.headers.get('Content-Type') || '';
      const url = new URL(request.url);
      const folderId = url.searchParams.get('folder_id') || null;
      
      if (contentType.includes('multipart/form-data')) {
        // 直接上传（适用于小文件 < 100MB）
        const formData = await request.formData();
        const file = formData.get('file');
        
        if (!file || !(file instanceof File)) {
          return jsonResponse({ success: false, message: '请选择文件' }, 400);
        }
        
        const fileId = crypto.randomUUID();
        const ext = file.name.split('.').pop() || 'bin';
        const storagePath = `uploads/${fileId}.${ext}`;
        
        // 上传到 R2
        if (env.R2) {
          await env.R2.put(storagePath, file.stream(), {
            httpMetadata: {
              contentType: file.type || 'application/octet-stream',
            },
            customMetadata: {
              originalName: file.name,
              uploadedBy: String(authResult.user.userId),
            },
          });
        }
        
        // 保存到数据库（包含 folder_id）
        await env.DB.prepare(
          `INSERT INTO files (id, name, type, size, storage_path, downloads, uploaded_by, folder_id, created_at) 
           VALUES (?, ?, ?, ?, ?, 0, ?, ?, datetime('now'))`
        ).bind(
          fileId,
          file.name,
          ext,
          file.size,
          storagePath,
          authResult.user.userId,
          folderId
        ).run();
        
        return jsonResponse({
          success: true,
          message: '文件上传成功',
          file: { id: fileId, name: file.name, type: ext, size: file.size }
        });
        
      } else {
        // JSON 元数据上传（兼容旧方式）
        const { name, type, size } = await request.json();

        if (!name) {
          return jsonResponse({ success: false, message: '文件名不能为空' }, 400);
        }

        const fileId = crypto.randomUUID();
        const storagePath = `uploads/${fileId}.${type || 'bin'}`;

        await env.DB.prepare(
          `INSERT INTO files (id, name, type, size, storage_path, downloads, uploaded_by, created_at) 
           VALUES (?, ?, ?, ?, ?, 0, ?, datetime('now'))`
        ).bind(
          fileId,
          name,
          type || '',
          size || 0,
          storagePath,
          authResult.user.userId
        ).run();

        return jsonResponse({
          success: true,
          message: '文件记录已创建',
          file: { id: fileId, name, type, size }
        });
      }

    } catch (error) {
      console.error('Upload error:', error);
      return jsonResponse({ success: false, message: '上传失败: ' + error.message }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ================================================================================
// 8.1 管理员文件夹管理
// ================================================================================

async function handleAdminFolders(request, env) {
  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  // GET - 获取所有文件夹（用于移动文件时选择）
  if (request.method === 'GET') {
    try {
      const folders = await env.DB.prepare(
        'SELECT id, name, parent_id, created_at as date FROM folders ORDER BY name ASC'
      ).all();

      return jsonResponse({
        success: true,
        folders: folders.results || []
      });
    } catch (error) {
      console.error('Get folders error:', error);
      return jsonResponse({ success: false, message: '获取文件夹列表失败' }, 500);
    }
  }

  // POST - 创建新文件夹
  if (request.method === 'POST') {
    try {
      const { name, parent_id } = await request.json();

      if (!name || name.trim() === '') {
        return jsonResponse({ success: false, message: '文件夹名称不能为空' }, 400);
      }

      // 检查同级目录下是否有同名文件夹
      const existing = await env.DB.prepare(
        parent_id 
          ? 'SELECT id FROM folders WHERE name = ? AND parent_id = ?'
          : 'SELECT id FROM folders WHERE name = ? AND parent_id IS NULL'
      ).bind(...(parent_id ? [name.trim(), parent_id] : [name.trim()])).first();

      if (existing) {
        return jsonResponse({ success: false, message: '该文件夹已存在' }, 400);
      }

      const folderId = crypto.randomUUID();

      await env.DB.prepare(
        `INSERT INTO folders (id, name, parent_id, created_by, created_at) 
         VALUES (?, ?, ?, ?, datetime('now'))`
      ).bind(
        folderId,
        name.trim(),
        parent_id || null,
        authResult.user.userId
      ).run();

      return jsonResponse({
        success: true,
        message: '文件夹创建成功',
        folder: { id: folderId, name: name.trim(), parent_id: parent_id || null }
      });

    } catch (error) {
      console.error('Create folder error:', error);
      return jsonResponse({ success: false, message: '创建文件夹失败: ' + error.message }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ================================================================================
// 8.2 管理员文件夹操作（重命名/删除）
// ================================================================================

async function handleAdminFolderAction(request, env, path) {
  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  const folderId = path.split('/').pop();

  // GET - 获取文件夹详情
  if (request.method === 'GET') {
    try {
      const folder = await env.DB.prepare(
        'SELECT * FROM folders WHERE id = ?'
      ).bind(folderId).first();

      if (!folder) {
        return jsonResponse({ success: false, message: '文件夹不存在' }, 404);
      }

      // 获取面包屑路径
      const breadcrumbs = await getFolderBreadcrumbs(env, folderId);

      return jsonResponse({
        success: true,
        folder: folder,
        breadcrumbs: breadcrumbs
      });

    } catch (error) {
      console.error('Get folder error:', error);
      return jsonResponse({ success: false, message: '获取文件夹失败' }, 500);
    }
  }

  // PUT - 重命名文件夹
  if (request.method === 'PUT') {
    try {
      const { name } = await request.json();

      if (!name || name.trim() === '') {
        return jsonResponse({ success: false, message: '文件夹名称不能为空' }, 400);
      }

      const folder = await env.DB.prepare(
        'SELECT * FROM folders WHERE id = ?'
      ).bind(folderId).first();

      if (!folder) {
        return jsonResponse({ success: false, message: '文件夹不存在' }, 404);
      }

      // 检查同级目录下是否有同名文件夹
      const existing = await env.DB.prepare(
        folder.parent_id 
          ? 'SELECT id FROM folders WHERE name = ? AND parent_id = ? AND id != ?'
          : 'SELECT id FROM folders WHERE name = ? AND parent_id IS NULL AND id != ?'
      ).bind(...(folder.parent_id ? [name.trim(), folder.parent_id, folderId] : [name.trim(), folderId])).first();

      if (existing) {
        return jsonResponse({ success: false, message: '该文件夹名已存在' }, 400);
      }

      await env.DB.prepare(
        'UPDATE folders SET name = ? WHERE id = ?'
      ).bind(name.trim(), folderId).run();

      return jsonResponse({ success: true, message: '文件夹已重命名' });

    } catch (error) {
      console.error('Rename folder error:', error);
      return jsonResponse({ success: false, message: '重命名失败' }, 500);
    }
  }

  // DELETE - 删除文件夹
  if (request.method === 'DELETE') {
    try {
      const folder = await env.DB.prepare(
        'SELECT * FROM folders WHERE id = ?'
      ).bind(folderId).first();

      if (!folder) {
        return jsonResponse({ success: false, message: '文件夹不存在' }, 404);
      }

      // 检查文件夹是否为空
      const filesInFolder = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM files WHERE folder_id = ?'
      ).bind(folderId).first();

      const subFolders = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM folders WHERE parent_id = ?'
      ).bind(folderId).first();

      if ((filesInFolder?.count || 0) > 0 || (subFolders?.count || 0) > 0) {
        return jsonResponse({ 
          success: false, 
          message: '文件夹不为空，请先删除或移动其中的文件和子文件夹' 
        }, 400);
      }

      // 删除文件夹
      await env.DB.prepare(
        'DELETE FROM folders WHERE id = ?'
      ).bind(folderId).run();

      return jsonResponse({ success: true, message: '文件夹已删除' });

    } catch (error) {
      console.error('Delete folder error:', error);
      return jsonResponse({ success: false, message: '删除失败' }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// 获取文件夹面包屑路径
async function getFolderBreadcrumbs(env, folderId) {
  const breadcrumbs = [];
  let currentId = folderId;

  while (currentId) {
    const folder = await env.DB.prepare(
      'SELECT id, name, parent_id FROM folders WHERE id = ?'
    ).bind(currentId).first();

    if (folder) {
      breadcrumbs.unshift({ id: folder.id, name: folder.name });
      currentId = folder.parent_id;
    } else {
      break;
    }
  }

  return breadcrumbs;
}

// ================================================================================
// 9. 大文件上传 - Multipart Upload（初始化）
// ================================================================================

async function handleUploadInit(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  try {
    const { filename, fileSize, contentType } = await request.json();

    if (!filename) {
      return jsonResponse({ success: false, message: '文件名不能为空' }, 400);
    }

    const fileId = crypto.randomUUID();
    const ext = filename.split('.').pop() || 'bin';
    const storagePath = `uploads/${fileId}.${ext}`;

    // 创建 R2 multipart upload
    const multipartUpload = await env.R2.createMultipartUpload(storagePath, {
      httpMetadata: {
        contentType: contentType || 'application/octet-stream',
      },
      customMetadata: {
        originalName: filename,
        uploadedBy: String(authResult.user.userId),
      },
    });

    // 临时存储上传信息（可以用 KV 或内存，这里简单返回给前端管理）
    return jsonResponse({
      success: true,
      uploadId: multipartUpload.uploadId,
      fileId: fileId,
      storagePath: storagePath,
      filename: filename,
      fileSize: fileSize,
      ext: ext
    });

  } catch (error) {
    console.error('Upload init error:', error);
    return jsonResponse({ success: false, message: '初始化上传失败: ' + error.message }, 500);
  }
}

// ================================================================================
// 10. 大文件上传 - Multipart Upload（上传分片）
// ================================================================================

async function handleUploadPart(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  try {
    const url = new URL(request.url);
    const uploadId = url.searchParams.get('uploadId');
    const partNumber = parseInt(url.searchParams.get('partNumber'));
    const storagePath = url.searchParams.get('storagePath');

    if (!uploadId || !partNumber || !storagePath) {
      return jsonResponse({ success: false, message: '缺少必要参数' }, 400);
    }

    // 获取 multipart upload 对象
    const multipartUpload = env.R2.resumeMultipartUpload(storagePath, uploadId);

    // 上传分片
    const partData = await request.arrayBuffer();
    const uploadedPart = await multipartUpload.uploadPart(partNumber, partData);

    return jsonResponse({
      success: true,
      partNumber: partNumber,
      etag: uploadedPart.etag
    });

  } catch (error) {
    console.error('Upload part error:', error);
    return jsonResponse({ success: false, message: '分片上传失败: ' + error.message }, 500);
  }
}

// ================================================================================
// 11. 大文件上传 - Multipart Upload（完成上传）
// ================================================================================

async function handleUploadComplete(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  try {
    const { uploadId, storagePath, fileId, filename, fileSize, ext, parts } = await request.json();

    if (!uploadId || !storagePath || !parts || !Array.isArray(parts)) {
      return jsonResponse({ success: false, message: '缺少必要参数' }, 400);
    }

    // 获取 multipart upload 对象并完成上传
    const multipartUpload = env.R2.resumeMultipartUpload(storagePath, uploadId);
    
    // parts 格式: [{ partNumber: 1, etag: "xxx" }, ...]
    await multipartUpload.complete(parts);

    // 保存文件记录到数据库
    await env.DB.prepare(
      `INSERT INTO files (id, name, type, size, storage_path, downloads, uploaded_by, created_at) 
       VALUES (?, ?, ?, ?, ?, 0, ?, datetime('now'))`
    ).bind(
      fileId,
      filename,
      ext,
      fileSize,
      storagePath,
      authResult.user.userId
    ).run();

    return jsonResponse({
      success: true,
      message: '文件上传成功',
      file: { id: fileId, name: filename, type: ext, size: fileSize }
    });

  } catch (error) {
    console.error('Upload complete error:', error);
    return jsonResponse({ success: false, message: '完成上传失败: ' + error.message }, 500);
  }
}

// ================================================================================
// 12. 大文件上传 - Multipart Upload（取消上传）
// ================================================================================

async function handleUploadAbort(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  try {
    const { uploadId, storagePath } = await request.json();

    if (!uploadId || !storagePath) {
      return jsonResponse({ success: false, message: '缺少必要参数' }, 400);
    }

    // 取消 multipart upload
    const multipartUpload = env.R2.resumeMultipartUpload(storagePath, uploadId);
    await multipartUpload.abort();

    return jsonResponse({
      success: true,
      message: '上传已取消'
    });

  } catch (error) {
    console.error('Upload abort error:', error);
    return jsonResponse({ success: false, message: '取消上传失败: ' + error.message }, 500);
  }
}

// ================================================================================
// 13. 管理员文件操作（下载/删除）
// ================================================================================

async function handleAdminFileAction(request, env, path) {
  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  const fileId = path.split('/').pop();

  // GET - 下载文件
  if (request.method === 'GET') {
    try {
      const file = await env.DB.prepare(
        'SELECT * FROM files WHERE id = ?'
      ).bind(fileId).first();

      if (!file) {
        return jsonResponse({ success: false, message: '文件不存在' }, 404);
      }

      // 更新下载次数
      await env.DB.prepare(
        'UPDATE files SET downloads = downloads + 1 WHERE id = ?'
      ).bind(fileId).run();

      // 从 R2 获取文件
      if (env.R2 && file.storage_path) {
        const object = await env.R2.get(file.storage_path);
        
        if (object) {
          // 返回真实文件
          const headers = new Headers();
          headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
          headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(file.name)}"`);
          headers.set('Access-Control-Allow-Origin', '*');
          
          return new Response(object.body, { headers });
        }
      }

      // 如果 R2 没有文件，返回文件信息
      return jsonResponse({
        success: true,
        file: file,
        message: '文件元数据（R2中无实际文件）'
      });

    } catch (error) {
      console.error('Download error:', error);
      return jsonResponse({ success: false, message: '下载失败' }, 500);
    }
  }

  // DELETE - 删除文件
  if (request.method === 'DELETE') {
    try {
      const file = await env.DB.prepare(
        'SELECT * FROM files WHERE id = ?'
      ).bind(fileId).first();

      if (!file) {
        return jsonResponse({ success: false, message: '文件不存在' }, 404);
      }

      // 从 R2 删除
      if (env.R2 && file.storage_path) {
        try {
          await env.R2.delete(file.storage_path);
        } catch (e) {
          console.warn('R2 delete warning:', e);
        }
      }

      // 从数据库删除记录
      await env.DB.prepare(
        'DELETE FROM files WHERE id = ?'
      ).bind(fileId).run();

      return jsonResponse({ success: true, message: '文件已删除' });

    } catch (error) {
      console.error('Delete file error:', error);
      return jsonResponse({ success: false, message: '删除失败' }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ================================================================================
// 14. 管理员统计信息
// ================================================================================

async function handleAdminStats(request, env) {
  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  try {
    const fileCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM files'
    ).first();

    const totalSize = await env.DB.prepare(
      'SELECT SUM(size) as total FROM files'
    ).first();

    const totalDownloads = await env.DB.prepare(
      'SELECT SUM(downloads) as total FROM files'
    ).first();

    const lastUpload = await env.DB.prepare(
      'SELECT created_at FROM files ORDER BY created_at DESC LIMIT 1'
    ).first();

    // 用户统计
    const userCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM users'
    ).first();

    // 今日访客
    const todayUV = await env.DB.prepare(
      `SELECT COUNT(DISTINCT visitor_id) as count FROM unique_visitors WHERE date = date('now')`
    ).first();

    return jsonResponse({
      success: true,
      stats: {
        fileCount: fileCount?.count || 0,
        totalSize: totalSize?.total || 0,
        totalDownloads: totalDownloads?.total || 0,
        lastUpload: lastUpload?.created_at || null,
        userCount: userCount?.count || 0,
        todayUV: todayUV?.count || 0
      }
    });

  } catch (error) {
    console.error('Admin stats error:', error);
    return jsonResponse({ success: false, message: '获取统计失败' }, 500);
  }
}

// ================================================================================
// 15. 管理员修改密码
// ================================================================================

async function handleAdminChangePassword(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // 验证管理员身份
  const authResult = await verifyAdminAuth(request, env);
  if (!authResult.success) {
    return jsonResponse({ success: false, message: authResult.message }, 401);
  }

  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return jsonResponse({ success: false, message: '请输入旧密码和新密码' }, 400);
    }

    if (newPassword.length < 8) {
      return jsonResponse({ success: false, message: '新密码至少需要8个字符' }, 400);
    }

    const oldHash = await hashAdminPassword(oldPassword);
    const newHash = await hashAdminPassword(newPassword);

    const result = await env.DB.prepare(
      'UPDATE admin_users SET password_hash = ? WHERE id = ? AND password_hash = ?'
    ).bind(newHash, authResult.user.userId, oldHash).run();

    if (result.changes === 0) {
      return jsonResponse({ success: false, message: '原密码错误' }, 400);
    }

    return jsonResponse({ success: true, message: '密码修改成功' });

  } catch (error) {
    console.error('Change password error:', error);
    return jsonResponse({ success: false, message: '修改失败' }, 500);
  }
}

// ================================================================================
// 邮件发送 (Resend)
// ================================================================================

async function sendRegistrationEmail(username, email, ip, env) {
  console.log('=== sendRegistrationEmail called ===');

  const RESEND_API_KEY = env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return;
  }

  // 1. 给管理员发送通知
  try {
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AGI Era <noreply@agiera.net>',
        to: ['metanext@foxmail.com'],
        subject: '🎉 AGI Era 新用户注册通知',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0b; color: #fafafa;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00d4ff; margin: 0;">AGI Era</h1>
              <p style="color: #71717a; margin-top: 5px;">新用户注册通知</p>
            </div>
            <div style="background: #18181b; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #71717a;">用户名</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fafafa; text-align: right; font-weight: 600;">${username}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #71717a;">邮箱</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00d4ff; text-align: right;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #71717a;">IP 地址</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fafafa; text-align: right; font-family: monospace;">${ip}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #71717a;">注册时间</td>
                  <td style="padding: 12px 0; color: #fafafa; text-align: right;">${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</td>
                </tr>
              </table>
            </div>
            <p style="text-align: center; color: #71717a; font-size: 12px; margin-top: 24px;">此邮件由系统自动发送</p>
          </div>
        `,
      }),
    });
    
    if (adminRes.ok) {
      console.log('Admin notification sent');
    } else {
      console.error('Admin email error:', await adminRes.text());
    }
  } catch (error) {
    console.error('Admin email exception:', error);
  }

  // 2. 给用户发送欢迎邮件
  try {
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AGI Era <noreply@agiera.net>',
        to: [email],
        subject: '🚀 欢迎加入 AGI Era',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0b; color: #fafafa;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00d4ff; margin: 0;">AGI Era</h1>
              <p style="color: #71717a; margin-top: 5px;">欢迎加入我们</p>
            </div>
            <div style="background: #18181b; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #fafafa; font-size: 16px; margin: 0 0 16px 0;">Hi ${username}，</p>
              <p style="color: #a1a1aa; line-height: 1.6; margin: 0 0 16px 0;">感谢你注册 AGI Era！你的账号已创建成功。</p>
              <p style="color: #a1a1aa; line-height: 1.6; margin: 0 0 24px 0;">现在你可以使用我们的 AI 助手、探索最新的 AGI 技术资讯，开启你的智能时代之旅。</p>
              <div style="text-align: center;">
                <a href="https://agiera.net" style="display: inline-block; background: linear-gradient(135deg, #00d4ff, #0099cc); color: #000; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">开始探索</a>
              </div>
            </div>
            <p style="text-align: center; color: #71717a; font-size: 12px; margin-top: 24px;">如果你没有注册过 AGI Era，请忽略此邮件</p>
          </div>
        `,
      }),
    });
    
    if (userRes.ok) {
      console.log('Welcome email sent to:', email);
    } else {
      console.error('User email error:', await userRes.text());
    }
  } catch (error) {
    console.error('User email exception:', error);
  }
}

// ================================================================================
// 工具函数 - 用户密码（带 salt）
// ================================================================================

async function hashUserPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'agi-era-salt-2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyUserPassword(password, hash) {
  const hashedInput = await hashUserPassword(password);
  return hashedInput === hash;
}

function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

// ================================================================================
// 工具函数 - 管理员密码（Base64，与数据库中的格式匹配）
// ================================================================================

async function hashAdminPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return btoa(String.fromCharCode(...hashArray));
}

// ================================================================================
// 工具函数 - 管理员 JWT Token
// ================================================================================

async function createAdminToken(payload, secret) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天过期
  const body = btoa(JSON.stringify({ ...payload, exp }));

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${header}.${body}`)
  );

  return `${header}.${body}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;
}

async function verifyAdminToken(token, secret) {
  try {
    const [header, body, sig] = token.split('.');
    const payload = JSON.parse(atob(body));

    if (payload.exp < Date.now()) {
      return null; // Token 已过期
    }

    return payload;
  } catch {
    return null;
  }
}

// ================================================================================
// 工具函数 - 验证管理员请求
// ================================================================================

async function verifyAdminAuth(request, env) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false, message: '请先登录' };
  }

  const token = authHeader.slice(7);
  const payload = await verifyAdminToken(token, env.JWT_SECRET || 'agiera-default-jwt-secret-2024');

  if (!payload) {
    return { success: false, message: 'Token 已过期，请重新登录' };
  }

  return { success: true, user: payload };
}

// ================================================================================
// 工具函数 - 生成访客ID
// ================================================================================

async function generateVisitorId(ip, userAgent) {
  const data = `${ip}-${userAgent}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
}
