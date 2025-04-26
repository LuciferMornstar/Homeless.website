/**
 * Network visualization effects for the post-housing support section
 * Inspired by Return to Monkey Island and advanced solar system visualizations
 */

class SupportNetwork {
    constructor() {
        this.networkContainer = document.getElementById('network-visualization');
        if (!this.networkContainer) return;
        
        this.container = this.networkContainer.querySelector('.network-container');
        this.sun = document.getElementById('node1');
        this.planets = Array.from(document.querySelectorAll('.network-node')).filter(node => node.id !== 'node1');
        this.lines = document.querySelectorAll('.network-line');
        // Fix: Using multiple selectors to ensure we find the info display element
        this.infoDisplay = document.querySelector('#network-visualization .text-card p:first-child') || 
                          document.querySelector('#network-visualization .text-card p') ||
                          document.querySelector('.text-card p');
        
        // Create a new info display element if none exists
        if (!this.infoDisplay && this.networkContainer) {
            const textCard = this.networkContainer.querySelector('.text-card');
            if (textCard) {
                this.infoDisplay = document.createElement('p');
                this.infoDisplay.textContent = "Click on a node to learn more about your support network";
                textCard.prepend(this.infoDisplay);
            }
        }
        
        this.initialized = false;
        
        this.nodeDescriptions = {
            'node1': {
                title: "You",
                description: "You are at the center of your support network. All services and connections revolve around your unique needs and goals."
            },
            'node2': {
                title: "Buddy",
                description: "Your Buddy provides regular social contact, emotional support, and helps connect you with other services."
            },
            'node3': {
                title: "Neighbors",
                description: "Neighbors create a sense of community and can offer practical everyday assistance."
            },
            'node4': {
                title: "Support Group",
                description: "Support Groups let you share experiences and learn from others in similar situations."
            },
            'node5': {
                title: "Social Worker",
                description: "Social Workers coordinate services and advocate for your needs with official agencies."
            },
            'node6': {
                title: "Community Center",
                description: "Community Centers provide activities, workshops, and a place to meet others."
            },
            'node7': {
                title: "Health Provider",
                description: "Health Providers ensure ongoing physical and mental health support."
            }
        };
        
        // Ensure the container is visible from the start
        if (this.container) {
            this.container.style.opacity = '1';
            this.container.style.visibility = 'visible';
            Array.from(this.container.querySelectorAll('.network-node, .network-line')).forEach(element => {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
            });
        }
        
        // Ensure everything is initialized properly
        setTimeout(() => this.init(), 100);
    }
    
    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        // Setup sun (central node)
        this.initializeCentralNode();
        
        // Setup planets (other nodes)
        this.initializeNodes();
        
        // Ensure the network container remains visible
        if (this.networkContainer) {
            this.networkContainer.style.opacity = '1';
            this.networkContainer.style.visibility = 'visible';
        }
        
        // Make all elements visible initially but with 0 opacity
        if (this.sun) {
            this.sun.style.opacity = '0';
            this.sun.style.visibility = 'visible'; // Ensure visibility is set
        }
        
        this.planets.forEach(planet => {
            planet.style.opacity = '0';
            planet.style.visibility = 'visible'; // Ensure visibility is set
        });
        
        // Add visible class to container to ensure it remains visible
        if (this.networkContainer) {
            this.networkContainer.classList.add('visible');
        }
        
