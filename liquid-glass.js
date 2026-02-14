        // ==================== LIQUID GLASS EDGE LIGHT SYSTEM ====================
        // 只保留边缘光效，移除所有内部光源
        // Clean edge-only light propagation
        
        class LiquidGlassLightSystem {
            constructor() {
                this.elements = new Map();
                this.rafId = null;
                this.init();
            }
            
            init() {
                this.injectStyles();
                this.initializeElements();
                this.startAnimationLoop();
                console.log('🌊 Liquid Glass Edge Light v5.0 - Clean Edition');
            }
            
            injectStyles() {
                const style = document.createElement('style');
                style.id = 'liquid-glass-edge-light-styles';
                style.textContent = `
                    /* Edge Light Container */
                    .lg-edge-light-container {
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                        z-index: 10;
                        overflow: hidden;
                        border-radius: inherit;
                    }
                    
                    /* SVG for edge light paths */
                    .lg-edge-light-svg {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                    }
                    
                    /* Edge glow paths */
                    .lg-edge-path {
                        fill: none;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .lg-edge-path.active {
                        opacity: 1;
                    }
                    
                    /* Top edge light */
                    .lg-edge-top {
                        stroke: url(#lg-gradient-horizontal);
                        filter: url(#lg-glow-filter);
                    }
                    
                    /* Right edge light */
                    .lg-edge-right {
                        stroke: url(#lg-gradient-vertical);
                        filter: url(#lg-glow-filter);
                    }
                    
                    /* Bottom edge light */
                    .lg-edge-bottom {
                        stroke: url(#lg-gradient-horizontal);
                        filter: url(#lg-glow-filter);
                    }
                    
                    /* Left edge light */
                    .lg-edge-left {
                        stroke: url(#lg-gradient-vertical);
                        filter: url(#lg-glow-filter);
                    }
                    
                    /* Smooth transitions for glass elements */
                    .feature-card,
                    .nav-glass-container,
                    .kit-tool-window,
                    .value-card,
                    .paper-card,
                    .stat-item,
                    .team-card,
                    .modal,
                    .hero-badge,
                    .nav-links a,
                    .nav-cta,
                    .nav-login,
                    .user-menu {
                        transition: 
                            transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                            box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                            border-color 0.3s ease !important;
                    }
                `;
                document.head.appendChild(style);
                
                // Create global SVG definitions for gradients and filters
                this.createSVGDefs();
            }
            
            createSVGDefs() {
                const svgNS = 'http://www.w3.org/2000/svg';
                const svg = document.createElementNS(svgNS, 'svg');
                svg.setAttribute('style', 'position: absolute; width: 0; height: 0;');
                svg.innerHTML = `
                    <defs>
                        <!-- Horizontal gradient for top/bottom edges -->
                        <linearGradient id="lg-gradient-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="transparent"/>
                            <stop offset="20%" stop-color="rgba(255, 255, 255, 0.9)"/>
                            <stop offset="35%" stop-color="rgba(0, 212, 255, 0.8)"/>
                            <stop offset="50%" stop-color="rgba(255, 255, 255, 1)"/>
                            <stop offset="65%" stop-color="rgba(139, 92, 246, 0.8)"/>
                            <stop offset="80%" stop-color="rgba(255, 255, 255, 0.9)"/>
                            <stop offset="100%" stop-color="transparent"/>
                        </linearGradient>
                        
                        <!-- Vertical gradient for left/right edges -->
                        <linearGradient id="lg-gradient-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="transparent"/>
                            <stop offset="20%" stop-color="rgba(255, 255, 255, 0.9)"/>
                            <stop offset="35%" stop-color="rgba(0, 212, 255, 0.8)"/>
                            <stop offset="50%" stop-color="rgba(255, 255, 255, 1)"/>
                            <stop offset="65%" stop-color="rgba(139, 92, 246, 0.8)"/>
                            <stop offset="80%" stop-color="rgba(255, 255, 255, 0.9)"/>
                            <stop offset="100%" stop-color="transparent"/>
                        </linearGradient>
                        
                        <!-- Glow filter for edge lights -->
                        <filter id="lg-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur"/>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                        </filter>
                    </defs>
                `;
                document.body.insertBefore(svg, document.body.firstChild);
            }
            
            initializeElements() {
                // All glass elements to enhance - 移除导航栏元素以避免点击光晕
                const selectors = [
                    '.nav-glass-container',
                    // '.nav-links a',  // 移除 - 避免点击光晕
                    // '.nav-cta',      // 移除 - 避免点击光晕
                    // '.nav-login',    // 移除 - 避免点击光晕
                    // '.user-menu',    // 移除 - 避免点击光晕
                    '.feature-card',
                    '.kit-tool-window',
                    '.value-card',
                    '.paper-card',
                    '.stat-item',
                    '.team-card',
                    '.modal',
                    '.hero-badge',
                    '.user-dropdown',
                    '.chatbot-window',
                    '.profile-section'
                ];
                
                document.querySelectorAll(selectors.join(', ')).forEach(element => {
                    this.setupElement(element);
                });
            }
            
            setupElement(element) {
                const borderRadius = parseInt(getComputedStyle(element).borderRadius) || 20;
                
                // Create edge light container
                const container = document.createElement('div');
                container.className = 'lg-edge-light-container';
                
                // Create SVG for edge paths
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'lg-edge-light-svg');
                svg.setAttribute('preserveAspectRatio', 'none');
                
                // Create edge path elements
                const edgePaths = {
                    top: this.createEdgePath('lg-edge-top'),
                    right: this.createEdgePath('lg-edge-right'),
                    bottom: this.createEdgePath('lg-edge-bottom'),
                    left: this.createEdgePath('lg-edge-left')
                };
                
                Object.values(edgePaths).forEach(path => svg.appendChild(path));
                container.appendChild(svg);
                
                // Ensure element has relative positioning
                if (getComputedStyle(element).position === 'static') {
                    element.style.position = 'relative';
                }
                
                element.appendChild(container);
                
                // Store config - only edge-related properties
                const config = {
                    container,
                    svg,
                    edgePaths,
                    borderRadius,
                    mouseX: 0,
                    mouseY: 0,
                    isHovered: false,
                    edgeDistances: { top: 0, right: 0, bottom: 0, left: 0 }
                };
                
                this.elements.set(element, config);
                
                // Event listeners
                element.addEventListener('mouseenter', (e) => this.onMouseEnter(element, e));
                element.addEventListener('mousemove', (e) => this.onMouseMove(element, e));
                element.addEventListener('mouseleave', (e) => this.onMouseLeave(element, e));
            }
            
            createEdgePath(className) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('class', `lg-edge-path ${className}`);
                path.setAttribute('stroke-width', '2');
                path.setAttribute('stroke-dasharray', '1000');
                path.setAttribute('stroke-dashoffset', '1000');
                return path;
            }
            
            onMouseEnter(element, e) {
                const config = this.elements.get(element);
                if (!config) return;
                
                config.isHovered = true;
                
                Object.values(config.edgePaths).forEach(path => {
                    path.classList.add('active');
                });
            }
            
            onMouseMove(element, e) {
                const config = this.elements.get(element);
                if (!config) return;
                
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const width = rect.width;
                const height = rect.height;
                
                // Normalize to 0-1
                const normX = x / width;
                const normY = y / height;
                
                config.mouseX = x;
                config.mouseY = y;
                
                // Calculate distances to each edge (0-1, where 0 is at edge)
                config.edgeDistances = {
                    top: normY,
                    bottom: 1 - normY,
                    left: normX,
                    right: 1 - normX
                };
                
                // Update edge light paths based on mouse position
                this.updateEdgeLights(element, config, width, height, x, y);
            }
            
            updateEdgeLights(element, config, width, height, mouseX, mouseY) {
                const r = config.borderRadius;
                const svg = config.svg;
                
                // Update SVG viewBox to match element size
                svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
                
                // Top edge
                const topPath = config.edgePaths.top;
                const topY = 1;
                const topSpread = Math.min(mouseY * 2, width / 2);
                const topLeft = Math.max(r, mouseX - topSpread);
                const topRight = Math.min(width - r, mouseX + topSpread);
                topPath.setAttribute('d', `M ${topLeft} ${topY} L ${topRight} ${topY}`);
                topPath.style.strokeWidth = `${Math.max(1, 4 * (1 - config.edgeDistances.top))}`;
                topPath.style.opacity = 1 - config.edgeDistances.top * 0.8;
                topPath.setAttribute('stroke-dashoffset', '0');
                
                // Bottom edge
                const bottomPath = config.edgePaths.bottom;
                const bottomY = height - 1;
                const bottomSpread = Math.min((height - mouseY) * 2, width / 2);
                const bottomLeft = Math.max(r, mouseX - bottomSpread);
                const bottomRight = Math.min(width - r, mouseX + bottomSpread);
                bottomPath.setAttribute('d', `M ${bottomLeft} ${bottomY} L ${bottomRight} ${bottomY}`);
                bottomPath.style.strokeWidth = `${Math.max(1, 4 * (1 - config.edgeDistances.bottom))}`;
                bottomPath.style.opacity = 1 - config.edgeDistances.bottom * 0.8;
                bottomPath.setAttribute('stroke-dashoffset', '0');
                
                // Left edge
                const leftPath = config.edgePaths.left;
                const leftX = 1;
                const leftSpread = Math.min(mouseX * 2, height / 2);
                const leftTop = Math.max(r, mouseY - leftSpread);
                const leftBottom = Math.min(height - r, mouseY + leftSpread);
                leftPath.setAttribute('d', `M ${leftX} ${leftTop} L ${leftX} ${leftBottom}`);
                leftPath.style.strokeWidth = `${Math.max(1, 4 * (1 - config.edgeDistances.left))}`;
                leftPath.style.opacity = 1 - config.edgeDistances.left * 0.8;
                leftPath.setAttribute('stroke-dashoffset', '0');
                
                // Right edge
                const rightPath = config.edgePaths.right;
                const rightX = width - 1;
                const rightSpread = Math.min((width - mouseX) * 2, height / 2);
                const rightTop = Math.max(r, mouseY - rightSpread);
                const rightBottom = Math.min(height - r, mouseY + rightSpread);
                rightPath.setAttribute('d', `M ${rightX} ${rightTop} L ${rightX} ${rightBottom}`);
                rightPath.style.strokeWidth = `${Math.max(1, 4 * (1 - config.edgeDistances.right))}`;
                rightPath.style.opacity = 1 - config.edgeDistances.right * 0.8;
                rightPath.setAttribute('stroke-dashoffset', '0');
            }
            
            onMouseLeave(element, e) {
                const config = this.elements.get(element);
                if (!config) return;
                
                config.isHovered = false;
                
                Object.values(config.edgePaths).forEach(path => {
                    path.classList.remove('active');
                    path.setAttribute('stroke-dashoffset', '1000');
                });
            }
            
            startAnimationLoop() {
                const animate = () => {
                    this.rafId = requestAnimationFrame(animate);
                };
                animate();
            }
        }
        
                class LiquidGlassTiltSystem {
            constructor() {
                this.elements = new Map();
                this.init();
            }
            
            init() {
                const selectors = [
                    '.feature-card',
                    '.kit-tool-window', 
                    '.value-card',
                    '.paper-card',
                    '.stat-item',
                    '.team-card'
                ];
                
                document.querySelectorAll(selectors.join(', ')).forEach(element => {
                    this.setupElement(element);
                });
            }
            
            setupElement(element) {
                const config = {
                    rotateX: 0,
                    rotateY: 0,
                    targetRotateX: 0,
                    targetRotateY: 0
                };
                
                this.elements.set(element, config);
                
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    
                    config.targetRotateX = (0.5 - y) * 8;
                    config.targetRotateY = (x - 0.5) * 8;
                });
                
                element.addEventListener('mouseleave', () => {
                    config.targetRotateX = 0;
                    config.targetRotateY = 0;
                });
                
                // Animation loop
                const animate = () => {
                    config.rotateX += (config.targetRotateX - config.rotateX) * 0.1;
                    config.rotateY += (config.targetRotateY - config.rotateY) * 0.1;
                    
                    if (Math.abs(config.targetRotateX) > 0.01 || Math.abs(config.targetRotateY) > 0.01 ||
                        Math.abs(config.rotateX) > 0.01 || Math.abs(config.rotateY) > 0.01) {
                        element.style.transform = `
                            perspective(1000px)
                            rotateX(${config.rotateX}deg)
                            rotateY(${config.rotateY}deg)
                            translateZ(10px)
                        `;
                    }
                    
                    requestAnimationFrame(animate);
                };
                animate();
            }
        }
        
        // Glow orbs parallax
        class GlowOrbsSystem {
            constructor() {
                this.mouseX = 0;
                this.mouseY = 0;
                this.init();
            }
            
            init() {
                document.addEventListener('mousemove', (e) => {
                    this.mouseX = e.clientX / window.innerWidth;
                    this.mouseY = e.clientY / window.innerHeight;
                });
                
                this.animate();
            }
            
            animate() {
                const orbs = document.querySelectorAll('.glow-orb');
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 30;
                    const xOffset = (this.mouseX - 0.5) * speed;
                    const yOffset = (this.mouseY - 0.5) * speed;
                    orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                });
                
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Navigation scroll effect
        function initNavScroll() {
            const nav = document.querySelector('nav');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 80) {
                    nav?.classList.add('scrolled');
                    if (nav) nav.style.padding = '0.5rem 2rem';
                } else {
                    nav?.classList.remove('scrolled');
                    if (nav) nav.style.padding = '1rem 2rem';
                }
            });
        }
        
        // Input focus effects
        function initInputEffects() {
            document.querySelectorAll('.form-group input').forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.02)';
                });
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });
            });
        }
        
        // Initialize everything
        function initUltimateLiquidGlass() {
            window.liquidGlassLight = new LiquidGlassLightSystem();
            window.liquidGlassTilt = new LiquidGlassTiltSystem();
            window.glowOrbs = new GlowOrbsSystem();
            initNavScroll();
            initInputEffects();
            
            console.log('✨ Ultimate Liquid Glass v5.0 - Clean Edge Light Only');
        }
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initUltimateLiquidGlass);
        } else {
            initUltimateLiquidGlass();
        }
