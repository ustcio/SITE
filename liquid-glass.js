        // ==================== LIQUID GLASS SYSTEM ====================
        // Disabled - Using clean thin border style consistently
        // All light/glow effects removed for unified design
        
        class LiquidGlassLightSystem {
            constructor() {
                console.log('🌊 Liquid Glass - Clean Border Mode (Effects Disabled)');
            }
        }
        
        class LiquidGlassTiltSystem {
            constructor() {
                // Disabled - using CSS hover scale instead
            }
        }
        
        // Glow orbs parallax - Keep for background atmosphere
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
                if (document.hidden) {
                    requestAnimationFrame(() => this.animate());
                    return;
                }
                
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
            
            console.log('✨ Clean Border Mode - No Glow Effects');
        }
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initUltimateLiquidGlass);
        } else {
            initUltimateLiquidGlass();
        }