        // Setup animation when section becomes visible
        this.setupVisibilityObserver();
    }
    
    initializeCentralNode() {
        if (!this.sun) return;
        
        // Setup central node click event
        this.sun.addEventListener('click', () => {
            this.resetFocus();
            this.showNodeInfo(this.sun);
        });
    }
    
    initializeNodes() {
        this.planets.forEach((planet, _index) => {
            // Set node data
            const nodeInfo = this.nodeDescriptions[planet.id];
            if (nodeInfo) {
                planet.setAttribute('data-title', nodeInfo.title);
                planet.setAttribute('data-description', nodeInfo.description);
            }
            
            // Setup click event
            planet.addEventListener('click', () => {
                this.focusOnNode(planet);
                this.showNodeInfo(planet);
            });
        });
    }
    
    setupVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ensure lines are drawn after nodes are visible
                    this.animateNetwork();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        if (this.networkContainer) {
            observer.observe(this.networkContainer);
        }
    }
    
    animateNetwork() {
        // First animate the sun appearing
        if (this.sun) {
            this.sun.classList.add('visible');
            this.sun.style.opacity = '1';
        }
        
        // Then animate the planets with delay
        this.planets.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('visible');
                node.style.opacity = '1';
            }, index * 200);
        });
        
        // Update the lines with a longer delay to ensure all nodes are rendered
        setTimeout(() => {
            this.updateNetworkLines();
            
            // Set a backup timer to ensure lines are shown eventually
            setTimeout(() => {
                Array.from(this.lines).forEach(line => {
                    if (line.style.opacity === '0' || !line.style.opacity) {
                        line.style.opacity = '0.7';
                        line.classList.add('visible');
                    }
                });
            }, 2000);
        }, this.planets.length * 200 + 500);
    }
    
    updateNetworkLines() {
        if (!this.container || !this.lines) return;
        
        // Ensure container has a specific size and position context
        if (this.container) {
            this.container.style.position = 'relative';
            // Only set size if not already set by CSS
            if (!this.container.style.width) {
                this.container.style.width = '100%';
                this.container.style.minHeight = '400px';
            }
        }
        
        // Fix: First ensure all lines have initial visibility settings
        Array.from(this.lines).forEach(line => {
            line.style.opacity = '0';
            line.style.visibility = 'visible';
            line.style.position = 'absolute';
        });
        
        // Give the DOM more time to render and calculate positions
        setTimeout(() => {
            // Cache the containerRect to avoid layout thrashing
            const containerRect = this.container.getBoundingClientRect();
            
            Array.from(this.lines).forEach((line) => {
                const lineId = line.id;
                // Get the node IDs from the line ID (e.g., "line1-2" -> ["1", "2"])
                const nodeIDs = lineId.replace('line', '').split('-');
                
                if (nodeIDs.length === 2) {
                    const node1Id = 'node' + nodeIDs[0];
                    const node2Id = 'node' + nodeIDs[1];
                    const node1 = document.getElementById(node1Id);
                    const node2 = document.getElementById(node2Id);
                    
                    if (node1 && node2) {
                        // Get node bounds
                        const node1Rect = node1.getBoundingClientRect();
                        const node2Rect = node2.getBoundingClientRect();
                        
                        // Calculate positions relative to container
                        const x1 = (node1Rect.left + node1Rect.width/2) - containerRect.left;
                        const y1 = (node1Rect.top + node1Rect.height/2) - containerRect.top;
                        const x2 = (node2Rect.left + node2Rect.width/2) - containerRect.left;
                        const y2 = (node2Rect.top + node2Rect.height/2) - containerRect.top;
                        
                        // Calculate length and angle
                        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                        
                        // Position line - make sure these styles are applied
                        line.style.width = `${length}px`;
                        line.style.left = `${x1}px`;
                        line.style.top = `${y1}px`;
                        line.style.transform = `rotate(${angle}deg)`;
                        line.style.transformOrigin = '0 0'; // Ensure proper rotation origin
                        line.style.height = '2px'; // Ensure the line has height
                        
                        // Make line visible with a small delay for smooth appearance
                        setTimeout(() => {
                            line.style.opacity = '0.7';
                            line.classList.add('visible');
                        }, 50);
                    }
                }
            });
        }, 500);
    }
    
    resetFocus() {
        this.planets.forEach(planet => {
            planet.style.transform = 'scale(1)';
            planet.style.zIndex = '1';
        });
        
        if (this.sun) {
            this.sun.style.transform = 'scale(1)';
            this.sun.style.zIndex = '1';
        }
    }
    
    focusOnNode(node) {
        this.resetFocus();
        
        if (node) {
            node.style.transform = 'scale(1.3)';
            node.style.zIndex = '2';
        }
    }
    
    showNodeInfo(node) {
        if (!this.infoDisplay || !node) return;
        
        const nodeId = node.id;
        const nodeInfo = this.nodeDescriptions[nodeId];
        
        if (nodeInfo) {
            // Fade out
            this.infoDisplay.style.opacity = '0';
            
            // Update content and fade in
            setTimeout(() => {
                this.infoDisplay.innerHTML = `<strong>${nodeInfo.title}:</strong> ${nodeInfo.description}`;
                this.infoDisplay.style.opacity = '1';
            }, 300);
        }
    }
}

// Initialize the support network visualization
document.addEventListener('DOMContentLoaded', () => {
    const networkViz = new SupportNetwork();
    
    // Handle window resize to reposition lines
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (networkViz && networkViz.updateNetworkLines) {
                networkViz.updateNetworkLines();
            }
        }, 250);
    });
});
