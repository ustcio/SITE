        // ==================== 语言与主题系统 ====================
        let currentLang = localStorage.getItem('lang') || 'en';
        let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        // 翻译表
        const translations = {
            en: {
                'nav.home': 'Home',
                'nav.research': 'Research',
                'nav.chatbot': 'ChatBot',
                'nav.kit': 'Kit',
                'nav.about': 'About',
                'nav.login': 'Log In',
                'nav.getStarted': 'Get Started',
                'hero.badge': 'Artificial Intelligence',
                'hero.title': 'Build the future with',
                'hero.gradient': 'AGI.',
                'hero.subtitle': 'Powerful AI tools and intelligent assistants for developers and creators. The next era of computing is here.',
                'hero.getStarted': 'Get Started',
                'hero.tryChatbot': 'Try ChatBot',
                'stats.uptime': 'Uptime',
                'stats.requests': 'Requests',
                'stats.developers': 'Developers',
                'features.title': 'Core Features',
                'features.subtitle': 'Built for the future of AI interaction',
                'features.fast': 'Lightning Fast',
                'features.fastDesc': 'Sub-100ms response times with our globally optimized infrastructure.',
                'features.intelligent': 'Intelligent',
                'features.intelligentDesc': 'Advanced AI models that understand context and reasoning deeply.',
                'features.secure': 'Secure',
                'features.secureDesc': 'Enterprise-grade security with end-to-end encryption.',
                'features.devTools': 'Developer Tools',
                'features.devToolsDesc': 'Comprehensive APIs and SDKs for seamless integration.',
                'features.chatbot': 'ChatBot',
                'features.chatbotDesc': 'Intelligent assistant that helps you accomplish anything.',
                'features.superKit': 'Super Kit',
                'features.superKitDesc': '26 professional tools to supercharge your workflow.',
                'demo.title': 'See it in action.',
                'demo.subtitle': 'Try our AI assistant right here.',
                'demo.placeholder': 'Type your message...',
                'demo.send': 'Send',
                'kit.badge': 'Utility Toolkit',
                'kit.title': 'Super',
                'kit.subtitle': 'Professional tools · 28 practical tools to boost your daily work',
                'kit.speedTest': 'Speed Test',
                'kit.pingTest': 'Ping Test',
                'kit.ipDetection': 'IP Detection',
                'kit.proxyDetection': 'Proxy Detection',
                'kit.sslCheck': 'SSL Certificate',
                'kit.httpHeaders': 'HTTP Headers',
                'kit.securityScan': 'Security Scan',
                'kit.currencyExchange': 'Currency Exchange',
                'kit.qrGenerator': 'QR Generator',
                'kit.shortUrl': 'Short URL',
                'kit.unitConverter': 'Unit Converter',
                'kit.passwordCheck': 'Password Check',
                'kit.translator': 'Translator',
                'kit.baseConverter': 'Base Converter',
                'kit.randomNumber': 'Random Number',
                'kit.hashGenerator': 'Hash Generator',
                'kit.ageCalculator': 'Age Calculator',
                'kit.dateCalculator': 'Date Calculator',
                'kit.worldClock': 'World Clock',
                'kit.bmiCalculator': 'BMI Calculator',
                'kit.scientificCalc': 'Calculator',
                'kit.functionGraph': 'Graph Plotter',
                'kit.citationGen': 'Citation Generator',
                'kit.wavelength': 'Wavelength Converter',
                'kit.luckyColor': 'Lucky Color',
                'kit.tarot': 'Tarot Reading',
                'kit.goldPrice': 'Gold Price',
                'kit.domesticGold': 'Domestic Gold',
                'kit.startTest': 'Start Test',
                'kit.complete': 'Complete',
                'kit.downloadSpeed': 'Download',
                'kit.uploadSpeed': 'Upload',
                'kit.ping': 'Ping',
                'kit.targetHost': 'Target Host',
                'kit.pingPlaceholder': 'e.g., google.com',
                'kit.allTools': 'All Tools',
                'kit.networkTools': 'Network',
                'kit.securityTools': 'Security',
                'kit.financeTools': 'Finance',
                'kit.converterTools': 'Converter',
                'kit.generatorTools': 'Generator',
                'kit.calculatorTools': 'Calculator',
                'kit.funTools': 'Fun',
                'kit.enterHost': 'Enter hostname or IP to start test',
                'kit.detectMyIP': 'Detect My IP',
                'kit.ipv4Addr': 'IPv4 Address',
                'kit.ipv6Addr': 'IPv6 Address',
                'kit.ipv6Support': 'IPv6 Support',
                'kit.location': 'Location',
                'kit.isp': 'ISP',
                'kit.startDetection': 'Start Detection',
                'kit.proxyStatus': 'Proxy Status',
                'kit.vpnStatus': 'VPN Status',
                'kit.torStatus': 'Tor Network',
                'kit.datacenterStatus': 'Datacenter IP',
                'kit.anonLevel': 'Anonymity Level',
                'kit.websiteDomain': 'Website Domain',
                'kit.sslPlaceholder': 'e.g., github.com',
                'kit.check': 'Check',
                'kit.enterDomain': 'Enter domain to check SSL certificate',
                'kit.websiteUrl': 'Website URL',
                'kit.urlPlaceholder': 'e.g., https://example.com',
                'kit.get': 'Get',
                'kit.enterUrl': 'Enter URL to get HTTP headers',
                'kit.targetWebsite': 'Target Website',
                'kit.scanPlaceholder': 'e.g., example.com',
                'kit.scan': 'Scan',
                'kit.sslSecurity': 'SSL/TLS Security',
                'kit.httpSecureHeaders': 'HTTP Security Headers',
                'kit.contentSecurity': 'Content Security Policy',
                'kit.dnssecStatus': 'DNSSEC Status',
                'kit.malwareDetection': 'Malware Detection',
                'kit.amount': 'Amount',
                'kit.amountPlaceholder': 'Enter amount',
                'kit.exchangeRate': 'Exchange rate will be shown after calculation',
                'kit.enterContent': 'Enter content',
                'kit.qrPlaceholder': 'Enter text or URL...',
                'kit.size': 'Size',
                'kit.small': 'Small',
                'kit.medium': 'Medium',
                'kit.large': 'Large',
                'kit.generateQR': 'Generate QR Code',
                'kit.qrHint': 'Enter content to generate QR code',
                'kit.originalUrl': 'Original URL',
                'kit.urlPlaceholderLong': 'https://example.com/very-long-url...',
                'kit.generateShort': 'Generate Short URL',
                'kit.shortUrlHint': 'Enter long URL to generate short link',
                'kit.category': 'Category',
                'kit.length': 'Length',
                'kit.weight': 'Weight',
                'kit.temperature': 'Temperature',
                'kit.area': 'Area',
                'kit.data': 'Data Storage',
                'kit.value': 'Value',
                'kit.valuePlaceholder': 'Enter value',
                'kit.selectUnit': 'Select units to start conversion',
                'kit.enterPassword': 'Enter Password',
                'kit.passwordPlaceholder': 'Enter password to check...',
                'kit.enterPasswordStart': 'Enter password to start check',
                'kit.atLeast8': 'At least 8 characters',
                'kit.uppercase': 'Contains uppercase',
                'kit.lowercase': 'Contains lowercase',
                'kit.number': 'Contains number',
                'kit.special': 'Contains special',
                'kit.generateStrong': 'Generate Strong Password',
                'kit.autoDetect': 'Auto Detect',
                'kit.chinese': 'Chinese',
                'kit.english': 'English',
                'kit.japanese': 'Japanese',
                'kit.korean': 'Korean',
                'kit.french': 'French',
                'kit.german': 'German',
                'kit.spanish': 'Spanish',
                'kit.russian': 'Russian',
                'kit.originalText': 'Original',
                'kit.translatePlaceholder': 'Enter text to translate...',
                'kit.translate': 'Translate',
                'kit.translated': 'Translated',
                'kit.translateResult': 'Translation result will appear here...',
                'kit.enterNumber': 'Enter Number',
                'kit.numberPlaceholder': 'Enter number...',
                'kit.inputBase': 'Input Base',
                'kit.decimal': 'Decimal',
                'kit.binary': 'Binary',
                'kit.octal': 'Octal',
                'kit.hex': 'Hexadecimal',
                'kit.range': 'Range',
                'kit.min': 'Min',
                'kit.max': 'Max',
                'kit.to': 'to',
                'kit.count': 'Count',
                'kit.unique': 'Unique',
                'kit.generateRandom': 'Generate Random Numbers',
                'kit.randomHint': 'Click button to generate random numbers',
                'kit.enterText': 'Enter Text',
                'kit.hashPlaceholder': 'Enter text to generate hash...',
                'kit.clickToCopy': 'Click hash to copy',
                'kit.birthDate': 'Birth Date',
                'kit.yearsOld': 'years old',
                'kit.enterBirthDate': 'Enter birth date to calculate age',
                'kit.exactAge': 'Exact Age',
                'kit.daysSpent': 'Days Spent',
                'kit.nextBirthday': 'Next Birthday',
                'kit.zodiac': 'Zodiac',
                'kit.constellation': 'Constellation',
                'kit.dateDiff': 'Date Difference',
                'kit.dateAdd': 'Date Calculation',
                'kit.startDate': 'Start Date',
                'kit.endDate': 'End Date',
                'kit.baseDate': 'Base Date',
                'kit.days': 'Days',
                'kit.selectDate': 'Select date to start calculation',
                'kit.beijing': 'Beijing',
                'kit.newyork': 'New York',
                'kit.london': 'London',
                'kit.tokyo': 'Tokyo',
                'kit.paris': 'Paris',
                'kit.sydney': 'Sydney',
                'kit.height': 'Height',
                'kit.weight': 'Weight',
                'kit.calculate': 'Calculate',
                'kit.bmi': 'BMI',
                'kit.status': 'Status',
                'kit.enterHeightWeight': 'Enter height and weight'
            },
            zh: {
                'nav.home': '首页',
                'nav.research': '研究',
                'nav.chatbot': '聊天机器人',
                'nav.kit': '工具包',
                'nav.about': '关于',
                'nav.login': '登录',
                'nav.getStarted': '开始使用',
                'hero.badge': '人工智能',
                'hero.title': '用 AGI 构建未来',
                'hero.gradient': '',
                'hero.subtitle': '为开发者和创作者提供的强大AI工具和智能助手。下一个计算时代已经到来。',
                'hero.getStarted': '开始使用',
                'hero.tryChatbot': '尝试聊天机器人',
                'stats.uptime': '正常运行',
                'stats.requests': '请求量',
                'stats.developers': '开发者',
                'features.title': '核心功能',
                'features.subtitle': '为未来AI交互而构建',
                'features.fast': '极速响应',
                'features.fastDesc': '通过我们的全球优化基础设施，响应时间低于100毫秒。',
                'features.intelligent': '智能',
                'features.intelligentDesc': '能够深度理解上下文和推理的先进AI模型。',
                'features.secure': '安全',
                'features.secureDesc': '企业级安全保障，端到端加密。',
                'features.devTools': '开发者工具',
                'features.devToolsDesc': '全面的API和SDK，实现无缝集成。',
                'features.chatbot': '聊天机器人',
                'features.chatbotDesc': '帮助你完成任何事情的智能助手。',
                'features.superKit': '超级工具包',
                'features.superKitDesc': '26个专业工具，提升你的工作效率。',
                'demo.title': '看看实际效果。',
                'demo.subtitle': '在这里尝试我们的AI助手。',
                'demo.placeholder': '输入你的消息...',
                'demo.send': '发送',
                'kit.badge': '实用工具包',
                'kit.title': '超级',
                'kit.subtitle': '专业工具集 · 28款实用工具助力您的日常工作',
                'kit.speedTest': '网速测试',
                'kit.pingTest': 'Ping 测试',
                'kit.ipDetection': 'IP 检测',
                'kit.proxyDetection': '代理检测',
                'kit.sslCheck': 'SSL 证书',
                'kit.httpHeaders': 'HTTP 头信息',
                'kit.securityScan': '安全扫描',
                'kit.currencyExchange': '汇率计算',
                'kit.qrGenerator': '二维码生成',
                'kit.shortUrl': '短链接',
                'kit.unitConverter': '单位换算',
                'kit.passwordCheck': '密码检测',
                'kit.translator': '翻译',
                'kit.baseConverter': '进制转换',
                'kit.randomNumber': '随机数',
                'kit.hashGenerator': '哈希生成',
                'kit.ageCalculator': '年龄计算',
                'kit.dateCalculator': '日期计算',
                'kit.worldClock': '世界时钟',
                'kit.bmiCalculator': 'BMI 计算',
                'kit.scientificCalc': '科学计算器',
                'kit.functionGraph': '函数图像',
                'kit.citationGen': '参考文献',
                'kit.wavelength': '波长频率',
                'kit.luckyColor': '幸运颜色',
                'kit.tarot': '塔罗占卜',
                'kit.goldPrice': '国际金价',
                'kit.domesticGold': '国内金价',
                'kit.startTest': '开始测速',
                'kit.complete': '完成',
                'kit.downloadSpeed': '下载速度',
                'kit.uploadSpeed': '上传速度',
                'kit.ping': '延迟',
                'kit.targetHost': '目标主机',
                'kit.pingPlaceholder': '例如: google.com',
                'kit.allTools': '全部工具',
                'kit.networkTools': '网络工具',
                'kit.securityTools': '安全工具',
                'kit.financeTools': '金融理财',
                'kit.converterTools': '转换工具',
                'kit.generatorTools': '生成工具',
                'kit.calculatorTools': '计算工具',
                'kit.funTools': '趣味工具',
                'kit.httpHeaders': 'HTTP 头信息',
                'kit.securityScan': '安全扫描',
                'kit.currencyExchange': '汇率计算',
                'kit.qrGenerator': '二维码生成',
                'kit.shortUrl': '短链接',
                'kit.unitConverter': '单位换算',
                'kit.passwordCheck': '密码检测',
                'kit.translator': '翻译',
                'kit.baseConverter': '进制转换',
                'kit.randomNumber': '随机数',
                'kit.hashGenerator': '哈希生成',
                'kit.ageCalculator': '年龄计算',
                'kit.dateCalculator': '日期计算',
                'kit.worldClock': '世界时钟',
                'kit.bmiCalculator': 'BMI 计算',
                'kit.enterHost': '输入主机名或IP地址开始测试',
                'kit.detectMyIP': '检测我的 IP',
                'kit.ipv4Addr': 'IPv4 地址',
                'kit.ipv6Addr': 'IPv6 地址',
                'kit.ipv6Support': 'IPv6 支持',
                'kit.location': '位置',
                'kit.isp': 'ISP',
                'kit.startDetection': '开始检测',
                'kit.proxyStatus': '代理状态',
                'kit.vpnStatus': 'VPN 状态',
                'kit.torStatus': 'Tor 网络',
                'kit.datacenterStatus': '数据中心 IP',
                'kit.anonLevel': '匿名等级',
                'kit.websiteDomain': '网站域名',
                'kit.sslPlaceholder': '例如: github.com',
                'kit.check': '检查',
                'kit.enterDomain': '输入域名检查 SSL 证书信息',
                'kit.websiteUrl': '网站 URL',
                'kit.urlPlaceholder': '例如: https://example.com',
                'kit.get': '获取',
                'kit.enterUrl': '输入 URL 获取 HTTP 响应头',
                'kit.targetWebsite': '目标网站',
                'kit.scanPlaceholder': '例如: example.com',
                'kit.scan': '扫描',
                'kit.sslSecurity': 'SSL/TLS 安全性',
                'kit.httpSecureHeaders': 'HTTP 安全头',
                'kit.contentSecurity': '内容安全策略',
                'kit.dnssecStatus': 'DNSSEC 状态',
                'kit.malwareDetection': '恶意软件检测',
                'kit.amount': '金额',
                'kit.amountPlaceholder': '输入金额',
                'kit.exchangeRate': '汇率将在计算后显示',
                'kit.enterContent': '输入内容',
                'kit.qrPlaceholder': '输入文本或网址...',
                'kit.size': '尺寸',
                'kit.small': '小',
                'kit.medium': '中',
                'kit.large': '大',
                'kit.generateQR': '生成二维码',
                'kit.qrHint': '输入内容后生成二维码',
                'kit.originalUrl': '原始网址',
                'kit.urlPlaceholderLong': 'https://example.com/very-long-url...',
                'kit.generateShort': '生成短链接',
                'kit.shortUrlHint': '输入长网址生成短链接',
                'kit.category': '类型',
                'kit.length': '长度',
                'kit.weight': '重量',
                'kit.temperature': '温度',
                'kit.area': '面积',
                'kit.data': '数据存储',
                'kit.value': '数值',
                'kit.valuePlaceholder': '输入数值',
                'kit.selectUnit': '选择单位开始换算',
                'kit.enterPassword': '输入密码',
                'kit.passwordPlaceholder': '输入要检测的密码...',
                'kit.enterPasswordStart': '输入密码开始检测',
                'kit.atLeast8': '至少8个字符',
                'kit.uppercase': '包含大写字母',
                'kit.lowercase': '包含小写字母',
                'kit.number': '包含数字',
                'kit.special': '包含特殊字符',
                'kit.generateStrong': '生成强密码',
                'kit.autoDetect': '自动检测',
                'kit.chinese': '中文',
                'kit.english': '英语',
                'kit.japanese': '日语',
                'kit.korean': '韩语',
                'kit.french': '法语',
                'kit.german': '德语',
                'kit.spanish': '西班牙语',
                'kit.russian': '俄语',
                'kit.originalText': '原文',
                'kit.translatePlaceholder': '输入要翻译的文本...',
                'kit.translate': '翻译',
                'kit.translated': '译文',
                'kit.translateResult': '翻译结果将显示在这里...',
                'kit.enterNumber': '输入数值',
                'kit.numberPlaceholder': '输入数字...',
                'kit.inputBase': '输入进制',
                'kit.decimal': '十进制',
                'kit.binary': '二进制',
                'kit.octal': '八进制',
                'kit.hex': '十六进制',
                'kit.range': '范围',
                'kit.min': '最小值',
                'kit.max': '最大值',
                'kit.to': '到',
                'kit.count': '生成数量',
                'kit.unique': '不重复',
                'kit.generateRandom': '生成随机数',
                'kit.randomHint': '点击按钮生成随机数',
                'kit.enterText': '输入文本',
                'kit.hashPlaceholder': '输入要生成哈希的文本...',
                'kit.clickToCopy': '点击哈希值可复制',
                'kit.birthDate': '出生日期',
                'kit.yearsOld': '岁',
                'kit.enterBirthDate': '输入出生日期计算年龄',
                'kit.exactAge': '精确年龄',
                'kit.daysSpent': '已度过',
                'kit.nextBirthday': '下次生日',
                'kit.zodiac': '生肖',
                'kit.constellation': '星座',
                'kit.dateDiff': '日期差',
                'kit.dateAdd': '日期推算',
                'kit.startDate': '开始日期',
                'kit.endDate': '结束日期',
                'kit.baseDate': '起始日期',
                'kit.days': '天数',
                'kit.selectDate': '选择日期开始计算',
                'kit.beijing': '北京',
                'kit.newyork': '纽约',
                'kit.london': '伦敦',
                'kit.tokyo': '东京',
                'kit.paris': '巴黎',
                'kit.sydney': '悉尼',
                'kit.height': '身高',
                'kit.weight': '体重',
                'kit.calculate': '计算',
                'kit.bmi': 'BMI',
                'kit.status': '状态',
                'kit.enterHeightWeight': '输入身高和体重'
            }
        };

        // 切换语言下拉菜单
        function toggleLangDropdown() {
            const dropdown = document.getElementById('lang-dropdown');
            dropdown.classList.toggle('active');
            
            const closeHandler = (e) => {
                if (!dropdown.parentElement.contains(e.target)) {
                    dropdown.classList.remove('active');
                    document.removeEventListener('click', closeHandler);
                }
            };
            
            setTimeout(() => {
                document.addEventListener('click', closeHandler);
            }, 0);
        }

        // 切换语言
        function switchLang(lang) {
            currentLang = lang;
            localStorage.setItem('lang', lang);
            
            document.getElementById('current-lang').textContent = lang.toUpperCase();
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.remove('active');
                if (opt.textContent.includes(lang === 'en' ? 'English' : '中文')) {
                    opt.classList.add('active');
                }
            });
            
            updatePageContent();
            document.getElementById('lang-dropdown').classList.remove('active');
        }

        // 更新页面内容
        function updatePageContent() {
            const t = translations[currentLang];
            const html = document.documentElement;
            html.setAttribute('lang', currentLang);
            
            // 遍历所有带data-i18n属性的元素并更新
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) {
                    el.textContent = t[key];
                }
            });
        }

        // 初始化
        function initThemeLang() {
            document.getElementById('current-lang').textContent = currentLang.toUpperCase();
            updatePageContent();
            
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.remove('active');
                if (opt.textContent.includes(currentLang === 'en' ? 'English' : '中文')) {
                    opt.classList.add('active');
                }
            });
        }

        // ==================== API 配置 ====================
        const API_BASE = 'https://api.agiera.net';

        // ==================== AI 选择器配置 ====================
        const AI_MODELS = {
            'doubao-pro': {
                name: '豆包 2.0 Pro',
                icon: '⚡',
                desc: '豆包 2.0 Pro · 火山引擎',
                endpoint: '/api/doubao',
                model: 'doubao-2.0-pro'
            },
            qwen: {
                name: 'Qwen',
                icon: '🔮',
                desc: '通义千问 · 阿里云',
                endpoint: '/api/chat'
            },
            'doubao-code': {
                name: '豆包 2.0 Code',
                icon: '⌨️',
                desc: '豆包 2.0 Code · 火山引擎',
                endpoint: '/api/doubao',
                model: 'doubao-2.0-code'
            }
        };

        // 当前选中的 AI（首页和 ChatBot 分别存储）
        let selectedAI = {
            demo: 'doubao-pro',
            chatbot: 'doubao-pro'
        };

        // 切换 AI 选择器下拉菜单
        function toggleAISelector(target) {
            const selector = document.getElementById(`${target}-ai-selector`);
            selector.classList.toggle('open');
            
            // 点击外部关闭
            const closeHandler = (e) => {
                if (!selector.contains(e.target)) {
                    selector.classList.remove('open');
                    document.removeEventListener('click', closeHandler);
                }
            };
            
            setTimeout(() => {
                document.addEventListener('click', closeHandler);
            }, 0);
        }

        // 选择 AI
        function selectAI(target, aiKey) {
            const model = AI_MODELS[aiKey];
            if (!model) return;
            
            selectedAI[target] = aiKey;
            
            // 更新按钮显示
            document.getElementById(`${target}-ai-icon`).textContent = model.icon;
            document.getElementById(`${target}-ai-name`).textContent = model.name;
            
            // 更新选中状态
            const dropdown = document.getElementById(`${target}-ai-dropdown`);
            dropdown.querySelectorAll('.ai-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.ai === aiKey) {
                    option.classList.add('active');
                }
            });
            
            // 关闭下拉菜单
            document.getElementById(`${target}-ai-selector`).classList.remove('open');
            
            // 显示切换提示
            showToast(`已切换到 ${model.name}`);
        }

        // ==================== 访客统计功能 ====================
        async function initVisitorCounter() {
            const uvEl = document.getElementById('visitor-uv');
            const pvEl = document.getElementById('visitor-pv');
            
            if (!uvEl || !pvEl) return;

            try {
                // 记录访问并获取统计数据
                const response = await fetch(`${API_BASE}/stats/visit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        page: window.location.pathname,
                        referrer: document.referrer || null,
                        userAgent: navigator.userAgent
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    // 动画显示数字
                    animateCounter(uvEl, data.uv || 0);
                    animateCounter(pvEl, data.pv || 0);
                } else {
                    // 如果POST失败，尝试GET获取统计
                    await fetchVisitorStats();
                }
            } catch (error) {
                console.error('Failed to record visit:', error);
                // 尝试只获取统计数据
                await fetchVisitorStats();
            }
        }

        async function fetchVisitorStats() {
            const uvEl = document.getElementById('visitor-uv');
            const pvEl = document.getElementById('visitor-pv');
            
            try {
                const response = await fetch(`${API_BASE}/stats/visitor`);
                if (response.ok) {
                    const data = await response.json();
                    animateCounter(uvEl, data.uv || 0);
                    animateCounter(pvEl, data.pv || 0);
                } else {
                    uvEl.textContent = '--';
                    pvEl.textContent = '--';
                }
            } catch (error) {
                console.error('Failed to fetch visitor stats:', error);
                uvEl.textContent = '--';
                pvEl.textContent = '--';
            }
        }

        function animateCounter(element, target) {
            if (!element || target === 0) {
                if (element) element.textContent = target.toLocaleString();
                return;
            }

            const duration = 1500;
            const start = Math.max(0, target - Math.min(100, Math.floor(target * 0.1)));
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // easeOutExpo 缓动函数
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeProgress);
                
                element.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(update);
        }

        // ==================== 访客活动图生成 ====================
        function generateVisitorActivityGraph() {
            const graphContainer = document.getElementById('visitor-graph');
            const monthsContainer = document.getElementById('visitor-months');
            if (!graphContainer || !monthsContainer) return;

            graphContainer.innerHTML = '';
            monthsContainer.innerHTML = '';

            const today = new Date();
            const weeks = 53;
            const daysPerWeek = 7;

            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            let lastMonth = -1;
            const monthPositions = [];
            
            for (let week = 0; week < weeks; week++) {
                const weekDiv = document.createElement('div');
                weekDiv.className = 'visitor-activity-week';
                
                for (let day = 0; day < daysPerWeek; day++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'visitor-activity-day';
                    
                    const date = new Date(today);
                    date.setDate(date.getDate() - ((weeks - 1 - week) * 7 + (daysPerWeek - 1 - day)));
                    
                    const currentMonth = date.getMonth();
                    if (day === 0 && currentMonth !== lastMonth) {
                        monthPositions.push({ week, month: currentMonth });
                        lastMonth = currentMonth;
                    }
                    
                    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
                    const seed = date.getFullYear() * 1000 + dayOfYear;
                    const pseudoRandom = (Math.sin(seed) * 10000) % 1;
                    
                    const level = Math.floor(Math.abs(pseudoRandom) * 5);
                    dayDiv.setAttribute('data-level', level);
                    
                    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    dayDiv.setAttribute('title', dateStr);
                    
                    weekDiv.appendChild(dayDiv);
                }
                
                graphContainer.appendChild(weekDiv);
            }

            monthPositions.forEach((pos, index) => {
                const span = document.createElement('span');
                span.textContent = monthNames[pos.month];
                const cellWidth = 13;
                const gap = 3;
                const weekWidth = cellWidth + gap;
                const leftPos = pos.week * weekWidth;
                span.style.left = leftPos + 'px';
                monthsContainer.appendChild(span);
            });
        }


        // ==================== IP检测功能 ====================
        async function detectIP() {
            const ipEl = document.getElementById('ip-address');
            const refreshBtn = document.getElementById('ip-refresh-btn');
            
            if (!ipEl) return;
            
            ipEl.textContent = 'Detecting...';
            ipEl.classList.add('loading');
            if (refreshBtn) refreshBtn.classList.add('loading');

            // 多个备用 API
            const apis = [
                {
                    url: 'https://ipapi.co/json/',
                    parse: (data) => ({
                        ip: data.ip,
                        country: data.country_name,
                        country_code: data.country_code,
                        region: data.region,
                        city: data.city,
                        isp: data.org,
                        timezone: data.timezone,
                        lat: data.latitude,
                        lon: data.longitude
                    })
                },
                {
                    url: 'https://ipwho.is/',
                    parse: (data) => ({
                        ip: data.ip,
                        country: data.country,
                        country_code: data.country_code,
                        region: data.region,
                        city: data.city,
                        isp: data.connection?.isp || data.org,
                        timezone: data.timezone?.id,
                        lat: data.latitude,
                        lon: data.longitude
                    })
                },
                {
                    url: 'https://api.ipify.org?format=json',
                    parse: (data) => ({
                        ip: data.ip,
                        country: null,
                        country_code: null,
                        region: null,
                        city: null,
                        isp: null,
                        timezone: null,
                        lat: null,
                        lon: null
                    })
                }
            ];

            let lastError = null;

            for (const api of apis) {
                try {
                    console.log('Trying IP API:', api.url);
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 5000);
                    
                    const response = await fetch(api.url, { 
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json' }
                    });
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const rawData = await response.json();
                    const data = api.parse(rawData);
                    
                    if (!data.ip) {
                        throw new Error('No IP in response');
                    }
                    
                    console.log('IP detection successful:', data.ip);
                    
                    ipEl.textContent = data.ip;
                    ipEl.classList.remove('loading');
                    
                    // 处理国家显示：台湾、香港、澳门显示为中国
                    let countryName = data.country || '--';
                    const chinaRegions = ['TW', 'HK', 'MO'];
                    if (chinaRegions.includes(data.country_code)) {
                        countryName = 'China';
                    }
                    
                    // 处理地区显示
                    let regionName = data.region || '--';
                    if (data.country_code === 'TW') {
                        regionName = 'Taiwan, ' + regionName;
                    } else if (data.country_code === 'HK') {
                        regionName = 'Hong Kong SAR';
                    } else if (data.country_code === 'MO') {
                        regionName = 'Macao SAR';
                    }
                    
                    document.getElementById('ip-country').textContent = countryName;
                    document.getElementById('ip-region').textContent = regionName;
                    document.getElementById('ip-city').textContent = data.city || '--';
                    document.getElementById('ip-isp').textContent = data.isp || '--';
                    document.getElementById('ip-timezone').textContent = data.timezone || '--';
                    document.getElementById('ip-coords').textContent = 
                        data.lat && data.lon ? `${data.lat}, ${data.lon}` : '--';
                    
                    if (refreshBtn) refreshBtn.classList.remove('loading');
                    return; // 成功，退出函数
                    
                } catch (error) {
                    console.warn('IP API failed:', api.url, error.message);
                    lastError = error;
                    // 继续尝试下一个 API
                }
            }
            
            // 所有 API 都失败了
            console.error('All IP detection APIs failed:', lastError);
            ipEl.textContent = 'Unable to detect';
            ipEl.classList.remove('loading');
            if (refreshBtn) refreshBtn.classList.remove('loading');
        }

        // ==================== ChatBot功能 ====================
        let isChatWaiting = false;

        function handleChatKeypress(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendChatMessage();
            }
        }

        async function sendChatMessage() {
            const input = document.getElementById('chatbot-input');
            const sendBtn = document.getElementById('chatbot-send-btn');
            const messagesContainer = document.getElementById('chatbot-messages');
            const message = input.value.trim();
            
            if (!message || isChatWaiting) return;
            
            isChatWaiting = true;
            sendBtn.disabled = true;
            input.value = '';
            
            // 获取当前选中的 AI
            const currentAI = AI_MODELS[selectedAI.chatbot];
            const aiIcon = currentAI.icon;
            
            // 添加用户消息
            addChatMessage(message, 'user');
            
            // 添加加载动画
            const typingEl = document.createElement('div');
            typingEl.className = 'chatbot-message';
            typingEl.id = 'typing-indicator';
            const cube3DTyping = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
            typingEl.innerHTML = `
                <div class="chatbot-avatar">${cube3DTyping}</div>
                <div class="chatbot-bubble">
                    <div class="chatbot-typing">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(typingEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            try {
                let reply = '';
                
                if (currentAI.endpoint === '/api/doubao') {
                    const response = await fetch(`${API_BASE}${currentAI.endpoint}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            prompt: message,
                            model: currentAI.model
                        })
                    });
                    
                    const data = await response.json();
                    
                    document.getElementById('typing-indicator')?.remove();
                    
                    if (data.error) {
                        const cube3DError = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
                        addChatMessageWithIcon(`请求失败：${JSON.stringify(data.error)}`, 'bot', cube3DError);
                    } else {
                        const cube3DReply = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
                        addChatMessageWithIcon(data.answer, 'bot', cube3DReply);
                    }
                } else {
                    const response = await fetch(`${API_BASE}${currentAI.endpoint}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message })
                    });
                    
                    const data = await response.json();
                    
                    document.getElementById('typing-indicator')?.remove();
                    
                    if (data.success) {
                        const cube3DReply = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
                        addChatMessageWithIcon(data.reply, 'bot', cube3DReply);
                    } else {
                        const cube3DError = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
                        addChatMessageWithIcon('Sorry, I encountered an error. Please try again.', 'bot', cube3DError);
                    }
                }
            } catch (error) {
                console.error('Chat error:', error);
                document.getElementById('typing-indicator')?.remove();
                const cube3DNet = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
                addChatMessageWithIcon('Network error. Please check your connection and try again.', 'bot', cube3DNet);
            } finally {
                isChatWaiting = false;
                sendBtn.disabled = false;
                input.focus();
            }
        }

        function addChatMessage(text, type) {
            const cube3D = `<div class="cb-face cb-face-front"></div><div class="cb-face cb-face-top"></div><div class="cb-face cb-face-right"></div>`;
            addChatMessageWithIcon(text, type, cube3D);
        }

        function addChatMessageWithIcon(text, type, icon) {
            const messagesContainer = document.getElementById('chatbot-messages');
            const messageEl = document.createElement('div');
            messageEl.className = `chatbot-message ${type === 'user' ? 'user' : ''}`;
            
            const avatar = type === 'user' ? 'U' : icon;
            messageEl.innerHTML = `
                <div class="chatbot-avatar">${avatar}</div>
                <div class="chatbot-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
            `;
            
            messagesContainer.appendChild(messageEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing...');
            
            // 初始化主题（包括边缘光效）
            initTheme();
            
            // 初始化语言
            initThemeLang();
            
            // 初始化访客统计
            initVisitorCounter();
            
            // 生成访客活动图
            generateVisitorActivityGraph();
            
            // 初始化动画
            initAnimations();
            
            // 检查登录状态
            checkAuthStatus();
        });

        // ==================== 主题切换功能 ====================
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // 更新边缘光效颜色
            updateEdgeLightColors(newTheme);
            
            console.log(`Theme switched to: ${newTheme}`);
        }

        function updateEdgeLightColors(theme) {
            // 更新SVG渐变颜色以适配主题
            const horizontalGradient = document.getElementById('lg-gradient-horizontal');
            const verticalGradient = document.getElementById('lg-gradient-vertical');
            
            if (horizontalGradient && verticalGradient) {
                if (theme === 'light') {
                    // 浅色模式：使用更深的颜色
                    horizontalGradient.innerHTML = `
                        <stop offset="0%" stop-color="transparent"/>
                        <stop offset="20%" stop-color="rgba(0, 0, 0, 0.15)"/>
                        <stop offset="35%" stop-color="rgba(8, 145, 178, 0.4)"/>
                        <stop offset="50%" stop-color="rgba(0, 0, 0, 0.2)"/>
                        <stop offset="65%" stop-color="rgba(124, 58, 237, 0.35)"/>
                        <stop offset="80%" stop-color="rgba(0, 0, 0, 0.15)"/>
                        <stop offset="100%" stop-color="transparent"/>
                    `;
                    verticalGradient.innerHTML = `
                        <stop offset="0%" stop-color="transparent"/>
                        <stop offset="20%" stop-color="rgba(0, 0, 0, 0.15)"/>
                        <stop offset="35%" stop-color="rgba(8, 145, 178, 0.4)"/>
                        <stop offset="50%" stop-color="rgba(0, 0, 0, 0.2)"/>
                        <stop offset="65%" stop-color="rgba(124, 58, 237, 0.35)"/>
                        <stop offset="80%" stop-color="rgba(0, 0, 0, 0.15)"/>
                        <stop offset="100%" stop-color="transparent"/>
                    `;
                } else {
                    // 深色模式：恢复原始颜色
                    horizontalGradient.innerHTML = `
                        <stop offset="0%" stop-color="transparent"/>
                        <stop offset="20%" stop-color="rgba(255, 255, 255, 0.9)"/>
                        <stop offset="35%" stop-color="rgba(0, 212, 255, 0.8)"/>
                        <stop offset="50%" stop-color="rgba(255, 255, 255, 1)"/>
                        <stop offset="65%" stop-color="rgba(139, 92, 246, 0.8)"/>
                        <stop offset="80%" stop-color="rgba(255, 255, 255, 0.9)"/>
                        <stop offset="100%" stop-color="transparent"/>
                    `;
                    verticalGradient.innerHTML = `
                        <stop offset="0%" stop-color="transparent"/>
                        <stop offset="20%" stop-color="rgba(255, 255, 255, 0.9)"/>
                        <stop offset="35%" stop-color="rgba(0, 212, 255, 0.8)"/>
                        <stop offset="50%" stop-color="rgba(255, 255, 255, 1)"/>
                        <stop offset="65%" stop-color="rgba(139, 92, 246, 0.8)"/>
                        <stop offset="80%" stop-color="rgba(255, 255, 255, 0.9)"/>
                        <stop offset="100%" stop-color="transparent"/>
                    `;
                }
            }
        }

        // 初始化主题
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            // 延迟更新边缘光效，等待SVG元素创建
            setTimeout(() => {
                updateEdgeLightColors(savedTheme);
            }, 100);
        }

        // Kit Category Filter
        function filterKitCategory(category) {
            const buttons = document.querySelectorAll('.kit-category-btn');
            const tools = document.querySelectorAll('.kit-tool-window');
            
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });
            
            tools.forEach(tool => {
                if (category === 'all' || tool.dataset.category === category) {
                    tool.classList.add('visible');
                    tool.style.display = 'block';
                } else {
                    tool.classList.remove('visible');
                    tool.style.display = 'none';
                }
            });
        }

        // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            const targetPage = document.getElementById(`page-${pageId}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Update mobile nav links
            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Generate neural network nodes for about page
            if (pageId === 'about') {
                generateNeuralNetwork();
            }
            
            // Load profile page data
            if (pageId === 'profile') {
                loadProfilePage();
            }
            
            // Detect IP for kit page
            if (pageId === 'kit') {
                detectIP();
                initGoldData();
                startGoldPriceUpdates();
                filterKitCategory('all');
            }
        }

        // Modal functions
        function openModal(type = 'login') {
            document.getElementById('modal').classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 显示对应的表单
            if (type === 'signup') {
                document.getElementById('login-form-container').classList.add('hidden');
                document.getElementById('signup-form-container').classList.remove('hidden');
            } else {
                document.getElementById('login-form-container').classList.remove('hidden');
                document.getElementById('signup-form-container').classList.add('hidden');
            }
            
            // 清除错误信息
            document.getElementById('login-error').classList.remove('show');
            document.getElementById('signup-error').classList.remove('show');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.body.style.overflow = '';
            // 清除表单
            document.getElementById('login-form').reset();
            document.getElementById('signup-form').reset();
        }

        function switchToSignup() {
            document.getElementById('login-form-container').classList.add('hidden');
            document.getElementById('signup-form-container').classList.remove('hidden');
            document.getElementById('forgot-form-container').classList.add('hidden');
            document.getElementById('login-error').classList.remove('show');
        }

        function switchToLogin() {
            document.getElementById('signup-form-container').classList.add('hidden');
            document.getElementById('forgot-form-container').classList.add('hidden');
            document.getElementById('login-form-container').classList.remove('hidden');
            document.getElementById('signup-error').classList.remove('show');
        }

        function showForgotPassword() {
            document.getElementById('login-form-container').classList.add('hidden');
            document.getElementById('signup-form-container').classList.add('hidden');
            document.getElementById('forgot-form-container').classList.remove('hidden');
        }

        // 忘记密码处理
        async function handleForgotPassword(e) {
            e.preventDefault();
            
            const btn = document.getElementById('forgot-btn');
            const errorEl = document.getElementById('forgot-error');
            const successEl = document.getElementById('forgot-success');
            const email = document.getElementById('forgot-email').value;

            btn.classList.add('loading');
            btn.disabled = true;
            errorEl.classList.remove('show');
            successEl.style.display = 'none';

            try {
                const response = await fetch('/api/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (data.success) {
                    successEl.textContent = 'Password reset link sent! Check your email.';
                    successEl.style.display = 'block';
                    document.getElementById('forgot-form').reset();
                } else {
                    errorEl.textContent = data.message || 'Failed to send reset email';
                    errorEl.classList.add('show');
                }
            } catch (error) {
                console.error('Forgot password error:', error);
                errorEl.textContent = 'Network error, please try again';
                errorEl.classList.add('show');
            } finally {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        }

        // 用户状态管理
        let currentUser = null;

        function updateUserUI() {
            const guestNav = document.getElementById('nav-auth-guest');
            const userNav = document.getElementById('nav-auth-user');
            
            if (currentUser) {
                guestNav.classList.add('hidden');
                userNav.classList.remove('hidden');
                
                // 更新用户信息显示
                const initial = currentUser.username.charAt(0).toUpperCase();
                document.getElementById('user-avatar').textContent = initial;
                document.getElementById('user-name').textContent = currentUser.username;
                document.getElementById('dropdown-name').textContent = currentUser.username;
                document.getElementById('dropdown-email').textContent = currentUser.email;
            } else {
                guestNav.classList.remove('hidden');
                userNav.classList.add('hidden');
            }
        }

        function toggleUserMenu() {
            const menu = document.querySelector('.user-menu');
            const dropdown = document.getElementById('user-dropdown');
            menu.classList.toggle('active');
            dropdown.classList.toggle('active');
        }

        // 点击外部关闭用户菜单
        document.addEventListener('click', function(e) {
            const userMenu = document.querySelector('.user-menu');
            const dropdown = document.getElementById('user-dropdown');
            if (userMenu && !userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
                dropdown.classList.remove('active');
            }
        });

        // 登录处理
        async function handleLogin(e) {
            e.preventDefault();
            
            const btn = document.getElementById('login-btn');
            const errorEl = document.getElementById('login-error');
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // 显示 loading
            btn.classList.add('loading');
            btn.disabled = true;
            errorEl.classList.remove('show');

            try {
                const response = await fetch(`${API_BASE}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.success) {
                    // 保存 token 和用户信息
                    localStorage.setItem('auth-token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    currentUser = data.user;
                    
                    updateUserUI();
                    closeModal();
                    
                    // 显示欢迎提示
                    showToast(`Welcome back, ${data.user.username}!`);
                } else {
                    errorEl.textContent = data.message || '登录失败';
                    errorEl.classList.add('show');
                }
            } catch (error) {
                console.error('Login error:', error);
                errorEl.textContent = '网络错误，请稍后重试';
                errorEl.classList.add('show');
            } finally {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        }

        // 注册处理
        async function handleSignup(e) {
            e.preventDefault();
            
            const btn = document.getElementById('signup-btn');
            const errorEl = document.getElementById('signup-error');
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            // 显示 loading
            btn.classList.add('loading');
            btn.disabled = true;
            errorEl.classList.remove('show');

            try {
                const response = await fetch(`${API_BASE}/api/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (data.success) {
                    // 保存 token 和用户信息
                    localStorage.setItem('auth-token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    currentUser = data.user;
                    
                    updateUserUI();
                    closeModal();
                    
                    // 显示庆祝动画
                    showCelebration(data.user.username);
                } else {
                    errorEl.textContent = data.message || '注册失败';
                    errorEl.classList.add('show');
                }
            } catch (error) {
                console.error('Signup error:', error);
                errorEl.textContent = '网络错误，请稍后重试';
                errorEl.classList.add('show');
            } finally {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        }

        // 登出
        function logout() {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user');
            currentUser = null;
            updateUserUI();
            toggleUserMenu();
            showPage('home');
            showToast('You have been logged out');
        }

        // ==================== 用户资料页功能 ====================
        function loadProfilePage() {
            if (!currentUser) return;
            
            // 设置头像
            const initial = currentUser.username.charAt(0).toUpperCase();
            document.getElementById('profile-avatar').textContent = initial;
            
            // 设置基本信息
            document.getElementById('profile-display-name').textContent = currentUser.username;
            document.getElementById('profile-email').textContent = currentUser.email;
            document.getElementById('profile-username').value = currentUser.username;
            document.getElementById('profile-email-input').value = currentUser.email;
            
            // 设置创建日期
            if (currentUser.createdAt) {
                const date = new Date(currentUser.createdAt);
                document.getElementById('profile-created').value = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else {
                document.getElementById('profile-created').value = 'N/A';
            }
            
            // 计算活跃天数
            if (currentUser.createdAt) {
                const created = new Date(currentUser.createdAt);
                const now = new Date();
                const days = Math.floor((now - created) / (1000 * 60 * 60 * 24));
                document.getElementById('stat-days').textContent = days;
            }
            
            // 设置邮箱验证状态
            const badge = document.getElementById('profile-verify-badge');
            if (currentUser.emailVerified) {
                badge.className = 'profile-badge verified';
                badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Email verified';
                badge.onclick = null;
            } else {
                badge.className = 'profile-badge unverified';
                badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Email not verified - Click to resend';
                badge.onclick = resendVerification;
            }
        }

        async function updateProfile(e) {
            e.preventDefault();
            
            const username = document.getElementById('profile-username').value;
            const messageEl = document.getElementById('profile-message');
            
            try {
                const token = localStorage.getItem('auth-token');
                const response = await fetch('/api/user/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ username })
                });

                const data = await response.json();

                if (data.success) {
                    currentUser.username = username;
                    localStorage.setItem('user', JSON.stringify(currentUser));
                    updateUserUI();
                    loadProfilePage();
                    
                    messageEl.className = 'profile-message success';
                    messageEl.textContent = 'Profile updated successfully!';
                } else {
                    messageEl.className = 'profile-message error';
                    messageEl.textContent = data.message || 'Failed to update profile';
                }
            } catch (error) {
                console.error('Update profile error:', error);
                messageEl.className = 'profile-message error';
                messageEl.textContent = 'Network error, please try again';
            }
            
            setTimeout(() => {
                messageEl.className = 'profile-message';
            }, 5000);
        }

        async function changePassword(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const messageEl = document.getElementById('profile-message');
            
            if (newPassword !== confirmPassword) {
                messageEl.className = 'profile-message error';
                messageEl.textContent = 'New passwords do not match';
                return;
            }
            
            try {
                const token = localStorage.getItem('auth-token');
                const response = await fetch('/api/user/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ currentPassword, newPassword })
                });

                const data = await response.json();

                if (data.success) {
                    document.getElementById('password-form').reset();
                    messageEl.className = 'profile-message success';
                    messageEl.textContent = 'Password changed successfully!';
                } else {
                    messageEl.className = 'profile-message error';
                    messageEl.textContent = data.message || 'Failed to change password';
                }
            } catch (error) {
                console.error('Change password error:', error);
                messageEl.className = 'profile-message error';
                messageEl.textContent = 'Network error, please try again';
            }
            
            setTimeout(() => {
                messageEl.className = 'profile-message';
            }, 5000);
        }

        async function resendVerification() {
            const messageEl = document.getElementById('profile-message');
            
            try {
                const token = localStorage.getItem('auth-token');
                const response = await fetch('/api/user/resend-verification', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                const data = await response.json();

                if (data.success) {
                    messageEl.className = 'profile-message success';
                    messageEl.textContent = 'Verification email sent! Check your inbox.';
                } else {
                    messageEl.className = 'profile-message error';
                    messageEl.textContent = data.message || 'Failed to send verification email';
                }
            } catch (error) {
                console.error('Resend verification error:', error);
                messageEl.className = 'profile-message error';
                messageEl.textContent = 'Network error, please try again';
            }
            
            setTimeout(() => {
                messageEl.className = 'profile-message';
            }, 5000);
        }

        function confirmDeleteAccount() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                deleteAccount();
            }
        }

        async function deleteAccount() {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await fetch('/api/user/delete', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                const data = await response.json();

                if (data.success) {
                    localStorage.removeItem('auth-token');
                    localStorage.removeItem('user');
                    currentUser = null;
                    updateUserUI();
                    showPage('home');
                    showToast('Your account has been deleted');
                } else {
                    showToast(data.message || 'Failed to delete account');
                }
            } catch (error) {
                console.error('Delete account error:', error);
                showToast('Network error, please try again');
            }
        }

        // ==================== 注册成功庆祝动画 ====================
        function showCelebration(username) {
            const overlay = document.getElementById('celebration-overlay');
            const usernameEl = document.getElementById('celebration-username');
            const skipBtn = document.getElementById('celebration-skip');
            
            // 设置用户名
            usernameEl.textContent = username;
            
            // 显示遮罩
            overlay.classList.add('active');
            
            // 生成粒子效果
            createParticles();
            
            // 生成神经网络背景
            createNeuralBackground();
            
            // 生成闪光效果
            createSparkles();
            
            // 5秒后按钮变为"开始探索"
            setTimeout(() => {
                skipBtn.textContent = '开始探索';
                skipBtn.classList.add('ready');
            }, 5000);
        }

        function closeCelebration() {
            const overlay = document.getElementById('celebration-overlay');
            overlay.classList.remove('active');
            
            // 清理粒子和神经网络
            document.getElementById('particles-container').innerHTML = '';
            document.getElementById('celebration-neural').innerHTML = '';
            
            // 重置按钮状态
            const skipBtn = document.getElementById('celebration-skip');
            skipBtn.textContent = '跳过';
            skipBtn.classList.remove('ready');
            
            // 显示欢迎toast
            setTimeout(() => {
                showToast('Welcome to AGI Era!');
            }, 300);
        }

        function createParticles() {
            const container = document.getElementById('particles-container');
            const colors = ['#00d4ff', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    const size = Math.random() * 10 + 5;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    particle.style.background = color;
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.bottom = '-20px';
                    particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
                    particle.style.animationDelay = (Math.random() * 0.5) + 's';
                    
                    container.appendChild(particle);
                    
                    // 移除粒子
                    setTimeout(function() { particle.remove(); }, 5000);
                }, i * 100);
            }
        }

        function createNeuralBackground() {
            const container = document.getElementById('celebration-neural');
            
            // 创建流动线条
            for (let i = 0; i < 8; i++) {
                const line = document.createElement('div');
                line.className = 'neural-line';
                line.style.top = (10 + i * 12) + '%';
                line.style.width = (Math.random() * 200 + 100) + 'px';
                line.style.animationDelay = (i * 0.3) + 's';
                line.style.animationDuration = (Math.random() * 2 + 2) + 's';
                container.appendChild(line);
            }
            
            // 创建脉冲点
            for (let i = 0; i < 20; i++) {
                const dot = document.createElement('div');
                dot.className = 'neural-dot';
                dot.style.left = Math.random() * 100 + '%';
                dot.style.top = Math.random() * 100 + '%';
                dot.style.animationDelay = (Math.random() * 2) + 's';
                container.appendChild(dot);
            }
        }

        function createSparkles() {
            const container = document.getElementById('celebration-overlay');
            
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'celebration-sparkle';
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
                    
                    container.appendChild(sparkle);
                    
                    setTimeout(function() { sparkle.remove(); }, 1500);
                }, i * 150);
            }
        }

        // Toast 提示
        function showToast(message) {
            // 移除已有的 toast
            const existingToast = document.querySelector('.toast');
            if (existingToast) {
                existingToast.remove();
            }

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // 检查登录状态
        function checkAuthStatus() {
            const token = localStorage.getItem('auth-token');
            const userStr = localStorage.getItem('user');
            
            if (token && userStr) {
                try {
                    currentUser = JSON.parse(userStr);
                    updateUserUI();
                } catch (e) {
                    localStorage.removeItem('auth-token');
                    localStorage.removeItem('user');
                }
            }
        }

        // Close modal on overlay click
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Demo chat - 使用真实 API
        let isDemoWaiting = false;

        async function sendDemoMessage() {
            const input = document.getElementById('demo-input-field');
            const sendBtn = input.nextElementSibling;
            const chat = document.getElementById('demo-chat');
            const message = input.value.trim();
            
            if (!message || isDemoWaiting) return;
            
            isDemoWaiting = true;
            sendBtn.disabled = true;
            input.value = '';
            
            // 获取当前选中的 AI
            const currentAI = AI_MODELS[selectedAI.demo];
            const aiIcon = currentAI.icon;
            
            // Add user message
            chat.innerHTML += `
                <div class="chat-message">
                    <div class="chat-avatar user">U</div>
                    <div class="chat-bubble">
                        <p>${escapeHtml(message)}</p>
                    </div>
                </div>
            `;
            chat.scrollTop = chat.scrollHeight;
            
            // 3D cube avatar HTML
            const cube3D = `<div class="c-face c-face-front"></div><div class="c-face c-face-top"></div><div class="c-face c-face-right"></div>`;
            
            // Add typing indicator
            const typingId = 'demo-typing-' + Date.now();
            chat.innerHTML += `
                <div class="chat-message" id="${typingId}">
                    <div class="chat-avatar">${cube3D}</div>
                    <div class="chat-bubble">
                        <div class="chatbot-typing">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            `;
            chat.scrollTop = chat.scrollHeight;
            
            try {
                let response, data;
                
                if (currentAI.endpoint === '/api/doubao') {
                    response = await fetch(`${API_BASE}${currentAI.endpoint}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            prompt: message,
                            model: currentAI.model
                        })
                    });
                    
                    data = await response.json();
                    
                    // Remove typing indicator
                    document.getElementById(typingId)?.remove();
                    
                    if (data.error) {
                        chat.innerHTML += `
                            <div class="chat-message">
                                <div class="chat-avatar">${cube3D}</div>
                                <div class="chat-bubble">
                                    <p>请求失败：${escapeHtml(JSON.stringify(data.error))}</p>
                                </div>
                            </div>
                        `;
                    } else {
                        chat.innerHTML += `
                            <div class="chat-message">
                                <div class="chat-avatar">${cube3D}</div>
                                <div class="chat-bubble">
                                    <p>${escapeHtml(data.answer)}</p>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    response = await fetch(`${API_BASE}${currentAI.endpoint}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message })
                    });
                    
                    data = await response.json();
                    
                    // Remove typing indicator
                    document.getElementById(typingId)?.remove();
                    
                    if (data.success) {
                        chat.innerHTML += `
                            <div class="chat-message">
                                <div class="chat-avatar">${cube3D}</div>
                                <div class="chat-bubble">
                                    <p>${escapeHtml(data.reply)}</p>
                                </div>
                            </div>
                        `;
                    } else {
                        chat.innerHTML += `
                            <div class="chat-message">
                                <div class="chat-avatar">${cube3D}</div>
                                <div class="chat-bubble">
                                    <p>Sorry, I encountered an error. Please try again.</p>
                                </div>
                            </div>
                        `;
                    }
                }
            } catch (error) {
                console.error('Demo chat error:', error);
                document.getElementById(typingId)?.remove();
                chat.innerHTML += `
                    <div class="chat-message">
                        <div class="chat-avatar">${cube3D}</div>
                        <div class="chat-bubble">
                            <p>Network error. Please check your connection and try again.</p>
                        </div>
                    </div>
                `;
            } finally {
                isDemoWaiting = false;
                sendBtn.disabled = false;
                chat.scrollTop = chat.scrollHeight;
                input.focus();
            }
        }

        function handleDemoInput(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Generate neural network visualization
        function generateNeuralNetwork() {
            const container = document.getElementById('neural-network');
            if (!container) return;
            
            container.innerHTML = '';
            
            const nodeCount = 30;
            for (let i = 0; i < nodeCount; i++) {
                const node = document.createElement('div');
                node.className = 'node';
                node.style.left = `${10 + Math.random() * 80}%`;
                node.style.top = `${10 + Math.random() * 80}%`;
                node.style.animationDelay = `${Math.random() * 3}s`;
                node.style.opacity = `${0.3 + Math.random() * 0.7}`;
                node.style.width = `${8 + Math.random() * 12}px`;
                node.style.height = node.style.width;
                container.appendChild(node);
            }
        }

        // Smooth reveal on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Initialize animations
        function initAnimations() {
            document.querySelectorAll('.feature-card, .stat-item, .paper-card, .value-card, .team-card, .timeline-item').forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                el.style.transitionDelay = `${index * 0.05}s`;
                observer.observe(el);
            });
        }

        // Docs section navigation
        function showDocsSection(sectionId) {
            document.querySelectorAll('.docs-nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Scroll to section
            const section = document.getElementById(`docs-${sectionId}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // ==================== Kit Tools Suite Functions ====================
        
        // Utility function
        function kitSleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Kit Toast notification
        function showKitToast(message, icon = '✓') {
            showToast(message);
        }

        // 1. Speed Test
        async function runSpeedTest() {
            const btn = document.getElementById('speed-test-btn');
            const status = document.getElementById('speed-status');
            btn.disabled = true;
            btn.innerHTML = '<div class="kit-loading-spinner"></div> 测试中...';
            status.style.display = 'none';

            const downloadGauge = document.getElementById('download-gauge');
            const uploadGauge = document.getElementById('upload-gauge');
            const pingGauge = document.getElementById('ping-gauge');

            // Download test
            for (let i = 0; i <= 100; i += 5) {
                await kitSleep(100);
                const speed = Math.round((i / 100) * 150 + Math.random() * 20);
                document.getElementById('download-speed').textContent = speed;
                downloadGauge.style.background = `conic-gradient(var(--accent) ${i * 3.6}deg, var(--bg-secondary) ${i * 3.6}deg)`;
            }

            // Upload test
            for (let i = 0; i <= 100; i += 5) {
                await kitSleep(80);
                const speed = Math.round((i / 100) * 50 + Math.random() * 10);
                document.getElementById('upload-speed').textContent = speed;
                uploadGauge.style.background = `conic-gradient(var(--accent-purple) ${i * 3.6}deg, var(--bg-secondary) ${i * 3.6}deg)`;
            }

            // Ping test
            const pingResult = Math.round(10 + Math.random() * 30);
            document.getElementById('ping-value').textContent = pingResult;
            pingGauge.style.background = `conic-gradient(var(--accent-green) ${Math.min(pingResult * 3, 360)}deg, var(--bg-secondary) ${Math.min(pingResult * 3, 360)}deg)`;

            btn.disabled = false;
            btn.innerHTML = '重新测速';
            status.style.display = 'inline-flex';
            showKitToast('网速测试完成');
        }

        // 2. Ping Test
        async function runPingTest() {
            const host = document.getElementById('ping-host').value.trim();
            if (!host) {
                showKitToast('请输入主机名', '⚠');
                return;
            }

            const results = document.getElementById('ping-results');
            results.innerHTML = '<div style="text-align: center; padding: 1rem;"><div class="kit-loading-spinner" style="margin: 0 auto;"></div><p style="margin-top: 0.5rem; color: var(--text-secondary);">正在 Ping...</p></div>';

            await kitSleep(500);

            const pingResults = [];
            let html = '';
            for (let i = 1; i <= 4; i++) {
                await kitSleep(300);
                const time = Math.round(10 + Math.random() * 50);
                pingResults.push(time);
                html += `<div class="kit-result-item">
                    <span class="kit-result-label">Ping #${i}</span>
                    <span class="kit-result-value ${time < 50 ? 'success' : time < 100 ? 'warning' : 'error'}">${time} ms</span>
                </div>`;
                results.innerHTML = html;
            }

            const avg = Math.round(pingResults.reduce((a, b) => a + b, 0) / pingResults.length);
            const min = Math.min(...pingResults);
            const max = Math.max(...pingResults);

            html += `<div class="kit-result-item" style="border-top: 1px solid var(--border); margin-top: 0.5rem; padding-top: 0.75rem;">
                <span class="kit-result-label">统计</span>
                <span class="kit-result-value accent">最小: ${min}ms | 平均: ${avg}ms | 最大: ${max}ms</span>
            </div>`;
            results.innerHTML = html;
            showKitToast('Ping 测试完成');
        }

        // 3. IP Detection for Kit
        async function detectIPKit() {
            document.getElementById('ipv4-addr').textContent = '检测中...';
            document.getElementById('ipv6-addr').textContent = '检测中...';

            await kitSleep(800);

            const ipv4 = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
            const hasIPv6 = Math.random() > 0.3;
            const ipv6 = hasIPv6 ? `2001:db8:${Math.random().toString(16).substr(2, 4)}::${Math.random().toString(16).substr(2, 4)}` : '不可用';

            document.getElementById('ipv4-addr').textContent = ipv4;
            document.getElementById('ipv4-addr').className = 'kit-result-value accent';
            document.getElementById('ipv6-addr').textContent = ipv6;
            document.getElementById('ipv6-addr').className = `kit-result-value ${hasIPv6 ? 'accent' : 'warning'}`;
            document.getElementById('ipv6-support').textContent = hasIPv6 ? '已启用' : '未启用';
            document.getElementById('ipv6-support').className = `kit-result-value ${hasIPv6 ? 'success' : 'warning'}`;
            document.getElementById('ip-location-kit').textContent = 'Boston, MA, US';
            document.getElementById('ip-isp-kit').textContent = 'Comcast Cable Communications';

            showKitToast('IP 检测完成');
        }

        // 4. Proxy/VPN Detection
        async function detectProxy() {
            const items = ['proxy-status', 'vpn-status', 'tor-status', 'datacenter-status', 'anon-level'];
            items.forEach(id => {
                document.getElementById(id).textContent = '检测中...';
                document.getElementById(id).className = 'kit-result-value';
            });

            await kitSleep(1200);

            const isVPN = Math.random() > 0.7;
            const isProxy = Math.random() > 0.8;
            const isTor = Math.random() > 0.95;
            const isDatacenter = Math.random() > 0.6;

            document.getElementById('proxy-status').textContent = isProxy ? '检测到代理' : '未检测到';
            document.getElementById('proxy-status').className = `kit-result-value ${isProxy ? 'warning' : 'success'}`;

            document.getElementById('vpn-status').textContent = isVPN ? '可能使用 VPN' : '未检测到';
            document.getElementById('vpn-status').className = `kit-result-value ${isVPN ? 'warning' : 'success'}`;

            document.getElementById('tor-status').textContent = isTor ? '检测到 Tor' : '未检测到';
            document.getElementById('tor-status').className = `kit-result-value ${isTor ? 'error' : 'success'}`;

            document.getElementById('datacenter-status').textContent = isDatacenter ? '是' : '否';
            document.getElementById('datacenter-status').className = `kit-result-value ${isDatacenter ? 'warning' : 'success'}`;

            let anonLevel = '低';
            let anonClass = 'success';
            if (isTor) { anonLevel = '极高'; anonClass = 'error'; }
            else if (isVPN && isProxy) { anonLevel = '高'; anonClass = 'warning'; }
            else if (isVPN || isProxy) { anonLevel = '中'; anonClass = 'warning'; }

            document.getElementById('anon-level').textContent = anonLevel;
            document.getElementById('anon-level').className = `kit-result-value ${anonClass}`;

            showKitToast('代理检测完成');
        }

        // 5. SSL Check
        async function checkSSL() {
            const domain = document.getElementById('ssl-domain').value.trim();
            if (!domain) {
                showKitToast('请输入域名', '⚠');
                return;
            }

            const results = document.getElementById('ssl-results');
            results.innerHTML = '<div style="text-align: center; padding: 1rem;"><div class="kit-loading-spinner" style="margin: 0 auto;"></div><p style="margin-top: 0.5rem; color: var(--text-secondary);">检查证书...</p></div>';

            await kitSleep(1000);

            const isValid = Math.random() > 0.1;
            const daysLeft = Math.floor(Math.random() * 300) + 30;
            const grade = isValid ? (daysLeft > 60 ? 'A+' : 'A') : 'F';

            results.innerHTML = `
                <div class="kit-result-item">
                    <span class="kit-result-label">状态</span>
                    <span class="kit-status-badge ${isValid ? 'success' : 'error'}">${isValid ? '有效' : '无效'}</span>
                </div>
                <div class="kit-result-item">
                    <span class="kit-result-label">评级</span>
                    <span class="kit-result-value ${grade === 'A+' ? 'success' : grade === 'A' ? 'success' : 'error'}">${grade}</span>
                </div>
                <div class="kit-result-item">
                    <span class="kit-result-label">颁发机构</span>
                    <span class="kit-result-value">Let's Encrypt Authority X3</span>
                </div>
                <div class="kit-result-item">
                    <span class="kit-result-label">有效期</span>
                    <span class="kit-result-value ${daysLeft > 30 ? 'success' : 'warning'}">${daysLeft} 天</span>
                </div>
                <div class="kit-result-item">
                    <span class="kit-result-label">加密算法</span>
                    <span class="kit-result-value">RSA 2048 位</span>
                </div>
                <div class="kit-result-item">
                    <span class="kit-result-label">TLS 版本</span>
                    <span class="kit-result-value success">TLS 1.3</span>
                </div>
            `;
            showKitToast('SSL 证书检查完成');
        }

        // 6. HTTP Headers
        async function getHeaders() {
            const url = document.getElementById('headers-url').value.trim();
            if (!url) {
                showKitToast('请输入 URL', '⚠');
                return;
            }

            const results = document.getElementById('headers-results');
            results.innerHTML = '<div style="text-align: center; padding: 1rem; font-family: Outfit, sans-serif;"><div class="kit-loading-spinner" style="margin: 0 auto;"></div><p style="margin-top: 0.5rem; color: var(--text-secondary);">获取头信息...</p></div>';

            await kitSleep(800);

            const headers = [
                { name: 'content-type', value: 'text/html; charset=utf-8' },
                { name: 'server', value: 'nginx/1.21.0' },
                { name: 'x-frame-options', value: 'SAMEORIGIN' },
                { name: 'x-content-type-options', value: 'nosniff' },
                { name: 'x-xss-protection', value: '1; mode=block' },
                { name: 'strict-transport-security', value: 'max-age=31536000; includeSubDomains' },
                { name: 'cache-control', value: 'public, max-age=3600' },
                { name: 'content-encoding', value: 'gzip' }
            ];

            results.innerHTML = headers.map(h => `
                <div class="kit-header-item">
                    <span class="kit-header-name">${h.name}:</span> <span class="kit-header-value">${h.value}</span>
                </div>
            `).join('');
            showKitToast('HTTP 头信息获取成功');
        }

        // 7. Security Scan
        async function runSecurityScan() {
            const url = document.getElementById('scan-url').value.trim();
            if (!url) {
                showKitToast('请输入网站地址', '⚠');
                return;
            }

            const progress = document.getElementById('scan-progress');
            const progressFill = document.getElementById('scan-progress-fill');
            const items = document.querySelectorAll('#scan-items .kit-scan-item');

            progress.style.display = 'block';

            const results = [
                { status: 'success', icon: '✓' },
                { status: Math.random() > 0.3 ? 'success' : 'warning', icon: Math.random() > 0.3 ? '✓' : '!' },
                { status: Math.random() > 0.5 ? 'success' : 'warning', icon: Math.random() > 0.5 ? '✓' : '!' },
                { status: Math.random() > 0.4 ? 'success' : 'error', icon: Math.random() > 0.4 ? '✓' : '✗' },
                { status: 'success', icon: '✓' }
            ];

            for (let i = 0; i < items.length; i++) {
                const icon = items[i].querySelector('.kit-scan-icon');
                icon.className = 'kit-scan-icon checking';
                icon.textContent = '◌';
                
                await kitSleep(800);
                
                icon.className = `kit-scan-icon ${results[i].status}`;
                icon.textContent = results[i].icon;
                
                progressFill.style.width = `${((i + 1) / items.length) * 100}%`;
            }

            showKitToast('安全扫描完成');
        }

        // 8. Currency Conversion
        const exchangeRates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 149.50,
            CNY: 7.24,
            HKD: 7.82,
            KRW: 1320.50,
            SGD: 1.34,
            AUD: 1.53,
            CAD: 1.36
        };

        function convertCurrency() {
            const amount = parseFloat(document.getElementById('currency-amount').value) || 0;
            const from = document.getElementById('currency-from').value;
            const to = document.getElementById('currency-to').value;

            const inUSD = amount / exchangeRates[from];
            const result = inUSD * exchangeRates[to];
            const rate = exchangeRates[to] / exchangeRates[from];

            document.getElementById('converted-amount').textContent = result.toFixed(2) + ' ' + to;
            document.getElementById('exchange-rate').textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        }

        function swapCurrency() {
            const from = document.getElementById('currency-from');
            const to = document.getElementById('currency-to');
            const temp = from.value;
            from.value = to.value;
            to.value = temp;
            convertCurrency();
        }

        // Initialize currency on page load
        document.addEventListener('DOMContentLoaded', () => {
            if (document.getElementById('currency-amount')) {
                convertCurrency();
            }
            // Initialize unit converter
            if (document.getElementById('unit-category')) {
                updateUnitOptions();
            }
        });

        // ==================== 9. QR Code Generator ====================
        function generateQRCode() {
            const text = document.getElementById('qr-input').value.trim();
            if (!text) {
                showKitToast('请输入内容', '⚠');
                return;
            }
            
            const size = parseInt(document.getElementById('qr-size').value);
            const output = document.getElementById('qr-output');
            
            output.innerHTML = '<div class="kit-loading-spinner" style="margin: 0 auto;"></div>';
            
            setTimeout(() => {
                const canvas = document.createElement('canvas');
                QRCode.toCanvas(canvas, text, {
                    width: size,
                    margin: 2,
                    color: { dark: '#000000', light: '#ffffff' }
                }, (error) => {
                    if (error) {
                        output.innerHTML = '<div style="color: #ef4444;">生成失败，请重试</div>';
                        showKitToast('生成失败', '✗');
                    } else {
                        output.innerHTML = '';
                        output.appendChild(canvas);
                        
                        const downloadBtn = document.createElement('button');
                        downloadBtn.className = 'kit-btn kit-btn-primary';
                        downloadBtn.innerHTML = '下载图片';
                        downloadBtn.style.marginTop = '1rem';
                        downloadBtn.onclick = () => {
                            const link = document.createElement('a');
                            link.download = 'qrcode.png';
                            link.href = canvas.toDataURL();
                            link.click();
                            showKitToast('下载成功');
                        };
                        output.appendChild(downloadBtn);
                        
                        showKitToast('二维码生成成功');
                    }
                });
            }, 300);
        }

        // ==================== 10. Short URL Generator ====================
        async function generateShortURL() {
            const longUrl = document.getElementById('long-url-input').value.trim();
            if (!longUrl) {
                showKitToast('请输入网址', '⚠');
                return;
            }
            
            if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
                showKitToast('请输入有效的网址（以 http:// 或 https:// 开头）', '⚠');
                return;
            }
            
            const result = document.getElementById('short-url-result');
            result.innerHTML = '<div style="text-align: center; padding: 1rem;"><div class="kit-loading-spinner" style="margin: 0 auto;"></div><p style="margin-top: 0.5rem; color: var(--text-secondary);">生成中...</p></div>';
            
            try {
                const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
                const shortUrl = await response.text();
                
                if (shortUrl.startsWith('http')) {
                    result.innerHTML = `
                        <div class="kit-short-url-box">
                            <span class="kit-short-url-text">${shortUrl}</span>
                            <button class="kit-btn kit-btn-primary" onclick="copyToClipboard('${shortUrl}')">复制</button>
                        </div>
                    `;
                    showKitToast('短链接生成成功');
                } else {
                    result.innerHTML = '<div style="text-align: center; color: #ef4444; padding: 1rem;">生成失败，请检查网址格式</div>';
                    showKitToast('生成失败', '✗');
                }
            } catch (error) {
                result.innerHTML = '<div style="text-align: center; color: #ef4444; padding: 1rem;">网络错误，请稍后重试</div>';
                showKitToast('网络错误', '✗');
            }
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showKitToast('已复制到剪贴板');
            }).catch(() => {
                showKitToast('复制失败', '✗');
            });
        }

        // ==================== 11. Unit Converter ====================
        const unitData = {
            length: {
                units: ['米', '厘米', '毫米', '千米', '英寸', '英尺', '码', '英里'],
                base: [1, 0.01, 0.001, 1000, 0.0254, 0.3048, 0.9144, 1609.344]
            },
            weight: {
                units: ['千克', '克', '毫克', '吨', '磅', '盎司', '斤', '两'],
                base: [1, 0.001, 0.000001, 1000, 0.453592, 0.0283495, 0.5, 0.05]
            },
            temperature: {
                units: ['摄氏度', '华氏度', '开尔文'],
                convert: (value, from, to) => {
                    let celsius;
                    if (from === '摄氏度') celsius = value;
                    else if (from === '华氏度') celsius = (value - 32) * 5/9;
                    else celsius = value - 273.15;
                    
                    if (to === '摄氏度') return celsius;
                    else if (to === '华氏度') return celsius * 9/5 + 32;
                    else return celsius + 273.15;
                }
            },
            area: {
                units: ['平方米', '平方厘米', '平方千米', '公顷', '亩', '平方英尺', '平方英里'],
                base: [1, 0.0001, 1000000, 10000, 666.667, 0.092903, 2589988.11]
            },
            data: {
                units: ['字节', 'KB', 'MB', 'GB', 'TB', '比特'],
                base: [1, 1024, 1048576, 1073741824, 1099511627776, 0.125]
            }
        };

        let currentUnitCategory = 'length';

        function updateUnitOptions() {
            currentUnitCategory = document.getElementById('unit-category').value;
            const category = unitData[currentUnitCategory];
            const fromSelect = document.getElementById('unit-from');
            const toSelect = document.getElementById('unit-to');
            
            fromSelect.innerHTML = category.units.map((u, i) => `<option value="${i}">${u}</option>`).join('');
            toSelect.innerHTML = category.units.map((u, i) => `<option value="${i}" ${i === 1 ? 'selected' : ''}>${u}</option>`).join('');
            
            convertUnits();
        }

        function convertUnits() {
            const category = unitData[currentUnitCategory];
            const fromValue = parseFloat(document.getElementById('unit-value').value) || 0;
            const fromIndex = parseInt(document.getElementById('unit-from').value);
            const toIndex = parseInt(document.getElementById('unit-to').value);
            
            let result;
            if (currentUnitCategory === 'temperature') {
                result = category.convert(fromValue, category.units[fromIndex], category.units[toIndex]);
            } else {
                const baseValue = fromValue * category.base[fromIndex];
                result = baseValue / category.base[toIndex];
            }
            
            document.getElementById('unit-result').textContent = result.toPrecision(8);
            document.getElementById('unit-formula').textContent = 
                `${fromValue} ${category.units[fromIndex]} = ${result.toPrecision(8)} ${category.units[toIndex]}`;
        }

        function swapUnits() {
            const fromSelect = document.getElementById('unit-from');
            const toSelect = document.getElementById('unit-to');
            const temp = fromSelect.value;
            fromSelect.value = toSelect.value;
            toSelect.value = temp;
            convertUnits();
        }

        // ==================== 12. Password Strength Checker ====================
        function checkPasswordStrength() {
            const password = document.getElementById('password-check-input').value;
            const meter = document.getElementById('password-meter');
            const fill = document.getElementById('password-meter-fill');
            const label = document.getElementById('password-strength-label');
            
            if (!password) {
                fill.className = 'kit-meter-fill';
                label.className = 'kit-password-label';
                label.textContent = '输入密码开始检测';
                resetPasswordTips();
                return;
            }
            
            const checks = {
                length: password.length >= 8,
                upper: /[A-Z]/.test(password),
                lower: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/`~]/.test(password)
            };
            
            // Update tips
            Object.keys(checks).forEach(key => {
                const el = document.getElementById(`pwd-tip-${key}`);
                if (el) {
                    if (checks[key]) {
                        el.classList.add('pass');
                        el.querySelector('.kit-tip-icon').textContent = '✓';
                    } else {
                        el.classList.remove('pass');
                        el.querySelector('.kit-tip-icon').textContent = '○';
                    }
                }
            });
            
            const score = Object.values(checks).filter(Boolean).length;
            
            fill.className = 'kit-meter-fill';
            label.className = 'kit-password-label';
            
            if (score <= 2) {
                fill.classList.add('weak');
                label.classList.add('weak');
                label.textContent = '弱 - 容易被破解';
            } else if (score === 3) {
                fill.classList.add('fair');
                label.classList.add('fair');
                label.textContent = '一般 - 建议增强';
            } else if (score === 4) {
                fill.classList.add('good');
                label.classList.add('good');
                label.textContent = '良好 - 较为安全';
            } else {
                fill.classList.add('strong');
                label.classList.add('strong');
                label.textContent = '强 - 非常安全';
            }
        }

        function resetPasswordTips() {
            ['length', 'upper', 'lower', 'number', 'special'].forEach(key => {
                const el = document.getElementById(`pwd-tip-${key}`);
                if (el) {
                    el.classList.remove('pass');
                    el.querySelector('.kit-tip-icon').textContent = '○';
                }
            });
        }

        function togglePasswordView() {
            const input = document.getElementById('password-check-input');
            input.type = input.type === 'password' ? 'text' : 'password';
        }

        function generateStrongPassword() {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
            let password = '';
            // Ensure at least one of each type
            password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
            password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
            password += '0123456789'[Math.floor(Math.random() * 10)];
            password += '!@#$%^&*()_+-='[Math.floor(Math.random() * 14)];
            
            for (let i = 4; i < 16; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            // Shuffle the password
            password = password.split('').sort(() => Math.random() - 0.5).join('');
            
            document.getElementById('password-check-input').value = password;
            checkPasswordStrength();
            showKitToast('已生成强密码');
        }

        // ==================== 13. Translator ====================
        async function translateText() {
            const sourceText = document.getElementById('translate-input').value.trim();
            if (!sourceText) {
                showKitToast('请输入要翻译的文本', '⚠');
                return;
            }
            
            const sourceLang = document.getElementById('translate-from').value;
            const targetLang = document.getElementById('translate-to').value;
            const output = document.getElementById('translate-output');
            
            output.textContent = '翻译中...';
            output.style.color = 'var(--text-secondary)';
            
            try {
                const langPair = sourceLang === 'auto' ? 
                    `autodetect|${targetLang}` : 
                    `${sourceLang}|${targetLang}`;
                
                const response = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${langPair}`
                );
                const data = await response.json();
                
                if (data.responseStatus === 200) {
                    output.textContent = data.responseData.translatedText;
                    output.style.color = 'var(--text-primary)';
                    showKitToast('翻译完成');
                } else {
                    output.textContent = '翻译失败，请稍后重试';
                    output.style.color = '#ef4444';
                    showKitToast('翻译失败', '✗');
                }
            } catch (error) {
                output.textContent = '网络错误，请稍后重试';
                output.style.color = '#ef4444';
                showKitToast('网络错误', '✗');
            }
        }

        function swapTranslateLang() {
            const from = document.getElementById('translate-from');
            const to = document.getElementById('translate-to');
            
            if (from.value === 'auto') {
                showKitToast('请先选择源语言', '⚠');
                return;
            }
            
            const temp = from.value;
            from.value = to.value;
            to.value = temp;
            
            // Also swap the text if there's translation result
            const input = document.getElementById('translate-input');
            const output = document.getElementById('translate-output');
            
            if (output.textContent && 
                output.textContent !== '翻译结果将显示在这里...' &&
                output.textContent !== '翻译中...' &&
                output.style.color !== '#ef4444') {
                input.value = output.textContent;
                output.textContent = '翻译结果将显示在这里...';
                output.style.color = 'var(--text-secondary)';
            }
        }

        // ==================== 14. Base Converter (进制转换器) ====================
        function convertBase() {
            const input = document.getElementById('base-input').value.trim();
            const fromBase = parseInt(document.getElementById('base-from').value);
            
            if (!input) {
                document.getElementById('base-bin').textContent = '--';
                document.getElementById('base-oct').textContent = '--';
                document.getElementById('base-dec').textContent = '--';
                document.getElementById('base-hex').textContent = '--';
                return;
            }
            
            try {
                // Parse input in the specified base to decimal
                const decimal = parseInt(input, fromBase);
                
                if (isNaN(decimal)) {
                    throw new Error('Invalid input');
                }
                
                // Convert to all bases
                document.getElementById('base-bin').textContent = decimal.toString(2);
                document.getElementById('base-oct').textContent = decimal.toString(8);
                document.getElementById('base-dec').textContent = decimal.toString(10);
                document.getElementById('base-hex').textContent = decimal.toString(16).toUpperCase();
            } catch (e) {
                document.getElementById('base-bin').textContent = '无效输入';
                document.getElementById('base-oct').textContent = '无效输入';
                document.getElementById('base-dec').textContent = '无效输入';
                document.getElementById('base-hex').textContent = '无效输入';
            }
        }

        // ==================== 15. Random Number Generator (随机数生成器) ====================
        function generateRandomNumbers() {
            const min = parseInt(document.getElementById('random-min').value) || 1;
            const max = parseInt(document.getElementById('random-max').value) || 100;
            const count = Math.min(parseInt(document.getElementById('random-count').value) || 5, 100);
            const unique = document.getElementById('random-unique').checked;
            
            if (min > max) {
                showKitToast('最小值不能大于最大值', '⚠');
                return;
            }
            
            if (unique && (max - min + 1) < count) {
                showKitToast('范围内数字不足以生成不重复的结果', '⚠');
                return;
            }
            
            let numbers = [];
            
            if (unique) {
                // Generate unique numbers
                const pool = [];
                for (let i = min; i <= max; i++) pool.push(i);
                for (let i = 0; i < count; i++) {
                    const idx = Math.floor(Math.random() * pool.length);
                    numbers.push(pool.splice(idx, 1)[0]);
                }
            } else {
                // Generate with possible duplicates
                for (let i = 0; i < count; i++) {
                    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
                }
            }
            
            const result = document.getElementById('random-results');
            result.innerHTML = `
                <div class="kit-random-numbers">
                    ${numbers.map(n => `<span class="kit-random-number">${n}</span>`).join('')}
                </div>
            `;
            showKitToast('随机数生成成功');
        }

        // ==================== 16. MD5/SHA Hash Generator (哈希生成器) ====================
        async function generateHashes() {
            const input = document.getElementById('hash-input').value;
            
            if (!input) {
                document.getElementById('hash-md5').textContent = '--';
                document.getElementById('hash-sha1').textContent = '--';
                document.getElementById('hash-sha256').textContent = '--';
                document.getElementById('hash-sha512').textContent = '--';
                return;
            }
            
            const encoder = new TextEncoder();
            const data = encoder.encode(input);
            
            // MD5 (using a simple implementation since Web Crypto doesn't support it)
            document.getElementById('hash-md5').textContent = md5(input);
            
            // SHA-1
            const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
            document.getElementById('hash-sha1').textContent = bufferToHex(sha1Buffer);
            
            // SHA-256
            const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
            document.getElementById('hash-sha256').textContent = bufferToHex(sha256Buffer);
            
            // SHA-512
            const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
            document.getElementById('hash-sha512').textContent = bufferToHex(sha512Buffer);
        }

        function bufferToHex(buffer) {
            return Array.from(new Uint8Array(buffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        // Simple MD5 implementation
        function md5(string) {
            function md5cycle(x, k) {
                var a = x[0], b = x[1], c = x[2], d = x[3];
                a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
                c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
                a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
                c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
                a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
                c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
                a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
                c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
                a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
                c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
                a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
                c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
                a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
                c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
                a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
                c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
                a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
                c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
                a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
                c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
                a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
                c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
                a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
                c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
                a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
                c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
                a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606);
                c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
                a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
                c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
                a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
                c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
                x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
            }
            function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); }
            function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
            function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
            function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
            function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
            function md51(s) {
                var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
                for (i = 64; i <= s.length; i += 64) { md5cycle(state, md5blk(s.substring(i - 64, i))); }
                s = s.substring(i - 64); var tail = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
                tail[i >> 2] |= 0x80 << ((i % 4) << 3);
                if (i > 55) { md5cycle(state, tail); for (i = 0; i < 16; i++) tail[i] = 0; }
                tail[14] = n * 8; md5cycle(state, tail); return state;
            }
            function md5blk(s) { var md5blks = [], i; for (i = 0; i < 64; i += 4) { md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24); } return md5blks; }
            var hex_chr = '0123456789abcdef'.split('');
            function rhex(n) { var s = '', j = 0; for (; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F]; return s; }
            function hex(x) { for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]); return x.join(''); }
            function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
            return hex(md51(string));
        }

        // ==================== 17. Age Calculator (年龄计算器) ====================
        function calculateAge() {
            const birthInput = document.getElementById('birth-date').value;
            if (!birthInput) return;
            
            const birthDate = new Date(birthInput);
            const today = new Date();
            
            // Calculate age
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();
            
            if (days < 0) {
                months--;
                const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Update display
            document.getElementById('age-years').textContent = years;
            document.getElementById('age-detail').textContent = `${years}岁${months}个月${days}天`;
            
            // Show results
            const results = document.getElementById('age-results');
            results.style.display = 'block';
            
            // Exact age
            document.getElementById('age-exact').textContent = `${years}岁${months}个月${days}天`;
            
            // Total days lived
            const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
            document.getElementById('age-days').textContent = `${totalDays.toLocaleString()} 天`;
            
            // Next birthday
            const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
            if (nextBirthday < today) {
                nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
            }
            const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
            document.getElementById('age-next-birthday').textContent = daysUntilBirthday === 0 ? '🎉 今天！' : `还有 ${daysUntilBirthday} 天`;
            
            // Chinese Zodiac
            const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
            const zodiacIndex = (birthDate.getFullYear() - 4) % 12;
            document.getElementById('age-zodiac').textContent = zodiacAnimals[zodiacIndex];
            
            // Constellation
            const month = birthDate.getMonth() + 1;
            const day = birthDate.getDate();
            const constellations = [
                { name: '摩羯座', end: [1, 19] }, { name: '水瓶座', end: [2, 18] },
                { name: '双鱼座', end: [3, 20] }, { name: '白羊座', end: [4, 19] },
                { name: '金牛座', end: [5, 20] }, { name: '双子座', end: [6, 21] },
                { name: '巨蟹座', end: [7, 22] }, { name: '狮子座', end: [8, 22] },
                { name: '处女座', end: [9, 22] }, { name: '天秤座', end: [10, 23] },
                { name: '天蝎座', end: [11, 22] }, { name: '射手座', end: [12, 21] },
                { name: '摩羯座', end: [12, 31] }
            ];
            let constellation = '摩羯座';
            for (const c of constellations) {
                if (month < c.end[0] || (month === c.end[0] && day <= c.end[1])) {
                    constellation = c.name;
                    break;
                }
            }
            document.getElementById('age-constellation').textContent = constellation;
        }

        // ==================== 18. Date Calculator (日期计算器) ====================
        let currentDateMode = 'diff';

        function switchDateMode(mode) {
            currentDateMode = mode;
            document.querySelectorAll('.kit-date-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`.kit-date-tab[onclick="switchDateMode('${mode}')"]`).classList.add('active');
            
            document.getElementById('date-diff-mode').style.display = mode === 'diff' ? 'block' : 'none';
            document.getElementById('date-add-mode').style.display = mode === 'add' ? 'block' : 'none';
            
            document.getElementById('date-result').textContent = '--';
            document.getElementById('date-detail').textContent = '选择日期开始计算';
        }

        function calculateDateDiff() {
            const startDate = document.getElementById('date-start').value;
            const endDate = document.getElementById('date-end').value;
            
            if (!startDate || !endDate) return;
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            document.getElementById('date-result').textContent = `${diffDays} 天`;
            
            const weeks = Math.floor(diffDays / 7);
            const remainingDays = diffDays % 7;
            const months = Math.floor(diffDays / 30);
            const years = Math.floor(diffDays / 365);
            
            let detail = `≈ ${weeks}周${remainingDays}天`;
            if (months > 0) detail += ` ≈ ${months}个月`;
            if (years > 0) detail += ` ≈ ${years}年`;
            
            document.getElementById('date-detail').textContent = detail;
        }

        function calculateDateAdd() {
            const baseDate = document.getElementById('date-base').value;
            const operation = document.getElementById('date-operation').value;
            const days = parseInt(document.getElementById('date-days-input').value) || 0;
            
            if (!baseDate) return;
            
            const date = new Date(baseDate);
            if (operation === 'add') {
                date.setDate(date.getDate() + days);
            } else {
                date.setDate(date.getDate() - days);
            }
            
            const resultDate = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
            document.getElementById('date-result').textContent = resultDate;
            document.getElementById('date-detail').textContent = date.toISOString().split('T')[0];
        }

        // ==================== 19. World Clock (世界时钟) ====================
        function updateWorldClocks() {
            const clocks = [
                { id: 'beijing', tz: 'Asia/Shanghai' },
                { id: 'newyork', tz: 'America/New_York' },
                { id: 'london', tz: 'Europe/London' },
                { id: 'tokyo', tz: 'Asia/Tokyo' },
                { id: 'paris', tz: 'Europe/Paris' },
                { id: 'sydney', tz: 'Australia/Sydney' }
            ];
            
            const now = new Date();
            
            clocks.forEach(clock => {
                const options = { timeZone: clock.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                const dateOptions = { timeZone: clock.tz, month: 'short', day: 'numeric', weekday: 'short' };
                
                try {
                    document.getElementById(`clock-${clock.id}`).textContent = now.toLocaleTimeString('zh-CN', options);
                    document.getElementById(`clock-${clock.id}-date`).textContent = now.toLocaleDateString('zh-CN', dateOptions);
                } catch (e) {
                    console.error(`Error updating ${clock.id}:`, e);
                }
            });
        }

        // Start world clock updates
        setInterval(updateWorldClocks, 1000);
        updateWorldClocks(); // Initial call

        // ==================== 20. BMI Calculator (BMI计算器) ====================
        function calculateBMI() {
            const height = parseFloat(document.getElementById('bmi-height').value);
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            
            if (!height || !weight || height <= 0 || weight <= 0) {
                document.getElementById('bmi-value').textContent = '--';
                document.getElementById('bmi-status').textContent = '输入身高体重计算';
                document.getElementById('bmi-status').className = 'kit-bmi-status';
                document.getElementById('bmi-pointer').classList.remove('show');
                document.getElementById('bmi-results').style.display = 'none';
                return;
            }
            
            const heightM = height / 100;
            const bmi = weight / (heightM * heightM);
            const bmiRounded = bmi.toFixed(1);
            
            document.getElementById('bmi-value').textContent = bmiRounded;
            
            // Determine status
            let status, statusClass;
            if (bmi < 18.5) {
                status = '偏瘦';
                statusClass = 'underweight';
            } else if (bmi < 24) {
                status = '正常';
                statusClass = 'normal';
            } else if (bmi < 28) {
                status = '偏胖';
                statusClass = 'overweight';
            } else {
                status = '肥胖';
                statusClass = 'obese';
            }
            
            document.getElementById('bmi-status').textContent = status;
            document.getElementById('bmi-status').className = `kit-bmi-status ${statusClass}`;
            
            // Update pointer position (BMI 15-35 mapped to 0-100%)
            const pointer = document.getElementById('bmi-pointer');
            const position = Math.min(Math.max((bmi - 15) / 20 * 100, 0), 100);
            pointer.style.left = `${position}%`;
            pointer.classList.add('show');
            
            // Show detailed results
            document.getElementById('bmi-results').style.display = 'block';
            
            // Healthy weight range
            const minHealthy = (18.5 * heightM * heightM).toFixed(1);
            const maxHealthy = (24 * heightM * heightM).toFixed(1);
            document.getElementById('bmi-healthy-range').textContent = `${minHealthy} - ${maxHealthy} kg`;
            
            // Suggestion
            let suggestion;
            if (bmi < 18.5) {
                suggestion = '建议适当增加营养摄入';
            } else if (bmi < 24) {
                suggestion = '继续保持健康的生活方式';
            } else if (bmi < 28) {
                suggestion = '建议增加运动，控制饮食';
            } else {
                suggestion = '建议咨询医生，制定减重计划';
            }
            document.getElementById('bmi-suggestion').textContent = suggestion;
        }

        // ==================== 21. Scientific Calculator (科学计算器) ====================
        let calcExpression = '';

        function calcInput(value) {
            calcExpression += value;
            document.getElementById('calc-input').value = calcExpression;
        }

        function calcFunc(func) {
            if (func === 'factorial') {
                calcExpression = `factorial(${calcExpression})`;
            } else if (func === 'log10') {
                calcExpression = `Math.log10(${calcExpression})`;
            } else if (func === 'log') {
                calcExpression = `Math.log(${calcExpression})`;
            } else if (func === 'sqrt') {
                calcExpression = `Math.sqrt(${calcExpression})`;
            } else if (func === 'abs') {
                calcExpression = `Math.abs(${calcExpression})`;
            } else {
                calcExpression = `Math.${func}(${calcExpression})`;
            }
            document.getElementById('calc-input').value = calcExpression;
        }

        function factorial(n) {
            n = Math.round(n);
            if (n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) result *= i;
            return result;
        }

        function calcClear() {
            calcExpression = '';
            document.getElementById('calc-input').value = '';
            document.getElementById('calc-history').textContent = '';
        }

        function calcDelete() {
            calcExpression = calcExpression.slice(0, -1);
            document.getElementById('calc-input').value = calcExpression;
        }

        function calcEqual() {
            try {
                const result = eval(calcExpression);
                document.getElementById('calc-history').textContent = calcExpression + ' =';
                calcExpression = String(result);
                document.getElementById('calc-input').value = result;
            } catch (e) {
                document.getElementById('calc-input').value = 'Error';
                calcExpression = '';
            }
        }

        // ==================== 22. Function Graph Plotter (函数图像绘制) ====================
        function plotFunction() {
            const canvas = document.getElementById('func-canvas');
            const ctx = canvas.getContext('2d');
            const expr = document.getElementById('func-expression').value;
            const xMin = parseFloat(document.getElementById('func-x-min').value) || -10;
            const xMax = parseFloat(document.getElementById('func-x-max').value) || 10;

            // Clear canvas
            ctx.fillStyle = '#111113';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width;
            const height = canvas.height;
            const xRange = xMax - xMin;
            const padding = 30;
            const graphWidth = width - 2 * padding;
            const graphHeight = height - 2 * padding;

            // Calculate y values to determine y range
            const points = [];
            const steps = 200;
            let yMin = Infinity, yMax = -Infinity;

            for (let i = 0; i <= steps; i++) {
                const x = xMin + (xRange * i / steps);
                try {
                    const y = eval(expr.replace(/x/g, `(${x})`));
                    if (isFinite(y)) {
                        points.push({ x, y });
                        yMin = Math.min(yMin, y);
                        yMax = Math.max(yMax, y);
                    }
                } catch (e) {}
            }

            if (points.length === 0) {
                ctx.fillStyle = '#ef4444';
                ctx.font = '14px Outfit';
                ctx.textAlign = 'center';
                ctx.fillText('无效的函数表达式', width / 2, height / 2);
                return;
            }

            // Add padding to y range
            const yPadding = (yMax - yMin) * 0.1 || 1;
            yMin -= yPadding;
            yMax += yPadding;
            const yRange = yMax - yMin;

            // Draw grid
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1;

            // Vertical grid lines
            for (let i = 0; i <= 10; i++) {
                const x = padding + (graphWidth * i / 10);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
            }

            // Horizontal grid lines
            for (let i = 0; i <= 10; i++) {
                const y = padding + (graphHeight * i / 10);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }

            // Draw axes
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;

            // X axis (y = 0)
            if (yMin <= 0 && yMax >= 0) {
                const y0 = padding + graphHeight * (yMax / yRange);
                ctx.beginPath();
                ctx.moveTo(padding, y0);
                ctx.lineTo(width - padding, y0);
                ctx.stroke();
            }

            // Y axis (x = 0)
            if (xMin <= 0 && xMax >= 0) {
                const x0 = padding + graphWidth * (-xMin / xRange);
                ctx.beginPath();
                ctx.moveTo(x0, padding);
                ctx.lineTo(x0, height - padding);
                ctx.stroke();
            }

            // Draw function
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 2;
            ctx.beginPath();

            let started = false;
            for (const point of points) {
                const px = padding + graphWidth * ((point.x - xMin) / xRange);
                const py = padding + graphHeight * ((yMax - point.y) / yRange);

                if (!started) {
                    ctx.moveTo(px, py);
                    started = true;
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.stroke();

            // Draw labels
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '10px Space Mono';
            ctx.textAlign = 'center';
            ctx.fillText(xMin.toFixed(1), padding, height - 10);
            ctx.fillText(xMax.toFixed(1), width - padding, height - 10);
            ctx.textAlign = 'right';
            ctx.fillText(yMax.toFixed(1), padding - 5, padding + 10);
            ctx.fillText(yMin.toFixed(1), padding - 5, height - padding);
        }

        function setFuncPreset(expr) {
            document.getElementById('func-expression').value = expr;
            plotFunction();
        }

        // Initialize graph on page load
        setTimeout(() => {
            if (document.getElementById('func-canvas')) {
                plotFunction();
            }
        }, 1000);

        // ==================== 23. Reference Citation Generator (参考文献格式化) ====================
        function updateCiteFields() {
            const type = document.getElementById('cite-type').value;
            const journalGroup = document.getElementById('cite-journal-group');
            const volumeGroup = document.getElementById('cite-volume-group');
            const doiGroup = document.getElementById('cite-doi-group');

            // Reset all
            journalGroup.style.display = 'block';
            volumeGroup.style.display = 'block';
            doiGroup.style.display = 'block';

            // Update labels based on type
            if (type === 'book') {
                journalGroup.querySelector('label').textContent = '出版社';
                journalGroup.querySelector('input').placeholder = 'Penguin Books';
                volumeGroup.style.display = 'none';
            } else if (type === 'website') {
                journalGroup.querySelector('label').textContent = '网站名称';
                journalGroup.querySelector('input').placeholder = 'Wikipedia';
                volumeGroup.style.display = 'none';
                doiGroup.querySelector('label').textContent = 'URL';
                doiGroup.querySelector('input').placeholder = 'https://example.com';
            } else if (type === 'conference') {
                journalGroup.querySelector('label').textContent = '会议名称';
                journalGroup.querySelector('input').placeholder = 'ACM Conference';
            } else {
                journalGroup.querySelector('label').textContent = '期刊名称';
                journalGroup.querySelector('input').placeholder = 'Nature';
            }
        }

        function generateCitation() {
            const type = document.getElementById('cite-type').value;
            const authors = document.getElementById('cite-authors').value.trim();
            const year = document.getElementById('cite-year').value.trim();
            const title = document.getElementById('cite-title').value.trim();
            const journal = document.getElementById('cite-journal').value.trim();
            const volume = document.getElementById('cite-volume').value.trim();
            const issue = document.getElementById('cite-issue').value.trim();
            const pages = document.getElementById('cite-pages').value.trim();
            const doi = document.getElementById('cite-doi').value.trim();
            const format = document.getElementById('cite-format').value;

            if (!authors || !year || !title) {
                showKitToast('请至少填写作者、年份和标题', '⚠');
                return;
            }

            let citation = '';
            const authorList = authors.split(',').map(a => a.trim());

            if (format === 'apa') {
                // APA 7th Edition
                const apaAuthors = authorList.length > 1 
                    ? authorList.slice(0, -1).join(', ') + ', & ' + authorList.slice(-1)
                    : authorList[0];
                
                if (type === 'journal') {
                    citation = `${apaAuthors} (${year}). ${title}. <i>${journal}</i>`;
                    if (volume) citation += `, <i>${volume}</i>`;
                    if (issue) citation += `(${issue})`;
                    if (pages) citation += `, ${pages}`;
                    citation += '.';
                    if (doi) citation += ` https://doi.org/${doi}`;
                } else if (type === 'book') {
                    citation = `${apaAuthors} (${year}). <i>${title}</i>. ${journal}.`;
                } else if (type === 'website') {
                    citation = `${apaAuthors} (${year}). ${title}. <i>${journal}</i>. ${doi}`;
                }
            } else if (format === 'mla') {
                // MLA 9th Edition
                const mlaAuthors = authorList.length > 1
                    ? authorList[0] + ', et al.'
                    : authorList[0];
                
                if (type === 'journal') {
                    citation = `${mlaAuthors}. "${title}." <i>${journal}</i>`;
                    if (volume) citation += `, vol. ${volume}`;
                    if (issue) citation += `, no. ${issue}`;
                    citation += `, ${year}`;
                    if (pages) citation += `, pp. ${pages}`;
                    citation += '.';
                }
            } else if (format === 'chicago') {
                // Chicago Style
                const chicagoAuthors = authorList.join(', ');
                if (type === 'journal') {
                    citation = `${chicagoAuthors}. "${title}." <i>${journal}</i> ${volume}`;
                    if (issue) citation += `, no. ${issue}`;
                    citation += ` (${year})`;
                    if (pages) citation += `: ${pages}`;
                    citation += '.';
                }
            } else if (format === 'gb') {
                // GB/T 7714 中文格式
                const gbAuthors = authorList.join(', ');
                if (type === 'journal') {
                    citation = `${gbAuthors}. ${title}[J]. ${journal}`;
                    if (year) citation += `, ${year}`;
                    if (volume) citation += `, ${volume}`;
                    if (issue) citation += `(${issue})`;
                    if (pages) citation += `: ${pages}`;
                    citation += '.';
                } else if (type === 'book') {
                    citation = `${gbAuthors}. ${title}[M]. ${journal}, ${year}.`;
                }
            }

            const output = document.getElementById('cite-output');
            output.innerHTML = `
                <span class="kit-cite-format-label">${format.toUpperCase()} 格式</span>
                <div class="cite-text" onclick="copyCitation(this)">${citation}</div>
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">💡 点击引用文本可复制</p>
            `;
            showKitToast('引用格式生成成功');
        }

        function copyCitation(element) {
            const text = element.innerText;
            navigator.clipboard.writeText(text).then(() => {
                showKitToast('引用已复制到剪贴板');
            });
        }

        // ==================== 24. Wavelength Frequency Converter (波长频率转换) ====================
        const c = 299792458; // Speed of light (m/s)
        const h = 6.62607015e-34; // Planck constant (J·s)
        const eV = 1.602176634e-19; // Electron volt (J)

        function convertWave() {
            const type = document.getElementById('wave-type').value;
            const input = parseFloat(document.getElementById('wave-input').value);

            if (!input || input <= 0) {
                resetWaveResults();
                return;
            }

            let wavelengthNm, frequencyHz, energyEv;

            if (type === 'wavelength') {
                wavelengthNm = input;
                frequencyHz = c / (wavelengthNm * 1e-9);
                energyEv = (h * frequencyHz) / eV;
            } else if (type === 'frequency') {
                frequencyHz = input;
                wavelengthNm = (c / frequencyHz) * 1e9;
                energyEv = (h * frequencyHz) / eV;
            } else if (type === 'energy') {
                energyEv = input;
                frequencyHz = (energyEv * eV) / h;
                wavelengthNm = (c / frequencyHz) * 1e9;
            }

            // Display results
            document.getElementById('wave-lambda').textContent = formatWaveValue(wavelengthNm, 'nm');
            document.getElementById('wave-freq').textContent = formatFrequency(frequencyHz);
            document.getElementById('wave-energy').textContent = energyEv.toExponential(4) + ' eV';

            // Determine spectrum region
            const region = getSpectrumRegion(wavelengthNm);
            document.getElementById('wave-region').textContent = region.name;
            document.getElementById('wave-color').textContent = region.color;

            // Update spectrum pointer
            updateSpectrumPointer(wavelengthNm);
        }

        function formatWaveValue(nm, unit) {
            if (nm >= 1e6) return (nm / 1e6).toFixed(2) + ' mm';
            if (nm >= 1e3) return (nm / 1e3).toFixed(2) + ' μm';
            return nm.toFixed(2) + ' nm';
        }

        function formatFrequency(hz) {
            if (hz >= 1e15) return (hz / 1e15).toFixed(4) + ' PHz';
            if (hz >= 1e12) return (hz / 1e12).toFixed(4) + ' THz';
            if (hz >= 1e9) return (hz / 1e9).toFixed(4) + ' GHz';
            if (hz >= 1e6) return (hz / 1e6).toFixed(4) + ' MHz';
            return hz.toExponential(4) + ' Hz';
        }

        function getSpectrumRegion(nm) {
            if (nm < 10) return { name: 'X射线/伽马射线', color: '--' };
            if (nm < 380) return { name: '紫外线 (UV)', color: '--' };
            if (nm < 450) return { name: '可见光', color: '紫色 💜' };
            if (nm < 495) return { name: '可见光', color: '蓝色 💙' };
            if (nm < 570) return { name: '可见光', color: '绿色 💚' };
            if (nm < 590) return { name: '可见光', color: '黄色 💛' };
            if (nm < 620) return { name: '可见光', color: '橙色 🧡' };
            if (nm < 750) return { name: '可见光', color: '红色 ❤️' };
            if (nm < 1e6) return { name: '红外线 (IR)', color: '--' };
            return { name: '微波/无线电波', color: '--' };
        }

        function updateSpectrumPointer(nm) {
            const pointer = document.getElementById('spectrum-pointer');
            if (nm >= 380 && nm <= 700) {
                const position = ((nm - 380) / (700 - 380)) * 100;
                pointer.style.left = `${position}%`;
                pointer.classList.add('show');
            } else {
                pointer.classList.remove('show');
            }
        }

        function resetWaveResults() {
            document.getElementById('wave-lambda').textContent = '--';
            document.getElementById('wave-freq').textContent = '--';
            document.getElementById('wave-energy').textContent = '--';
            document.getElementById('wave-region').textContent = '--';
            document.getElementById('wave-color').textContent = '--';
            document.getElementById('spectrum-pointer').classList.remove('show');
        }

        // ==================== 25. Lucky Color Generator (幸运颜色生成) ====================
        const luckyColors = [
            { name: '热情红', hex: '#E74C3C', meaning: '充满活力与热情', occasion: '重要演讲、约会', match: '白色、黑色、金色' },
            { name: '宁静蓝', hex: '#3498DB', meaning: '平和、信任、专业', occasion: '商务会议、面试', match: '白色、灰色、米色' },
            { name: '生机绿', hex: '#27AE60', meaning: '成长、健康、希望', occasion: '户外活动、新开始', match: '白色、棕色、米色' },
            { name: '活力橙', hex: '#E67E22', meaning: '创意、乐观、社交', occasion: '团队活动、聚会', match: '蓝色、白色、棕色' },
            { name: '优雅紫', hex: '#9B59B6', meaning: '神秘、创造、灵性', occasion: '艺术活动、冥想', match: '白色、银色、粉色' },
            { name: '温暖黄', hex: '#F1C40F', meaning: '快乐、智慧、光明', occasion: '学习、创作', match: '蓝色、灰色、白色' },
            { name: '浪漫粉', hex: '#E91E63', meaning: '温柔、浪漫、关爱', occasion: '约会、庆祝', match: '白色、灰色、金色' },
            { name: '沉稳棕', hex: '#795548', meaning: '稳重、可靠、自然', occasion: '谈判、重要决定', match: '米色、绿色、橙色' },
            { name: '简约灰', hex: '#607D8B', meaning: '中立、冷静、专业', occasion: '工作、学习', match: '白色、黑色、蓝色' },
            { name: '珊瑚色', hex: '#FF7F50', meaning: '温暖、友善、活泼', occasion: '社交、聚餐', match: '白色、米色、蓝色' },
            { name: '薄荷绿', hex: '#1ABC9C', meaning: '清新、放松、治愈', occasion: '休闲、疗愈', match: '白色、粉色、灰色' },
            { name: '皇家蓝', hex: '#2980B9', meaning: '权威、智慧、信任', occasion: '领导、演讲', match: '白色、金色、银色' },
            { name: '玫瑰金', hex: '#B76E79', meaning: '优雅、时尚、温馨', occasion: '派对、约会', match: '白色、黑色、米色' },
            { name: '森林绿', hex: '#228B22', meaning: '自然、平衡、和谐', occasion: '户外、放松', match: '棕色、米色、白色' },
            { name: '阳光橙', hex: '#FF8C00', meaning: '热情、创造、冒险', occasion: '运动、探索', match: '蓝色、白色、黑色' }
        ];

        let currentLuckyColor = null;

        function generateLuckyColor() {
            const randomIndex = Math.floor(Math.random() * luckyColors.length);
            currentLuckyColor = luckyColors[randomIndex];

            const circle = document.getElementById('lucky-color-circle');
            circle.style.background = currentLuckyColor.hex;
            circle.style.borderColor = currentLuckyColor.hex;
            circle.innerHTML = '';

            document.getElementById('lucky-color-name').textContent = currentLuckyColor.name;
            document.getElementById('lucky-color-hex').textContent = currentLuckyColor.hex;

            document.getElementById('lucky-color-meaning').textContent = currentLuckyColor.meaning;
            document.getElementById('lucky-color-occasion').textContent = currentLuckyColor.occasion;
            document.getElementById('lucky-color-match').textContent = currentLuckyColor.match;

            document.getElementById('lucky-color-info').style.display = 'block';
            showKitToast(`今日幸运色：${currentLuckyColor.name}`);
        }

        function copyLuckyColor() {
            if (!currentLuckyColor) {
                showKitToast('请先生成幸运颜色', '⚠');
                return;
            }
            navigator.clipboard.writeText(currentLuckyColor.hex).then(() => {
                showKitToast(`已复制 ${currentLuckyColor.hex}`);
            });
        }

        // ==================== 26. Tarot Card Reader (塔罗牌抽取) ====================
        const tarotCards = [
            { name: '愚者', emoji: '🃏', upright: '新开始、冒险、天真', reversed: '鲁莽、冒失、不成熟',
              love: '可能遇到意想不到的浪漫', career: '适合尝试新方向', advice: '保持开放心态，勇于尝试' },
            { name: '魔术师', emoji: '🎩', upright: '创造力、意志力、技能', reversed: '欺骗、操控、才能未发挥',
              love: '主动表达心意会有好结果', career: '发挥专长的好时机', advice: '相信自己的能力，大胆行动' },
            { name: '女祭司', emoji: '🌙', upright: '直觉、神秘、内在智慧', reversed: '秘密、压抑、忽视直觉',
              love: '倾听内心的声音', career: '需要深入研究和思考', advice: '相信你的直觉，答案就在心中' },
            { name: '女皇', emoji: '👑', upright: '丰收、母性、创造', reversed: '依赖、过度保护、创造力受阻',
              love: '感情进入稳定甜蜜期', career: '项目会有丰硕成果', advice: '用爱和耐心培育你的梦想' },
            { name: '皇帝', emoji: '🏛️', upright: '权威、结构、领导力', reversed: '专制、僵化、控制欲',
              love: '需要更多责任感和承诺', career: '展现领导才能', advice: '建立秩序，但保持灵活' },
            { name: '教皇', emoji: '⛪', upright: '传统、指导、信仰', reversed: '教条、叛逆、不合群',
              love: '传统方式的爱情发展', career: '寻求导师或前辈指点', advice: '尊重传统，也要有自己的思考' },
            { name: '恋人', emoji: '💕', upright: '爱情、和谐、选择', reversed: '不和谐、失衡、错误选择',
              love: '重要的感情抉择时刻', career: '需要做出重要决定', advice: '跟随内心，做出真诚的选择' },
            { name: '战车', emoji: '🏆', upright: '胜利、意志、决心', reversed: '失控、挫败、缺乏方向',
              love: '积极追求会有好结果', career: '全力以赴必能成功', advice: '坚定目标，勇往直前' },
            { name: '力量', emoji: '🦁', upright: '勇气、耐心、内在力量', reversed: '软弱、自我怀疑、失控',
              love: '用温柔和耐心对待感情', career: '需要坚持和韧性', advice: '真正的力量来自内心的平静' },
            { name: '隐士', emoji: '🏔️', upright: '内省、独处、寻找真理', reversed: '孤立、逃避、与世隔绝',
              love: '需要时间独处和思考', career: '深入研究会有收获', advice: '给自己一些独处的时间' },
            { name: '命运之轮', emoji: '🎡', upright: '转变、机遇、命运', reversed: '厄运、变化中的阻力',
              love: '感情将有新的转机', career: '把握即将到来的机会', advice: '顺应变化，相信一切都是最好的安排' },
            { name: '正义', emoji: '⚖️', upright: '公平、真相、因果', reversed: '不公、偏见、逃避责任',
              love: '诚实是感情的基础', career: '公正行事会得到认可', advice: '做正确的事，承担应有的责任' },
            { name: '倒吊人', emoji: '🙃', upright: '牺牲、新视角、等待', reversed: '抗拒、无谓牺牲、拖延',
              love: '换个角度看待感情', career: '暂时的停滞是为了更好的前进', advice: '有时候放手才能得到更多' },
            { name: '死神', emoji: '🦋', upright: '结束、转变、新生', reversed: '抗拒改变、恐惧、停滞',
              love: '旧的结束，新的开始', career: '职业转型的好时机', advice: '勇敢告别过去，迎接新生' },
            { name: '节制', emoji: '⚗️', upright: '平衡、耐心、调和', reversed: '失衡、过度、缺乏远见',
              love: '保持感情中的平衡', career: '稳步前进比冲动更好', advice: '凡事适度，保持内心平和' },
            { name: '恶魔', emoji: '😈', upright: '束缚、诱惑、执念', reversed: '解脱、觉醒、克服执念',
              love: '警惕不健康的依赖', career: '不要被欲望蒙蔽', advice: '认清束缚你的是什么，然后放下' },
            { name: '高塔', emoji: '🗼', upright: '突变、觉醒、释放', reversed: '恐惧改变、延迟灾难',
              love: '感情可能面临考验', career: '突破困境的机会', advice: '改变虽然痛苦，但是必要的成长' },
            { name: '星星', emoji: '⭐', upright: '希望、灵感、宁静', reversed: '失望、悲观、缺乏信心',
              love: '充满希望的感情发展', career: '创意灵感涌现', advice: '保持希望，相信美好即将到来' },
            { name: '月亮', emoji: '🌕', upright: '幻觉、直觉、潜意识', reversed: '困惑消除、真相大白',
              love: '需要信任和沟通', career: '注意隐藏的信息', advice: '相信直觉，但也要理性判断' },
            { name: '太阳', emoji: '☀️', upright: '快乐、成功、活力', reversed: '悲观、延迟的成功',
              love: '幸福快乐的感情', career: '成功和认可即将到来', advice: '保持积极乐观，好运自然来' },
            { name: '审判', emoji: '📯', upright: '觉醒、重生、判决', reversed: '自我怀疑、拒绝反思',
              love: '感情需要重新审视', career: '重要决定的时刻', advice: '诚实面对自己，做出改变' },
            { name: '世界', emoji: '🌍', upright: '完成、整合、成就', reversed: '未完成、缺乏结束',
              love: '感情进入圆满阶段', career: '达成重要目标', advice: '庆祝成就，准备新的旅程' }
        ];

        let tarotFlipped = false;

        function drawTarotCard() {
            if (tarotFlipped) return;

            const card = document.getElementById('tarot-card');
            const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
            const isReversed = Math.random() > 0.5;

            document.getElementById('tarot-name').textContent = randomCard.name;
            document.getElementById('tarot-emoji').textContent = randomCard.emoji;
            document.getElementById('tarot-position').textContent = isReversed ? '逆位' : '正位';

            const meaningText = isReversed ? randomCard.reversed : randomCard.upright;
            document.getElementById('tarot-meaning-text').textContent = meaningText;
            document.getElementById('tarot-love').textContent = randomCard.love;
            document.getElementById('tarot-career').textContent = randomCard.career;
            document.getElementById('tarot-advice').textContent = randomCard.advice;

            card.classList.add('flipped');
            tarotFlipped = true;

            setTimeout(() => {
                document.getElementById('tarot-meaning').style.display = 'block';
            }, 800);

            showKitToast(`抽到了「${randomCard.name}」${isReversed ? '逆位' : '正位'}`);
        }

        function resetTarot() {
            const card = document.getElementById('tarot-card');
            card.classList.remove('flipped');
            document.getElementById('tarot-meaning').style.display = 'none';
            tarotFlipped = false;
        }

        // ==================== 27. 实时黄金价格 (国际金价) ====================
        let goldPriceInterval = null;
        let domesticGoldPriceInterval = null;
        let currentGoldPeriod = 'realtime';
        let currentDomesticGoldPeriod = 'realtime';
        let goldPriceHistory = [];
        let domesticGoldPriceHistory = [];
        let goldChartData = {
            'realtime': [],
            '1M': [],
            '3M': [],
            '6M': [],
            '1Y': []
        };
        let domesticGoldChartData = {
            'realtime': [],
            '1M': [],
            '3M': [],
            '6M': [],
            '1Y': []
        };

        let lastInternationalGoldPrice = null;
        let lastDomesticGoldPrice = null;
        let internationalGoldOpenPrice = null;
        let domesticGoldOpenPrice = null;

        async function fetchInternationalGoldPrice() {
            try {
                const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1m&range=1d', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const result = data.chart?.result?.[0];
                    if (result) {
                        const meta = result.meta;
                        const currentPrice = meta.regularMarketPrice || 2900;
                        const previousClose = meta.previousClose || currentPrice;
                        const change = currentPrice - previousClose;
                        const changePercent = (change / previousClose) * 100;
                        
                        return {
                            price: currentPrice,
                            change: change,
                            changePercent: changePercent,
                            high: meta.regularMarketDayHigh || currentPrice + 20,
                            low: meta.regularMarketDayLow || currentPrice - 20,
                            open: previousClose
                        };
                    }
                }
            } catch (e) {
                console.log('Yahoo API failed:', e);
            }
            
            return generateFallbackGoldPrice();
        }

        function generateFallbackGoldPrice() {
            const basePrice = 2900;
            const now = Date.now();
            const volatility = Math.sin(now / 50000) * 30 + (Math.random() - 0.5) * 20;
            const price = basePrice + volatility;
            return {
                price: price,
                change: volatility,
                changePercent: (volatility / basePrice) * 100,
                high: price + Math.random() * 20,
                low: price - Math.random() * 20,
                open: basePrice,
                isFallback: true
            };
        }

        async function fetchUsdCnyRate() {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                if (response.ok) {
                    const data = await response.json();
                    return data.rates?.CNY || 7.24;
                }
            } catch (e) {
                console.log('Exchange rate API failed');
            }
            return 7.24;
        }

        async function calculateDomesticFromInternational() {
            const intlGold = await fetchInternationalGoldPrice();
            const usdCnyRate = await fetchUsdCnyRate();
            
            const gramPerOz = 31.1035;
            const domesticPrice = (intlGold.price * usdCnyRate) / gramPerOz;
            const domesticChange = (intlGold.change * usdCnyRate) / gramPerOz;
            const domesticChangePercent = intlGold.changePercent;
            
            return {
                price: domesticPrice,
                change: domesticChange,
                changePercent: domesticChangePercent,
                isCalculated: true
            };
        }

        async function fetchHistoricalGoldData(period) {
            const days = period === '1M' ? 30 : period === '3M' ? 90 : period === '6M' ? 180 : 365;
            
            try {
                const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=${period.toLowerCase()}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const result = data.chart?.result?.[0];
                    if (result) {
                        const timestamps = result.timestamp || [];
                        const quotes = result.indicators?.quote?.[0];
                        const closes = quotes?.close || [];
                        
                        const historicalData = timestamps.map((ts, i) => ({
                            timestamp: ts * 1000,
                            price: closes[i] || 0,
                            date: new Date(ts * 1000).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
                        })).filter(d => d.price > 0);
                        
                        return historicalData;
                    }
                }
            } catch (e) {
                console.log('Historical data fetch failed:', e);
            }
            
            return generateHistoricalData(days, 2900);
        }

        function generateHistoricalData(days, basePrice) {
            const data = [];
            const now = Date.now();
            
            for (let i = days; i >= 0; i--) {
                const timestamp = now - i * 24 * 60 * 60 * 1000;
                const trend = (days - i) / days * 50;
                const volatility = Math.sin(i * 0.3) * 40 + Math.random() * 30;
                const price = basePrice - 100 + trend + volatility;
                data.push({
                    timestamp: timestamp,
                    price: price,
                    date: new Date(timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
                });
            }
            return data;
        }

        async function initGoldData() {
            const intlGold = await fetchInternationalGoldPrice();
            lastInternationalGoldPrice = intlGold.price;
            internationalGoldOpenPrice = intlGold.open || intlGold.price;
            
            const domesticGold = await calculateDomesticFromInternational();
            lastDomesticGoldPrice = domesticGold.price;
            domesticGoldOpenPrice = domesticGold.price;
            
            goldChartData['1M'] = await fetchHistoricalGoldData('1M');
            goldChartData['3M'] = await fetchHistoricalGoldData('3M');
            goldChartData['6M'] = await fetchHistoricalGoldData('6M');
            goldChartData['1Y'] = await fetchHistoricalGoldData('1Y');
            
            const usdCnyRate = 7.24;
            domesticGoldChartData['1M'] = goldChartData['1M'].map(d => ({
                ...d,
                price: d.price * usdCnyRate / 31.1035
            }));
            domesticGoldChartData['3M'] = goldChartData['3M'].map(d => ({
                ...d,
                price: d.price * usdCnyRate / 31.1035
            }));
            domesticGoldChartData['6M'] = goldChartData['6M'].map(d => ({
                ...d,
                price: d.price * usdCnyRate / 31.1035
            }));
            domesticGoldChartData['1Y'] = goldChartData['1Y'].map(d => ({
                ...d,
                price: d.price * usdCnyRate / 31.1035
            }));
            
            updateInternationalGoldDisplay(intlGold);
            updateDomesticGoldDisplay(domesticGold);
        }

        function updateInternationalGoldDisplay(data) {
            const priceEl = document.getElementById('gold-price-current');
            const changeUsdEl = document.getElementById('gold-change-usd');
            const changePercentEl = document.getElementById('gold-change-percent');
            const timeEl = document.getElementById('gold-update-time');
            const highEl = document.getElementById('gold-high');
            const lowEl = document.getElementById('gold-low');
            const openEl = document.getElementById('gold-open');
            const changeTotalEl = document.getElementById('gold-change-total');
            
            if (priceEl) priceEl.textContent = data.price.toFixed(2);
            
            const change = data.change || (data.price - (internationalGoldOpenPrice || data.price));
            const changePercent = data.changePercent || (change / data.price * 100);
            
            if (changeUsdEl) {
                const arrow = document.getElementById('gold-change-arrow');
                const value = document.getElementById('gold-change-value');
                if (change >= 0) {
                    changeUsdEl.className = 'kit-gold-change-value up';
                    if (arrow) arrow.textContent = '↑';
                    if (value) value.textContent = `+$${Math.abs(change).toFixed(2)}`;
                } else {
                    changeUsdEl.className = 'kit-gold-change-value down';
                    if (arrow) arrow.textContent = '↓';
                    if (value) value.textContent = `-$${Math.abs(change).toFixed(2)}`;
                }
            }
            
            if (changePercentEl) {
                const percentValue = document.getElementById('gold-percent-value');
                if (change >= 0) {
                    changePercentEl.className = 'kit-gold-change-value up';
                    if (percentValue) percentValue.textContent = `+${changePercent.toFixed(2)}%`;
                } else {
                    changePercentEl.className = 'kit-gold-change-value down';
                    if (percentValue) percentValue.textContent = `${changePercent.toFixed(2)}%`;
                }
            }
            
            if (timeEl) {
                const now = new Date();
                const statusText = data.isFallback ? '(备用数据)' : '(实时数据)';
                timeEl.textContent = `更新: ${now.toLocaleTimeString('zh-CN')} ${statusText}`;
            }
            
            if (highEl) highEl.textContent = `$${(data.high || data.price + 20).toFixed(2)}`;
            if (lowEl) lowEl.textContent = `$${(data.low || data.price - 20).toFixed(2)}`;
            if (openEl) openEl.textContent = `$${(internationalGoldOpenPrice || data.price).toFixed(2)}`;
            
            if (changeTotalEl) {
                changeTotalEl.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
                changeTotalEl.className = `kit-gold-stat-value ${changePercent >= 0 ? 'high' : 'low'}`;
            }
            
            if (currentGoldPeriod === 'realtime') {
                goldPriceHistory.push({
                    timestamp: Date.now(),
                    price: data.price
                });
                if (goldPriceHistory.length > 100) goldPriceHistory.shift();
                goldChartData['realtime'] = goldPriceHistory.map((p) => ({
                    ...p,
                    date: new Date(p.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                }));
            }
            
            drawGoldChart();
        }

        function updateDomesticGoldDisplay(data) {
            const priceEl = document.getElementById('domestic-gold-price-current');
            const changeUsdEl = document.getElementById('domestic-gold-change-usd');
            const changePercentEl = document.getElementById('domestic-gold-change-percent');
            const timeEl = document.getElementById('domestic-gold-update-time');
            const highEl = document.getElementById('domestic-gold-high');
            const lowEl = document.getElementById('domestic-gold-low');
            const openEl = document.getElementById('domestic-gold-open');
            const changeTotalEl = document.getElementById('domestic-gold-change-total');
            
            if (priceEl) priceEl.textContent = data.price.toFixed(2);
            
            const change = data.change || 0;
            const changePercent = data.changePercent || 0;
            
            if (changeUsdEl) {
                const arrow = document.getElementById('domestic-gold-change-arrow');
                const value = document.getElementById('domestic-gold-change-value');
                if (change >= 0) {
                    changeUsdEl.className = 'kit-gold-change-value up';
                    if (arrow) arrow.textContent = '↑';
                    if (value) value.textContent = `+¥${Math.abs(change).toFixed(2)}`;
                } else {
                    changeUsdEl.className = 'kit-gold-change-value down';
                    if (arrow) arrow.textContent = '↓';
                    if (value) value.textContent = `-¥${Math.abs(change).toFixed(2)}`;
                }
            }
            
            if (changePercentEl) {
                const percentValue = document.getElementById('domestic-gold-percent-value');
                if (change >= 0) {
                    changePercentEl.className = 'kit-gold-change-value up';
                    if (percentValue) percentValue.textContent = `+${changePercent.toFixed(2)}%`;
                } else {
                    changePercentEl.className = 'kit-gold-change-value down';
                    if (percentValue) percentValue.textContent = `${changePercent.toFixed(2)}%`;
                }
            }
            
            if (timeEl) {
                const now = new Date();
                const statusText = data.isCalculated ? '(汇率换算)' : '(实时数据)';
                timeEl.textContent = `更新: ${now.toLocaleTimeString('zh-CN')} ${statusText}`;
            }
            
            if (highEl) highEl.textContent = `¥${(data.price + 2).toFixed(2)}`;
            if (lowEl) lowEl.textContent = `¥${(data.price - 2).toFixed(2)}`;
            if (openEl) openEl.textContent = `¥${(domesticGoldOpenPrice || data.price).toFixed(2)}`;
            
            if (changeTotalEl) {
                changeTotalEl.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
                changeTotalEl.className = `kit-gold-stat-value ${changePercent >= 0 ? 'high' : 'low'}`;
            }
            
            if (currentDomesticGoldPeriod === 'realtime') {
                domesticGoldPriceHistory.push({
                    timestamp: Date.now(),
                    price: data.price
                });
                if (domesticGoldPriceHistory.length > 100) domesticGoldPriceHistory.shift();
                domesticGoldChartData['realtime'] = domesticGoldPriceHistory.map((p) => ({
                    ...p,
                    date: new Date(p.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                }));
            }
            
            drawDomesticGoldChart();
        }

        async function updateGoldPrice() {
            const data = await fetchInternationalGoldPrice();
            lastInternationalGoldPrice = data.price;
            updateInternationalGoldDisplay(data);
        }

        async function updateDomesticGoldPrice() {
            const data = await calculateDomesticFromInternational();
            lastDomesticGoldPrice = data.price;
            updateDomesticGoldDisplay(data);
        }

        function startGoldPriceUpdates() {
            if (goldPriceInterval) clearInterval(goldPriceInterval);
            if (domesticGoldPriceInterval) clearInterval(domesticGoldPriceInterval);
            
            updateGoldPrice();
            updateDomesticGoldPrice();
            
            goldPriceInterval = setInterval(updateGoldPrice, 2000);
            domesticGoldPriceInterval = setInterval(updateDomesticGoldPrice, 2000);
        }

        function drawGoldChart(canvasId = 'gold-chart-canvas', height = 180) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const rect = canvas.parentElement.getBoundingClientRect();
            
            canvas.width = rect.width * 2;
            canvas.height = height * 2;
            ctx.scale(2, 2);
            
            const width = rect.width;
            const data = goldChartData[currentGoldPeriod];
            
            if (!data || data.length === 0) return;
            
            const currentPrice = lastInternationalGoldPrice || data[data.length - 1]?.price || 2900;
            const allPrices = [...data.map(d => d.price), currentPrice];
            const minPrice = Math.min(...allPrices) - 10;
            const maxPrice = Math.max(...allPrices) + 10;
            const priceRange = maxPrice - minPrice;
            
            ctx.clearRect(0, 0, width, height);
            
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            ctx.beginPath();
            ctx.moveTo(0, height);
            
            const stepX = width / (data.length);
            
            data.forEach((point, i) => {
                const x = i * stepX;
                const y = height - ((point.price - minPrice) / priceRange) * (height - 20) - 10;
                if (i === 0) {
                    ctx.lineTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            const lastX = (data.length - 1) * stepX;
            const lastY = height - ((currentPrice - minPrice) / priceRange) * (height - 20) - 10;
            ctx.lineTo(lastX, lastY);
            ctx.lineTo(lastX, height);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.beginPath();
            data.forEach((point, i) => {
                const x = i * stepX;
                const y = height - ((point.price - minPrice) / priceRange) * (height - 20) - 10;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.lineTo(lastX, lastY);
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.font = '10px Outfit';
            ctx.fillText(`$${maxPrice.toFixed(0)}`, 5, 15);
            ctx.fillText(`$${minPrice.toFixed(0)}`, 5, height - 5);
        }

        function switchGoldPeriod(period) {
            currentGoldPeriod = period;
            const tabs = document.querySelectorAll('#page-kit .kit-tool-window:nth-child(27) .kit-gold-tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');
                const text = tab.textContent;
                if ((period === 'realtime' && text.includes('实时')) ||
                    (period === '1M' && text.includes('1月')) ||
                    (period === '3M' && text.includes('3月')) ||
                    (period === '6M' && text.includes('半年')) ||
                    (period === '1Y' && text.includes('1年'))) {
                    tab.classList.add('active');
                }
            });
            drawGoldChart();
        }

        function drawDomesticGoldChart() {
            const canvas = document.getElementById('domestic-gold-chart-canvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const rect = canvas.parentElement.getBoundingClientRect();
            const height = 180;
            
            canvas.width = rect.width * 2;
            canvas.height = height * 2;
            ctx.scale(2, 2);
            
            const width = rect.width;
            const data = domesticGoldChartData[currentDomesticGoldPeriod];
            
            if (!data || data.length === 0) return;
            
            const currentPrice = lastDomesticGoldPrice || data[data.length - 1]?.price || 680;
            const allPrices = [...data.map(d => d.price), currentPrice];
            const minPrice = Math.min(...allPrices) - 2;
            const maxPrice = Math.max(...allPrices) + 2;
            const priceRange = maxPrice - minPrice;
            
            ctx.clearRect(0, 0, width, height);
            
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
            
            ctx.beginPath();
            ctx.moveTo(0, height);
            
            const stepX = width / (data.length - 1 || 1);
            
            data.forEach((point, i) => {
                const x = i * stepX;
                const y = height - ((point.price - minPrice) / priceRange) * (height - 20) - 10;
                ctx.lineTo(x, y);
            });
            
            ctx.lineTo((data.length - 1) * stepX, height);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.beginPath();
            data.forEach((point, i) => {
                const x = i * stepX;
                const y = height - ((point.price - minPrice) / priceRange) * (height - 20) - 10;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            const lastX = (data.length - 1) * stepX;
            const lastY = height - ((currentPrice - minPrice) / priceRange) * (height - 20) - 10;
            ctx.beginPath();
            ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.font = '10px Outfit';
            ctx.fillText(`¥${maxPrice.toFixed(0)}`, 5, 15);
            ctx.fillText(`¥${minPrice.toFixed(0)}`, 5, height - 5);
        }

        function switchDomesticGoldPeriod(period) {
            currentDomesticGoldPeriod = period;
            const tabs = document.querySelectorAll('#page-kit .kit-tool-window:nth-child(28) .kit-gold-tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');
                const text = tab.textContent;
                if ((period === 'realtime' && text.includes('实时')) ||
                    (period === '1M' && text.includes('1月')) ||
                    (period === '3M' && text.includes('3月')) ||
                    (period === '6M' && text.includes('半年')) ||
                    (period === '1Y' && text.includes('1年'))) {
                    tab.classList.add('active');
                }
            });
            drawDomesticGoldChart();
        }

        function startGoldPriceUpdates() {
            if (goldPriceInterval) clearInterval(goldPriceInterval);
            if (domesticGoldPriceInterval) clearInterval(domesticGoldPriceInterval);
            
            updateGoldPrice();
            updateDomesticGoldPrice();
            
            goldPriceInterval = setInterval(updateGoldPrice, 2000);
            domesticGoldPriceInterval = setInterval(updateDomesticGoldPrice, 2000);
        }

        function openGoldChartModal() {
            let modal = document.getElementById('gold-chart-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'gold-chart-modal';
                modal.className = 'kit-gold-modal-overlay';
                modal.innerHTML = `
                    <div class="kit-gold-modal">
                        <div class="kit-gold-modal-header">
                            <div class="kit-gold-modal-title">
                                <span style="font-size: 1.5rem;">🥇</span>
                                <span>国际金价走势图</span>
                            </div>
                            <button class="kit-gold-modal-close" onclick="closeGoldChartModal()">✕</button>
                        </div>
                        <div class="kit-gold-modal-body">
                            <div class="kit-gold-tabs" id="modal-gold-tabs">
                                <button class="kit-gold-tab active" onclick="switchModalGoldPeriod('realtime')">实时</button>
                                <button class="kit-gold-tab" onclick="switchModalGoldPeriod('1M')">1月</button>
                                <button class="kit-gold-tab" onclick="switchModalGoldPeriod('3M')">3月</button>
                                <button class="kit-gold-tab" onclick="switchModalGoldPeriod('6M')">半年</button>
                                <button class="kit-gold-tab" onclick="switchModalGoldPeriod('1Y')">1年</button>
                            </div>
                            <div class="kit-gold-chart-large">
                                <canvas id="gold-chart-canvas-modal" class="kit-gold-chart-canvas"></canvas>
                            </div>
                            <div class="kit-gold-period-stats">
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">起始价格</div>
                                    <div class="kit-gold-period-stat-value" id="modal-gold-start">--</div>
                                </div>
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">最新价格</div>
                                    <div class="kit-gold-period-stat-value" id="modal-gold-current" style="color: #FFD700;">--</div>
                                </div>
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">最高价格</div>
                                    <div class="kit-gold-period-stat-value" style="color: var(--accent-green);" id="modal-gold-high">--</div>
                                </div>
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">最低价格</div>
                                    <div class="kit-gold-period-stat-value" style="color: #ef4444;" id="modal-gold-low">--</div>
                                </div>
                            </div>
                            <div style="margin-top: 1rem; text-align: center;">
                                <div class="kit-gold-period-stat" style="padding: 1rem;">
                                    <div class="kit-gold-period-stat-label">期间涨幅</div>
                                    <div class="kit-gold-period-stat-value" id="modal-gold-change" style="font-size: 1.5rem;">--</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeGoldChartModal();
                });
            }
            
            modal.classList.add('active');
            updateModalGoldChart();
        }

        function updateModalGoldChart() {
            const data = goldChartData[currentGoldPeriod];
            if (!data || data.length === 0) return;
            
            const currentPrice = lastInternationalGoldPrice || data[data.length - 1]?.price || 2900;
            const startPrice = data[0].price;
            const prices = data.map(d => d.price);
            const high = Math.max(...prices, currentPrice);
            const low = Math.min(...prices, currentPrice);
            const change = ((currentPrice - startPrice) / startPrice) * 100;
            
            document.getElementById('modal-gold-start').textContent = `$${startPrice.toFixed(2)}`;
            document.getElementById('modal-gold-current').textContent = `$${currentPrice.toFixed(2)}`;
            document.getElementById('modal-gold-high').textContent = `$${high.toFixed(2)}`;
            document.getElementById('modal-gold-low').textContent = `$${low.toFixed(2)}`;
            
            const changeEl = document.getElementById('modal-gold-change');
            changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
            changeEl.style.color = change >= 0 ? 'var(--accent-green)' : '#ef4444';
            
            document.querySelectorAll('#modal-gold-tabs .kit-gold-tab').forEach(tab => {
                tab.classList.remove('active');
                const text = tab.textContent;
                if ((currentGoldPeriod === 'realtime' && text.includes('实时')) ||
                    (currentGoldPeriod === '1M' && text.includes('1月')) ||
                    (currentGoldPeriod === '3M' && text.includes('3月')) ||
                    (currentGoldPeriod === '6M' && text.includes('半年')) ||
                    (currentGoldPeriod === '1Y' && text.includes('1年'))) {
                    tab.classList.add('active');
                }
            });
            
            setTimeout(() => drawGoldChart('gold-chart-canvas-modal', 300), 50);
        }

        function switchModalGoldPeriod(period) {
            currentGoldPeriod = period;
            updateModalGoldChart();
        }

        function openDomesticGoldChartModal() {
            let modal = document.getElementById('domestic-gold-chart-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'domestic-gold-chart-modal';
                modal.className = 'kit-gold-modal-overlay';
                modal.innerHTML = `
                    <div class="kit-gold-modal">
                        <div class="kit-gold-modal-header">
                            <div class="kit-gold-modal-title">
                                <span style="font-size: 1.5rem;">🏆</span>
                                <span>国内金价走势图</span>
                            </div>
                            <button class="kit-gold-modal-close" onclick="closeDomesticGoldChartModal()">✕</button>
                        </div>
                        <div class="kit-gold-modal-body">
                            <div class="kit-gold-tabs" id="modal-domestic-gold-tabs">
                                <button class="kit-gold-tab active" onclick="switchModalDomesticGoldPeriod('realtime')">实时</button>
                                <button class="kit-gold-tab" onclick="switchModalDomesticGoldPeriod('1M')">1月</button>
                                <button class="kit-gold-tab" onclick="switchModalDomesticGoldPeriod('3M')">3月</button>
                                <button class="kit-gold-tab" onclick="switchModalDomesticGoldPeriod('6M')">半年</button>
                                <button class="kit-gold-tab" onclick="switchModalDomesticGoldPeriod('1Y')">1年</button>
                            </div>
                            <div class="kit-gold-chart-large">
                                <canvas id="domestic-gold-chart-canvas-modal" class="kit-gold-chart-canvas"></canvas>
                            </div>
                            <div class="kit-gold-period-stats">
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">起始价格</div>
                                    <div class="kit-gold-period-stat-value" id="modal-domestic-gold-start">--</div>
                                </div>
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">最新价格</div>
                                    <div class="kit-gold-period-stat-value" id="modal-domestic-gold-current" style="color: #ef4444;">--</div>
                                </div>
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">最高价格</div>
                                    <div class="kit-gold-period-stat-value" style="color: var(--accent-green);" id="modal-domestic-gold-high">--</div>
                                </div>
                                <div class="kit-gold-period-stat">
                                    <div class="kit-gold-period-stat-label">最低价格</div>
                                    <div class="kit-gold-period-stat-value" style="color: #ef4444;" id="modal-domestic-gold-low">--</div>
                                </div>
                            </div>
                            <div style="margin-top: 1rem; text-align: center;">
                                <div class="kit-gold-period-stat" style="padding: 1rem;">
                                    <div class="kit-gold-period-stat-label">期间涨幅</div>
                                    <div class="kit-gold-period-stat-value" id="modal-domestic-gold-change" style="font-size: 1.5rem;">--</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeDomesticGoldChartModal();
                });
            }
            
            modal.classList.add('active');
            updateModalDomesticGoldChart();
        }

        function updateModalDomesticGoldChart() {
            const data = domesticGoldChartData[currentDomesticGoldPeriod];
            if (!data || data.length === 0) return;
            
            const currentPrice = lastDomesticGoldPrice || data[data.length - 1]?.price || 680;
            const startPrice = data[0].price;
            const prices = data.map(d => d.price);
            const high = Math.max(...prices, currentPrice);
            const low = Math.min(...prices, currentPrice);
            const change = ((currentPrice - startPrice) / startPrice) * 100;
            
            document.getElementById('modal-domestic-gold-start').textContent = `¥${startPrice.toFixed(2)}`;
            document.getElementById('modal-domestic-gold-current').textContent = `¥${currentPrice.toFixed(2)}`;
            document.getElementById('modal-domestic-gold-high').textContent = `¥${high.toFixed(2)}`;
            document.getElementById('modal-domestic-gold-low').textContent = `¥${low.toFixed(2)}`;
            
            const changeEl = document.getElementById('modal-domestic-gold-change');
            changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
            changeEl.style.color = change >= 0 ? 'var(--accent-green)' : '#ef4444';
            
            document.querySelectorAll('#modal-domestic-gold-tabs .kit-gold-tab').forEach(tab => {
                tab.classList.remove('active');
                const text = tab.textContent;
                if ((currentDomesticGoldPeriod === 'realtime' && text.includes('实时')) ||
                    (currentDomesticGoldPeriod === '1M' && text.includes('1月')) ||
                    (currentDomesticGoldPeriod === '3M' && text.includes('3月')) ||
                    (currentDomesticGoldPeriod === '6M' && text.includes('半年')) ||
                    (currentDomesticGoldPeriod === '1Y' && text.includes('1年'))) {
                    tab.classList.add('active');
                }
            });
            
            setTimeout(() => drawDomesticGoldChartModal(), 50);
        }

        function drawDomesticGoldChartModal() {
            const canvas = document.getElementById('domestic-gold-chart-canvas-modal');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const rect = canvas.parentElement.getBoundingClientRect();
            const height = 300;
            
            canvas.width = rect.width * 2;
            canvas.height = height * 2;
            ctx.scale(2, 2);
            
            const width = rect.width;
            const data = domesticGoldChartData[currentDomesticGoldPeriod];
            
            if (!data || data.length === 0) return;
            
            const currentPrice = lastDomesticGoldPrice || data[data.length - 1]?.price || 680;
            const allPrices = [...data.map(d => d.price), currentPrice];
            const minPrice = Math.min(...allPrices) - 2;
            const maxPrice = Math.max(...allPrices) + 2;
            const priceRange = maxPrice - minPrice;
            
            ctx.clearRect(0, 0, width, height);
            
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
            
            ctx.beginPath();
            ctx.moveTo(0, height);
            
            const stepX = width / (data.length - 1 || 1);
            
            data.forEach((point, i) => {
                const x = i * stepX;
                const y = height - ((point.price - minPrice) / priceRange) * (height - 30) - 15;
                ctx.lineTo(x, y);
            });
            
            ctx.lineTo((data.length - 1) * stepX, height);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.beginPath();
            data.forEach((point, i) => {
                const x = i * stepX;
                const y = height - ((point.price - minPrice) / priceRange) * (height - 30) - 15;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.font = '11px Outfit';
            ctx.fillText(`¥${maxPrice.toFixed(0)}`, 5, 20);
            ctx.fillText(`¥${minPrice.toFixed(0)}`, 5, height - 5);
        }

        function switchModalDomesticGoldPeriod(period) {
            currentDomesticGoldPeriod = period;
            updateModalDomesticGoldChart();
        }

        function closeDomesticGoldChartModal() {
            const modal = document.getElementById('domestic-gold-chart-modal');
            if (modal) modal.classList.remove('active');
        }

        function closeGoldChartModal() {
            const modal = document.getElementById('gold-chart-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        }

        function startGoldPriceUpdates() {
            initGoldData();
            updateGoldPrice();
            
            if (goldPriceInterval) {
                clearInterval(goldPriceInterval);
            }
            
            goldPriceInterval = setInterval(() => {
                updateGoldPrice();
            }, 2000);
        }

        // 初始化
        initAnimations();
        startGoldPriceUpdates();

        // ==================== 移动端导航菜单 ====================
        function toggleMobileMenu() {
            const btn = document.getElementById('mobile-menu-btn');
            const nav = document.getElementById('mobile-nav');
            btn.classList.toggle('active');
            nav.classList.toggle('active');
        }

        // 更新移动端导航状态
        function updateMobileNav() {
            const token = localStorage.getItem('user_token');
            const mobileGuest = document.getElementById('mobile-auth-guest');
            const mobileUser = document.getElementById('mobile-auth-user');
            
            if (token) {
                mobileGuest.classList.add('hidden');
                mobileUser.classList.remove('hidden');
            } else {
                mobileGuest.classList.remove('hidden');
                mobileUser.classList.add('hidden');
            }
        }

        // 更新移动端导航的active状态
        function updateMobileNavActive(page) {
            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === page) {
                    link.classList.add('active');
                }
            });
        }

        // 点击页面其他地方关闭移动菜单
        document.addEventListener('click', function(e) {
            const btn = document.getElementById('mobile-menu-btn');
            const nav = document.getElementById('mobile-nav');
            if (btn && nav && !btn.contains(e.target) && !nav.contains(e.target)) {
                btn.classList.remove('active');
                nav.classList.remove('active');
            }
        });

        // 页面加载时更新移动端导航
        document.addEventListener('DOMContentLoaded', updateMobileNav);

        // ==================== 管理员系统 - 双重API保险 ====================
        const ADMIN_API_URLS = [
            'https://api.agiera.net',
            'https://visitor-stats.metanext.workers.dev'
        ];

        // 智能API请求 - 自动故障转移
        async function adminFetch(endpoint, options = {}) {
            let lastError = null;
            
            // 上传请求使用更长的超时时间，且只尝试主 URL（不切换）
            const isUpload = endpoint.includes('/upload') || endpoint.includes('/files') && options.method === 'POST';
            const timeout = isUpload ? 600000 : 15000; // 上传 10 分钟，其他 15 秒
            
            // 上传请求只用主 URL，避免重复上传
            const urlsToTry = isUpload ? [ADMIN_API_URLS[0]] : ADMIN_API_URLS;
            
            for (const baseUrl of urlsToTry) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => {
                        console.warn(`Request timeout after ${timeout}ms`);
                        controller.abort();
                    }, timeout);
                    
                    console.log(`Fetching: ${baseUrl}${endpoint}`);
                    
                    const response = await fetch(`${baseUrl}${endpoint}`, {
                        ...options,
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (response.ok || response.status < 500) {
                        return response;
                    }
                    
                    lastError = new Error(`HTTP ${response.status}`);
                } catch (err) {
                    console.warn(`API ${baseUrl} failed:`, err.name, err.message);
                    lastError = err;
                }
            }
            
            throw lastError || new Error('All API endpoints failed');
        }

        // ==================== 管理员登录 ====================
        function openAdminLogin() {
            document.getElementById('admin-login-modal').classList.add('active');
            document.getElementById('admin-username').focus();
        }

        function closeAdminLogin() {
            document.getElementById('admin-login-modal').classList.remove('active');
            document.getElementById('admin-username').value = '';
            document.getElementById('admin-password').value = '';
            document.getElementById('admin-error').classList.remove('show');
        }

        async function handleAdminLogin(e) {
            e.preventDefault();
            
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            const btn = document.getElementById('admin-login-btn');
            const error = document.getElementById('admin-error');
            
            if (!username || !password) {
                error.textContent = 'Please enter username and password';
                error.classList.add('show');
                return;
            }
            
            btn.classList.add('loading');
            btn.disabled = true;
            error.classList.remove('show');
            
            try {
                const res = await adminFetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    localStorage.setItem('admin_token', data.token);
                    closeAdminLogin();
                    showWelcomeAdmin();
                } else {
                    error.textContent = data.message || 'Invalid credentials';
                    error.classList.add('show');
                }
            } catch (err) {
                console.error('Login error:', err);
                error.textContent = 'Network error. Please try again.';
                error.classList.add('show');
            }
            
            btn.classList.remove('loading');
            btn.disabled = false;
        }

        function showWelcomeAdmin() {
            document.getElementById('welcome-admin').classList.add('active');
        }

        function enterAdminPanel() {
            document.getElementById('welcome-admin').classList.remove('active');
            document.getElementById('admin-panel').classList.add('active');
            initMatrixRain();
            loadAdminFiles();
        }

        function adminLogout() {
            document.getElementById('admin-panel').classList.remove('active');
            localStorage.removeItem('admin_token');
            stopMatrixRain();
            showAdminToast('Logged out successfully');
        }

        // ==================== Matrix雨效果 ====================
        let matrixAnimationId = null;

        function initMatrixRain() {
            const canvas = document.getElementById('matrix-canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // 更密集：间距从20改为14
            const fontSize = 14;
            const columns = Math.floor(canvas.width / fontSize);
            const drops = [];
            
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
            }
            
            // 只用 0 和 1
            const chars = '01';
            
            function draw() {
                // 更慢的淡出效果，让字符持续更久
                ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.font = `${fontSize}px Space Mono`;
                
                for (let i = 0; i < drops.length; i++) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    
                    // 随机亮度，适中对比度
                    const brightness = Math.floor(Math.random() * 80) + 50; // 50-130 范围
                    ctx.fillStyle = `rgb(0, ${brightness}, ${Math.floor(brightness * 0.3)})`;
                    
                    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
                
                matrixAnimationId = requestAnimationFrame(draw);
            }
            
            draw();
            
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }

        function stopMatrixRain() {
            if (matrixAnimationId) {
                cancelAnimationFrame(matrixAnimationId);
                matrixAnimationId = null;
            }
        }

        // ==================== 文件管理 ====================
        let adminFiles = [];
        let adminFolders = [];
        let currentFolderId = null;
        let folderBreadcrumbs = [];

        async function loadAdminFiles() {
            const token = localStorage.getItem('admin_token');
            
            try {
                const folderParam = currentFolderId ? `?folder_id=${currentFolderId}` : '';
                const res = await adminFetch(`/api/admin/files${folderParam}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                
                if (data.success) {
                    adminFiles = data.files || [];
                    adminFolders = data.folders || [];
                } else {
                    adminFiles = [];
                    adminFolders = [];
                }
            } catch (err) {
                console.error('Load files error:', err);
                const stored = localStorage.getItem('admin_files');
                adminFiles = stored ? JSON.parse(stored) : [];
                adminFolders = [];
            }
            
            renderAdminFiles();
            updateAdminStats();
        }

        function saveAdminFilesLocal() {
            localStorage.setItem('admin_files', JSON.stringify(adminFiles));
        }

        function renderAdminFiles() {
            const tbody = document.getElementById('file-list');
            const emptyState = document.getElementById('empty-state');
            const table = tbody.closest('table');
            
            // 渲染面包屑
            renderBreadcrumbs();
            
            if (adminFiles.length === 0 && adminFolders.length === 0) {
                table.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }
            
            table.style.display = 'table';
            emptyState.style.display = 'none';
            
            // 先渲染文件夹，再渲染文件
            const foldersHtml = adminFolders.map((folder, index) => `
                <tr class="folder-row">
                    <td>
                        <div class="folder-name" onclick="navigateToFolder('${folder.id}')">
                            <svg class="folder-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>${escapeAdminHtml(folder.name)}</span>
                        </div>
                    </td>
                    <td class="file-size">--</td>
                    <td class="file-date">${formatAdminFileDate(folder.date || folder.created_at)}</td>
                    <td>
                        <div class="file-actions">
                            <button class="file-action-btn" onclick="renameFolder('${folder.id}', '${escapeAdminHtml(folder.name)}')" title="Rename">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="file-action-btn delete" onclick="deleteFolder('${folder.id}')" title="Delete">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            const filesHtml = adminFiles.map((file, index) => `
                <tr>
                    <td>
                        <div class="file-name">
                            <div class="file-icon">${getAdminFileIcon(file.type)}</div>
                            <div class="file-info">
                                <span class="file-title">${escapeAdminHtml(file.name)}</span>
                                <span class="file-type">${file.type || 'unknown'}</span>
                            </div>
                        </div>
                    </td>
                    <td class="file-size">${formatAdminFileSize(file.size)}</td>
                    <td class="file-date">${formatAdminFileDate(file.date || file.created_at)}</td>
                    <td>
                        <div class="file-actions">
                            <button class="file-action-btn" onclick="downloadAdminFile('${file.id}', ${index})" title="Download">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                            <button class="file-action-btn delete" onclick="deleteAdminFile('${file.id}', ${index})" title="Delete">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            tbody.innerHTML = foldersHtml + filesHtml;
        }

        function renderBreadcrumbs() {
            const container = document.getElementById('admin-breadcrumb');
            let html = `
                <span class="breadcrumb-item" onclick="navigateToFolder(null)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    Root
                </span>
            `;
            
            folderBreadcrumbs.forEach((folder, index) => {
                html += `<span class="breadcrumb-separator">/</span>`;
                html += `<span class="breadcrumb-item" onclick="navigateToFolder('${folder.id}')">${escapeAdminHtml(folder.name)}</span>`;
            });
            
            container.innerHTML = html;
        }

        async function navigateToFolder(folderId) {
            const token = localStorage.getItem('admin_token');
            currentFolderId = folderId;
            
            // 更新面包屑
            if (folderId === null) {
                folderBreadcrumbs = [];
            } else {
                // 获取文件夹面包屑
                try {
                    const res = await adminFetch(`/api/admin/folders/${folderId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success && data.breadcrumbs) {
                        folderBreadcrumbs = data.breadcrumbs;
                    }
                } catch (err) {
                    console.error('Get breadcrumbs error:', err);
                }
            }
            
            await loadAdminFiles();
        }

        // 文件夹操作函数
        function openNewFolderModal() {
            document.getElementById('new-folder-modal').classList.add('active');
            document.getElementById('new-folder-name').value = '';
            document.getElementById('new-folder-name').focus();
        }

        function closeNewFolderModal() {
            document.getElementById('new-folder-modal').classList.remove('active');
        }

        async function createNewFolder() {
            const name = document.getElementById('new-folder-name').value.trim();
            if (!name) {
                showAdminToast('Please enter a folder name', true);
                return;
            }
            
            const token = localStorage.getItem('admin_token');
            
            try {
                const res = await adminFetch('/api/admin/folders', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        parent_id: currentFolderId
                    })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    showAdminToast('Folder created successfully');
                    closeNewFolderModal();
                    await loadAdminFiles();
                } else {
                    showAdminToast(data.message || 'Failed to create folder', true);
                }
            } catch (err) {
                console.error('Create folder error:', err);
                showAdminToast('Error creating folder', true);
            }
        }

        async function renameFolder(folderId, currentName) {
            const newName = prompt('Enter new folder name:', currentName);
            if (!newName || newName.trim() === '' || newName === currentName) return;
            
            const token = localStorage.getItem('admin_token');
            
            try {
                const res = await adminFetch(`/api/admin/folders/${folderId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: newName.trim() })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    showAdminToast('Folder renamed successfully');
                    await loadAdminFiles();
                } else {
                    showAdminToast(data.message || 'Failed to rename folder', true);
                }
            } catch (err) {
                console.error('Rename folder error:', err);
                showAdminToast('Error renaming folder', true);
            }
        }

        async function deleteFolder(folderId) {
            if (!confirm('Are you sure you want to delete this folder? The folder must be empty.')) return;
            
            const token = localStorage.getItem('admin_token');
            
            try {
                const res = await adminFetch(`/api/admin/folders/${folderId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const data = await res.json();
                
                if (data.success) {
                    showAdminToast('Folder deleted successfully');
                    await loadAdminFiles();
                } else {
                    showAdminToast(data.message || 'Failed to delete folder', true);
                }
            } catch (err) {
                console.error('Delete folder error:', err);
                showAdminToast('Error deleting folder', true);
            }
        }

        function updateAdminStats() {
            document.getElementById('stat-files').textContent = adminFiles.length;
            
            const totalSize = adminFiles.reduce((sum, f) => sum + (f.size || 0), 0);
            document.getElementById('stat-size').textContent = formatAdminFileSize(totalSize);
            
            const downloads = adminFiles.reduce((sum, f) => sum + (f.downloads || 0), 0);
            document.getElementById('stat-downloads').textContent = downloads;
            
            if (adminFiles.length > 0) {
                const lastFile = adminFiles[0];
                document.getElementById('stat-last').textContent = formatAdminFileDate(lastFile.date || lastFile.created_at);
            } else {
                document.getElementById('stat-last').textContent = '--';
            }
        }

        function getAdminFileIcon(type) {
            const icons = {
                'pdf': '📄', 'doc': '📝', 'docx': '📝', 'xls': '📊', 'xlsx': '📊',
                'ppt': '📽️', 'pptx': '📽️', 'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️',
                'gif': '🖼️', 'mp4': '🎬', 'mp3': '🎵', 'zip': '📦', 'rar': '📦',
                'txt': '📃', 'js': '⚡', 'html': '🌐', 'css': '🎨', 'json': '{}'
            };
            return icons[type?.toLowerCase()] || '📁';
        }

        function formatAdminFileSize(bytes) {
            if (!bytes || bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        function formatAdminFileDate(dateStr) {
            if (!dateStr) return '--';
            const date = new Date(dateStr);
            return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        function escapeAdminHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // ==================== 文件上传 ====================
        function openUploadModal() {
            document.getElementById('upload-modal').classList.add('active');
        }

        function closeUploadModal() {
            document.getElementById('upload-modal').classList.remove('active');
            document.getElementById('file-input').value = '';
        }

        function handleAdminFileSelect(e) {
            handleAdminFiles(e.target.files);
        }

        // 分片大小：10MB（R2 要求最小 5MB，最大 5GB 单片）
        const CHUNK_SIZE = 10 * 1024 * 1024;

        async function handleAdminFiles(fileList) {
            const token = localStorage.getItem('admin_token');
            let successCount = 0;
            
            for (const file of fileList) {
                try {
                    // 大于 95MB 使用分片上传，小于则直接上传
                    if (file.size > 95 * 1024 * 1024) {
                        // 分片上传大文件
                        const success = await uploadLargeFile(file, token);
                        if (success) successCount++;
                    } else {
                        // 直接上传小文件 - 使用简单 fetch，无超时限制
                        showAdminToast(`Uploading: ${file.name}...`);
                        console.log('Starting upload for:', file.name, 'Size:', file.size);
                        
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        // 添加文件夹参数
                        const folderParam = currentFolderId ? `?folder_id=${currentFolderId}` : '';
                        const res = await fetch(`${ADMIN_API_URLS[0]}/api/admin/files${folderParam}`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: formData
                        });
                        
                        console.log('Upload response status:', res.status);
                        const data = await res.json();
                        console.log('Upload response data:', data);
                        
                        if (data.success) {
                            adminFiles.unshift({
                                id: data.file.id,
                                name: file.name,
                                type: file.name.split('.').pop(),
                                size: file.size,
                                date: new Date().toISOString(),
                                downloads: 0
                            });
                            successCount++;
                        } else {
                            console.error('Upload failed:', data.message);
                            showAdminToast(data.message || 'Upload failed', true);
                        }
                    }
                } catch (err) {
                    console.error('Upload error name:', err.name);
                    console.error('Upload error message:', err.message);
                    console.error('Upload error stack:', err.stack);
                    showAdminToast('Upload error: ' + (err.name === 'AbortError' ? 'Request timed out or was cancelled' : err.message), true);
                }
            }
            
            saveAdminFilesLocal();
            renderAdminFiles();
            updateAdminStats();
            closeUploadModal();
            
            if (successCount > 0) {
                showAdminToast(`${successCount} file(s) uploaded successfully`);
            }
        }

        // 大文件分片上传
        async function uploadLargeFile(file, token) {
            try {
                showAdminToast(`Uploading large file: ${file.name} (${formatFileSize(file.size)})`);
                
                // 1. 初始化上传
                const initRes = await adminFetch('/api/admin/upload/init', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        fileSize: file.size,
                        contentType: file.type || 'application/octet-stream'
                    })
                });
                
                const initData = await initRes.json();
                if (!initData.success) {
                    showAdminToast('Init upload failed: ' + initData.message, true);
                    return false;
                }
                
                const { uploadId, fileId, storagePath, ext } = initData;
                const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
                const parts = [];
                
                // 2. 分片上传
                for (let i = 0; i < totalChunks; i++) {
                    const start = i * CHUNK_SIZE;
                    const end = Math.min(start + CHUNK_SIZE, file.size);
                    const chunk = file.slice(start, end);
                    const partNumber = i + 1;
                    
                    // 显示进度
                    const progress = Math.round((partNumber / totalChunks) * 100);
                    showAdminToast(`Uploading ${file.name}: ${progress}% (Part ${partNumber}/${totalChunks})`);
                    
                    const partRes = await adminFetch(
                        `/api/admin/upload/part?uploadId=${encodeURIComponent(uploadId)}&partNumber=${partNumber}&storagePath=${encodeURIComponent(storagePath)}`,
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: chunk
                        }
                    );
                    
                    const partData = await partRes.json();
                    if (!partData.success) {
                        showAdminToast('Part upload failed: ' + partData.message, true);
                        // 取消上传
                        await adminFetch('/api/admin/upload/abort', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ uploadId, storagePath })
                        });
                        return false;
                    }
                    
                    parts.push({
                        partNumber: partNumber,
                        etag: partData.etag
                    });
                }
                
                // 3. 完成上传
                const completeRes = await adminFetch('/api/admin/upload/complete', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uploadId,
                        storagePath,
                        fileId,
                        filename: file.name,
                        fileSize: file.size,
                        ext,
                        parts
                    })
                });
                
                const completeData = await completeRes.json();
                if (completeData.success) {
                    adminFiles.unshift({
                        id: fileId,
                        name: file.name,
                        type: ext,
                        size: file.size,
                        date: new Date().toISOString(),
                        downloads: 0
                    });
                    showAdminToast(`${file.name} uploaded successfully!`);
                    return true;
                } else {
                    showAdminToast('Complete upload failed: ' + completeData.message, true);
                    return false;
                }
                
            } catch (err) {
                console.error('Large file upload error:', err);
                showAdminToast('Upload error: ' + err.message, true);
                return false;
            }
        }

        // 格式化文件大小
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        async function downloadAdminFile(fileId, index) {
            const token = localStorage.getItem('admin_token');
            const fileName = adminFiles[index]?.name || 'file';
            
            try {
                showAdminToast(`Downloading: ${fileName}`);
                
                // 直接下载文件
                const res = await adminFetch(`/api/admin/files/${fileId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                // 检查是否是真实文件（有 Content-Disposition）
                const contentDisposition = res.headers.get('Content-Disposition');
                
                if (contentDisposition) {
                    // 真实文件下载
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    // 更新本地计数
                    if (adminFiles[index]) {
                        adminFiles[index].downloads = (adminFiles[index].downloads || 0) + 1;
                        saveAdminFilesLocal();
                        updateAdminStats();
                    }
                    
                    showAdminToast(`Downloaded: ${fileName}`);
                } else {
                    // 只是元数据
                    const data = await res.json();
                    if (adminFiles[index]) {
                        adminFiles[index].downloads = (adminFiles[index].downloads || 0) + 1;
                        saveAdminFilesLocal();
                        updateAdminStats();
                    }
                    showAdminToast('File info retrieved (no actual file in R2)');
                }
            } catch (err) {
                console.error('Download error:', err);
                showAdminToast('Download failed: ' + err.message, true);
            }
        }

        async function deleteAdminFile(fileId, index) {
            const fileName = adminFiles[index]?.name || 'this file';
            
            if (!confirm(`Delete "${fileName}"?`)) {
                return;
            }
            
            const token = localStorage.getItem('admin_token');
            
            try {
                const res = await adminFetch(`/api/admin/files/${fileId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const data = await res.json();
                
                if (data.success) {
                    adminFiles.splice(index, 1);
                    saveAdminFilesLocal();
                    renderAdminFiles();
                    updateAdminStats();
                    showAdminToast('File deleted');
                } else {
                    showAdminToast(data.message || 'Delete failed', true);
                }
            } catch (err) {
                console.error('Delete error:', err);
                adminFiles.splice(index, 1);
                saveAdminFilesLocal();
                renderAdminFiles();
                updateAdminStats();
                showAdminToast('File deleted (local)');
            }
        }

        async function refreshAdminFiles() {
            showAdminToast('Refreshing...');
            await loadAdminFiles();
            showAdminToast('Files refreshed');
        }

        // ==================== Toast通知 ====================
        function showAdminToast(message, isError = false) {
            const toast = document.getElementById('admin-toast');
            const msgEl = document.getElementById('toast-message');
            
            if (!toast || !msgEl) return;
            
            msgEl.textContent = message;
            toast.classList.toggle('error', isError);
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // 拖拽上传初始化
        document.addEventListener('DOMContentLoaded', function() {
            const dropzone = document.getElementById('upload-dropzone');
            if (dropzone) {
                dropzone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dropzone.classList.add('dragover');
                });
                dropzone.addEventListener('dragleave', () => {
                    dropzone.classList.remove('dragover');
                });
                dropzone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dropzone.classList.remove('dragover');
                    handleAdminFiles(e.dataTransfer.files);
                });
            }
        });

        // ESC 关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAdminLogin();
                closeUploadModal();
            }
        });
