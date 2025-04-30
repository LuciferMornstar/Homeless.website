/**
 * Animations for Hopeful Horizons website
 * Inspired by Return to Monkey Island
 */

class AnimationController {
    constructor() {
        this.initialized = false;
        this.characters = [];
        this.floatingElements = [];
        this.parallaxLayers = [];
        this.backgroundElements = [];
    }

    initialize() {
        if (this.initialized) return;
        
        // Find all elements
        this.parallaxLayers = document.querySelectorAll('.parallax-layer');
        this.characters = document.querySelectorAll('.character');
        this.floatingElements = document.querySelectorAll('.floating-item');
        this.backgroundElements = document.querySelectorAll('.bg-element');
        this.dialogBoxes = document.querySelectorAll('.dialog-box');
        
        // Initialize animations
        this.initializeParallax();
        this.initializeCharacters();
        this.initializeDialogs();
        this.initializeBackgroundElements();
        
        this.initialized = true;
    }
    
    initializeParallax() {
        if (!this.parallaxLayers.length) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            this.parallaxLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.2;
                layer.style.transform = `translateX(${-scrollY * speed}px) translateZ(0)`;
            });
        });
        
        // Add mouse movement parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            this.parallaxLayers.forEach((layer, index) => {
                const offsetX = (mouseX - 0.5) * (index + 1) * 20;
                const offsetY = (mouseY - 0.5) * (index + 1) * 10;
                
                const currentTransform = layer.style.transform;
                const baseTransform = currentTransform.split(' ')[0]; // Keep the scroll-based X translation
                
                layer.style.transform = `${baseTransform} translate(${offsetX}px, ${offsetY}px) translateZ(0)`;
            });
        });
    }
    
    initializeCharacters() {
        if (!this.characters.length) return;
        
        this.characters.forEach((character, index) => {
            // Set initial positions with slight randomness
            const startX = parseFloat(character.style.left || '0') + (Math.random() * 20 - 10);
            const startY = parseFloat(character.style.bottom || '0') + (Math.random() * 10 - 5);
            
            character.style.left = `${startX}%`;
            character.style.bottom = `${startY}%`;
            
            // Create bobbing animation
            if (typeof gsap !== 'undefined') {
                gsap.to(character, {
                    y: '+=10',
                    x: '+=5',
                    duration: 2 + Math.random(), // Slightly different timing for each character
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.3
                });
            }
        });
    }
    
    initializeDialogs() {
        if (!this.dialogBoxes.length) return;
        
        let currentIndex = 0;
        
        const showNextDialog = () => {
            this.dialogBoxes.forEach(box => {
                box.classList.remove('active');
                box.classList.add('hidden');
            });
            
            if (this.dialogBoxes[currentIndex]) {
                this.dialogBoxes[currentIndex].classList.remove('hidden');
                
                setTimeout(() => {
                    this.dialogBoxes[currentIndex].classList.add('active');
                }, 50);
                
                currentIndex = (currentIndex + 1) % this.dialogBoxes.length;
            }
        };
        
        setTimeout(() => {
            showNextDialog();
            setInterval(showNextDialog, 3000);
        }, 1500);
    }
    
    initializeBackgroundElements() {
        if (!this.backgroundElements.length) return;
        
        this.backgroundElements.forEach((element, index) => {
            const baseX = parseFloat(element.style.left);
            const baseY = parseFloat(element.style.top);
            
            // Animate the movement
            const animate = () => {
                const offsetX = Math.sin(Date.now() / 3000 + index) * 5;
                const offsetY = Math.cos(Date.now() / 2500 + index) * 3;
                
                element.style.left = `calc(${baseX}% + ${offsetX}px)`;
                element.style.top = `calc(${baseY}% + ${offsetY}px)`;
                
                requestAnimationFrame(animate);
            };
            
            animate();
        });
        
        // Add scroll animation
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            this.backgroundElements.forEach((element, index) => {
                const moveY = Math.sin(scrollY / 500 + index) * 10;
                const currentTransform = element.style.transform || '';
                
                // Only update the transform if it doesn't already include translateY
                if (!currentTransform.includes('translateY')) {
                    element.style.transform = `${currentTransform} translateY(${moveY}px)`;
                }
            });
        });
    }
}

