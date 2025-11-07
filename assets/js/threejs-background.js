/**
 * Minimalistic Three.js Background Effect
 * Floating geometric particles with subtle animation
 */

class MinimalBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
        this.animate();
        this.handleResize();
        this.handleMouseMove();
    }
    
    init() {
        // Create canvas container
        const container = document.createElement('div');
        container.id = 'threejs-background';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.15;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);
        
        // Create particles
        this.createParticles();
    }
    
    createParticles() {
        // Performance optimization: reduce particle count on mobile
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 20 : 30;
        const sphereCount = isMobile ? 10 : 15;
        
        // Shared geometry for better performance
        const boxGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        const boxMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6666, // Match your theme color
            transparent: true,
            opacity: 0.6
        });
        
        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(boxGeometry, boxMaterial.clone());
            
            // Random position in a sphere
            const radius = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            
            particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
            particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
            particle.position.z = radius * Math.cos(phi);
            
            // Random rotation speed
            particle.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                basePosition: { 
                    x: particle.position.x,
                    y: particle.position.y,
                    z: particle.position.z
                }
            };
            
            this.scene.add(particle);
            this.particles.push(particle);
        }
        
        // Add some spheres for variety
        const sphereGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0xff9999,
            transparent: true,
            opacity: 0.4
        });
        
        for (let i = 0; i < sphereCount; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
            
            const radius = 2.5 + Math.random() * 2.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            
            sphere.position.x = radius * Math.sin(phi) * Math.cos(theta);
            sphere.position.y = radius * Math.sin(phi) * Math.sin(theta);
            sphere.position.z = radius * Math.cos(phi);
            
            sphere.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.015,
                    y: (Math.random() - 0.5) * 0.015,
                    z: (Math.random() - 0.5) * 0.015
                },
                basePosition: {
                    x: sphere.position.x,
                    y: sphere.position.y,
                    z: sphere.position.z
                }
            };
            
            this.scene.add(sphere);
            this.particles.push(sphere);
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Update particles
        this.particles.forEach((particle, index) => {
            // Rotation
            particle.rotation.x += particle.userData.rotationSpeed.x;
            particle.rotation.y += particle.userData.rotationSpeed.y;
            particle.rotation.z += particle.userData.rotationSpeed.z;
            
            // Floating animation
            particle.position.x = particle.userData.basePosition.x + 
                Math.sin(time + index) * 0.3;
            particle.position.y = particle.userData.basePosition.y + 
                Math.cos(time * 0.7 + index) * 0.3;
            particle.position.z = particle.userData.basePosition.z + 
                Math.sin(time * 0.5 + index) * 0.2;
            
            // Subtle mouse interaction
            const mouseInfluence = 0.1;
            particle.position.x += (this.mouse.x * mouseInfluence - particle.position.x) * 0.01;
            particle.position.y += (this.mouse.y * mouseInfluence - particle.position.y) * 0.01;
        });
        
        // Slow camera rotation
        this.camera.position.x = Math.sin(time * 0.1) * 0.5;
        this.camera.position.y = Math.cos(time * 0.15) * 0.3;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    handleMouseMove() {
        window.addEventListener('mousemove', (e) => {
            // Normalize mouse position to -1 to 1
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        const container = document.getElementById('threejs-background');
        if (container) {
            container.remove();
        }
    }
}

// Initialize when DOM is ready and Three.js is loaded
function initThreeJSBackground() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded yet, retrying...');
        setTimeout(initThreeJSBackground, 100);
        return;
    }
    
    try {
        window.minimalBackground = new MinimalBackground();
        console.log('✅ Minimal Three.js background initialized');
    } catch (error) {
        console.error('❌ Error initializing Three.js background:', error);
    }
}

// Wait for DOM and Three.js to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJSBackground);
} else {
    // Check if Three.js is already loaded
    if (typeof THREE !== 'undefined') {
        initThreeJSBackground();
    } else {
        // Wait for Three.js script to load
        window.addEventListener('load', initThreeJSBackground);
    }
}