// Initialize network visualization
class NetworkVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.nodes = this.container.querySelectorAll('.network-node');
        this.lines = this.container.querySelectorAll('.network-line');
        this.infoContainer = document.querySelector('.text-card.mt-6 p:first-child');
        this.isAnimating = false;
        
        this.initialize();
    }
    
    initialize() {
        // Create node info dictionary
        this.nodeInfo = {
            'node1': "You are at the center of your support network. All services revolve around your needs and goals.",
            'node2': "Your Buddy provides regular social contact, emotional support, and helps connect you with other services.",
            'node3': "Neighbors create a sense of community and can offer practical everyday assistance.",
            'node4': "Support Groups let you share experiences and learn from others in similar situations.",
            'node5': "Social Workers coordinate services and advocate for your needs with official agencies.",
            'node6': "Community Centers provide activities, workshops, and a place to meet others.",
            'node7': "Health Providers ensure ongoing physical and mental health support."
        };
        
        // Add event listeners to nodes
        this.nodes.forEach(node => {
            node.addEventListener('click', () => this.selectNode(node));
            node.addEventListener('mouseenter', () => this.highlightNode(node));
            node.addEventListener('mouseleave', () => this.unhighlightNode(node));
        });
        
        // Setup observer to animate when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.isAnimating = true;
                    this.animateNetwork();
                    // Don't unobserve - allow re-animation if scrolled away and back
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(this.container);
        
        // Add resize event listener to update line positions when window size changes
        window.addEventListener('resize', () => {
            if (this.nodes[0].classList.contains('visible')) {
                this.updateLines();
            }
        });
    }
    
    animateNetwork() {
        // Reset animation state if needed
        this.nodes.forEach(node => {
            if (node.classList.contains('visible')) {
                node.classList.remove('visible');
            }
        });
        
        this.lines.forEach(line => {
            if (line.classList.contains('visible')) {
                line.classList.remove('visible');
            }
        });
        
        // First animate the nodes appearing
        this.nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('visible');
                node.style.opacity = '1'; // Ensure opacity is set
            }, index * 200);
        });
        
        // Then animate the lines connecting nodes
        setTimeout(() => {
            // Make sure the lines are properly positioned before showing them
            this.updateLines();
            
            this.lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                    line.style.opacity = '1'; // Ensure opacity is set
                }, index * 100);
            });
            
            // Mark animation as complete after all elements are shown
            setTimeout(() => {
                this.isAnimating = false;
            }, this.lines.length * 100 + 100);
        }, this.nodes.length * 200 + 100);
    }
    
    updateLines() {
        this.lines.forEach(line => {
            const nodeIDs = line.id.split('-');
            if (nodeIDs.length !== 2) return;
            
            const startNode = document.getElementById(`node${nodeIDs[0]}`);
            const endNode = document.getElementById(`node${nodeIDs[1]}`);
            
            if (!startNode || !endNode) return;
            
            const startRect = startNode.getBoundingClientRect();
            const endRect = endNode.getBoundingClientRect();
            const containerRect = this.container.getBoundingClientRect();
            
            // Calculate positions relative to container
            const x1 = startRect.left + startRect.width/2 - containerRect.left;
            const y1 = startRect.top + startRect.height/2 - containerRect.top;
            const x2 = endRect.left + endRect.width/2 - containerRect.left;
            const y2 = endRect.top + endRect.height/2 - containerRect.top;
            
            // Calculate length and angle
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            // Position line
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            
            // Ensure the line is displayed properly
            line.style.transformOrigin = '0 0';
            line.style.position = 'absolute';
        });
    }
    
    selectNode(node) {
        // Reset all nodes
        this.nodes.forEach(n => {
            n.style.transform = 'scale(1)';
            n.style.zIndex = '1';
        });
        
        // Enlarge clicked node
        node.style.transform = 'scale(1.3)';
        node.style.zIndex = '2';
        
        // Update info text
        if (this.infoContainer && this.nodeInfo[node.id]) {
            // Animate text change
            this.infoContainer.style.opacity = '0';
            setTimeout(() => {
                this.infoContainer.textContent = this.nodeInfo[node.id];
                this.infoContainer.style.opacity = '1';
            }, 300);
        }
    }
    
    highlightNode(node) {
        node.style.transform = 'scale(1.1)';
    }
    
    unhighlightNode(node) {
        if (node.style.zIndex === '2') {
            node.style.transform = 'scale(1.3)';
        } else {
            node.style.transform = 'scale(1)';
        }
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    const animationController = new AnimationController();
    animationController.initialize();
    
    // Initialize network visualization
    const networkViz = new NetworkVisualization('network');
    
    // Special animation for section texts
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const textCards = section.querySelectorAll('.text-card');
                
                textCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 200);
                });
                
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.section-wrapper').forEach(section => {
        observer.observe(section);
    });
});
