/**
 * CONTENT LOADER
 * This script loads content from content.json and populates the website
 * Edit content.json to update your website content
 */

let websiteContent = {};
// Make it globally accessible for form submission
window.websiteContent = websiteContent;

// Load content from JSON file
async function loadContent() {
    try {
        // Add cache-busting timestamp to prevent browser caching
        const timestamp = new Date().getTime();
        const response = await fetch(`./content.json?t=${timestamp}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        websiteContent = await response.json();
        // Make it globally accessible
        window.websiteContent = websiteContent;
        console.log('✅ Content loaded successfully from content.json');
        console.log('📦 Loaded content:', websiteContent);
        populateWebsite();
    } catch (error) {
        console.error('❌ Error loading content:', error);
        
        // Check if it's a CORS error (happens when opening file:// directly)
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            console.error('');
            console.error('⚠️ CORS ERROR DETECTED!');
            console.error('You are likely opening the HTML file directly (file:// protocol).');
            console.error('This prevents loading content.json due to browser security.');
            console.error('');
            console.error('💡 SOLUTION: Use a local web server instead:');
            console.error('   1. Install Python and run: python -m http.server 8000');
            console.error('   2. Or use VS Code Live Server extension');
            console.error('   3. Then open: http://localhost:8000');
            console.error('');
            console.error('📝 Or manually reload content by typing in console:');
            console.error('   reloadContent()');
        } else {
            console.error('Make sure content.json exists and is valid JSON');
            console.error('Validate your JSON at: https://jsonlint.com');
        }
        // Fallback: website will show default content
    }
}

// Populate all website content
function populateWebsite() {
    // Validate that content was loaded
    if (!websiteContent || Object.keys(websiteContent).length === 0) {
        console.error('❌ No content loaded. Cannot populate website.');
        return;
    }
    
    console.log('🔄 Populating website with content from JSON...');
    
    try {
        populatePersonalInfo();
        populateAbout();
        populateServices();
        populateTestimonials();
        populateCompanies();
        populateProjects();
        populateProjectModals();
        
        // Re-initialize project modals after projects are populated
        // This ensures click handlers work on dynamically added items
        if (window.initProjectModals) {
            window.initProjectModals();
            console.log('✅ Project modals re-initialized for dynamic content');
        }
        
        // Verify levels toggle buttons exist (event delegation handles clicks automatically)
        const toggleBtns = document.querySelectorAll('.levels-toggle-btn');
        if (toggleBtns.length > 0) {
            console.log(`✅ Found ${toggleBtns.length} level toggle button(s) - ready to use`);
        }
        
        console.log('✅ Website content populated successfully!');
    } catch (error) {
        console.error('❌ Error populating website:', error);
    }
}

// Personal Information
function populatePersonalInfo() {
    const info = websiteContent.personalInfo;
    if (!info) {
        console.warn('⚠️ Personal info not found in content.json');
        return;
    }
    
    // Name
    const nameElements = document.querySelectorAll('.name, [data-name]');
    if (nameElements.length === 0) {
        console.warn('⚠️ No name elements found in HTML');
    } else {
        console.log(`✅ Found ${nameElements.length} name element(s)`);
        nameElements.forEach(el => {
            el.textContent = info.name;
            if (el.hasAttribute('title')) el.setAttribute('title', info.name);
        });
    }
    
    // Title
    const titleElements = document.querySelectorAll('.title, [data-title]');
    if (titleElements.length === 0) {
        console.warn('⚠️ No title elements found in HTML');
    } else {
        console.log(`✅ Found ${titleElements.length} title element(s)`);
        titleElements.forEach(el => el.textContent = info.title);
    }
    
    // Avatar
    const avatarElements = document.querySelectorAll('.avatar-box img, [data-avatar]');
    avatarElements.forEach(el => {
        el.src = info.avatar;
        el.alt = info.name;
    });
    
    // LinkedIn
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
    linkedinLinks.forEach(link => link.href = info.linkedin);
    
    // Email
    const emailElements = document.querySelectorAll('a[href^="mailto:"]');
    emailElements.forEach(el => {
        el.href = `mailto:${info.email}`;
        el.textContent = info.email;
    });
    
    // Phone
    const phoneElements = document.querySelectorAll('a[href^="tel:"]');
    phoneElements.forEach(el => {
        el.href = `tel:${info.phone.replace(/\s/g, '')}`;
        el.textContent = info.phone;
    });
    
    // Birthday
    const birthdayElements = document.querySelectorAll('time[datetime], [data-birthday]');
    birthdayElements.forEach(el => {
        el.textContent = info.birthday;
        if (el.tagName === 'TIME') {
            // Extract date from birthday string (format: "January 09, 1999")
            const dateMatch = info.birthday.match(/(\w+)\s+(\d+),\s+(\d+)/);
            if (dateMatch) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                   'July', 'August', 'September', 'October', 'November', 'December'];
                const month = String(monthNames.indexOf(dateMatch[1]) + 1).padStart(2, '0');
                const day = dateMatch[2].padStart(2, '0');
                const year = dateMatch[3];
                el.setAttribute('datetime', `${year}-${month}-${day}`);
            }
        }
    });
    
    // Location
    const locationElements = document.querySelectorAll('address, [data-location]');
    locationElements.forEach(el => el.textContent = info.location);
    
    // Resume Link
    const resumeLinks = document.querySelectorAll('a[href*="drive.google.com"], [data-resume]');
    resumeLinks.forEach(link => link.href = info.resumeLink);
}

// About Section
function populateAbout() {
    const aboutSection = document.querySelector('.about-text');
    if (!aboutSection) {
        console.warn('⚠️ About section (.about-text) not found in HTML');
        return;
    }
    
    const paragraphs = websiteContent.about.paragraphs;
    const existingParagraphs = aboutSection.querySelectorAll('p');
    
    // Update existing paragraphs or create new ones
    paragraphs.forEach((text, index) => {
        if (existingParagraphs[index]) {
            existingParagraphs[index].textContent = text;
        } else {
            const p = document.createElement('p');
            p.textContent = text;
            aboutSection.appendChild(p);
        }
    });
    
    // Remove extra paragraphs if there are fewer in JSON
    for (let i = paragraphs.length; i < existingParagraphs.length; i++) {
        existingParagraphs[i].remove();
    }
}

// Services Section
function populateServices() {
    const servicesList = document.querySelector('.service-list');
    if (!servicesList) {
        console.warn('⚠️ Services list (.service-list) not found in HTML');
        return;
    }
    
    servicesList.innerHTML = ''; // Clear existing
    
    websiteContent.services.forEach(service => {
        const li = document.createElement('li');
        li.className = 'service-item';
        
        // Create icon box
        const iconBox = document.createElement('div');
        iconBox.className = 'service-icon-box';
        
        // Create image element directly (better for path resolution)
        const img = document.createElement('img');
        
        // Use the path as-is (relative paths work for both local and GitHub Pages)
        // Relative paths (./assets/...) work correctly on GitHub Pages
        // Absolute paths (/assets/...) break on GitHub Pages with subdirectory
        let iconPath = service.icon;
        
        // Keep relative paths as-is for GitHub Pages compatibility
        // Only normalize if it's an absolute path without http/https
        if (iconPath.startsWith('/') && !iconPath.startsWith('//') && !iconPath.startsWith('http')) {
            // Convert absolute path to relative for GitHub Pages compatibility
            iconPath = '.' + iconPath;
        }
        
        img.src = iconPath;
        img.alt = `${service.title} icon`;
        img.width = 40;
        img.loading = 'lazy';
        
        // Add error handler
        img.onerror = function() {
            console.error(`❌ Failed to load icon: ${service.icon} for ${service.title}`);
            console.error(`   Attempted path: ${this.src}`);
            console.error(`   Full URL: ${window.location.origin}${iconPath}`);
            // Try fallback with relative path
            if (iconPath.startsWith('/')) {
                const fallbackPath = '.' + iconPath;
                console.log(`   Trying fallback: ${fallbackPath}`);
                this.src = fallbackPath;
            }
        };
        
        // Add load handler for debugging
        img.onload = function() {
            console.log(`✅ Loaded icon: ${this.src} for ${service.title}`);
        };
        
        iconBox.appendChild(img);
        
        // Create content box
        const contentBox = document.createElement('div');
        contentBox.className = 'service-content-box';
        
        const title = document.createElement('h4');
        title.className = 'h4 service-item-title';
        title.textContent = service.title;
        
        const description = document.createElement('p');
        description.className = 'service-item-text';
        description.textContent = service.description;
        
        contentBox.appendChild(title);
        contentBox.appendChild(description);
        
        // Assemble the item
        li.appendChild(iconBox);
        li.appendChild(contentBox);
        servicesList.appendChild(li);
    });
    
    console.log(`✅ Populated ${websiteContent.services.length} services`);
}

// Testimonials Section
function populateTestimonials() {
    const testimonialsList = document.querySelector('.testimonials-list');
    if (!testimonialsList) return;
    
    testimonialsList.innerHTML = ''; // Clear existing
    
    websiteContent.testimonials.forEach((testimonial, index) => {
        const li = document.createElement('li');
        li.className = 'testimonials-item';
        li.innerHTML = `
            <div class="content-card" data-testimonials-item>
                <figure class="testimonials-avatar-box">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" width="60" data-testimonials-avatar>
                </figure>
                <h4 class="h4 testimonials-item-title" data-testimonials-title>${testimonial.name}</h4>
                <div class="testimonials-text" data-testimonials-text>
                    <p>${testimonial.text}</p>
                </div>
            </div>
        `;
        testimonialsList.appendChild(li);
    });
}

// Companies Section
function populateCompanies() {
    const companiesList = document.querySelector('.clients-list');
    if (!companiesList) return;
    
    companiesList.innerHTML = ''; // Clear existing
    
    websiteContent.companies.forEach(company => {
        const li = document.createElement('li');
        li.className = 'clients-item';
        li.innerHTML = `
            <a href="${company.link}" target="_blank">
                <img src="${company.logo}" alt="${company.name} logo">
            </a>
        `;
        companiesList.appendChild(li);
    });
}

// Projects Section
function populateProjects() {
    const projectsList = document.querySelector('.project-list');
    if (!projectsList) return;
    
    // Clear existing projects (keep the structure)
    const existingProjects = projectsList.querySelectorAll('.project-item');
    existingProjects.forEach(item => item.remove());
    
    // Add Game Projects
    websiteContent.projects.gameProject.forEach(project => {
        const li = createProjectItem(project);
        projectsList.appendChild(li);
    });
    
    // Add Others Projects
    websiteContent.projects.others.forEach(project => {
        const li = createProjectItem(project);
        projectsList.appendChild(li);
    });
}

// Create a project item element
function createProjectItem(project) {
    const li = document.createElement('li');
    li.className = 'project-item active';
    li.setAttribute('data-filter-item', '');
    li.setAttribute('data-category', project.category);
    li.setAttribute('data-project-id', project.id);
    
    const categoryDisplay = project.category === 'game project' ? 'Game Project' : 'Others';
    
    li.innerHTML = `
        <a href="javascript:void(0);">
            <figure class="project-img">
                <div class="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </figure>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-category">${categoryDisplay}</p>
            </div>
        </a>
    `;
    
    return li;
}

// Populate Project Modals
function populateProjectModals() {
    if (!websiteContent.projectModals) return;
    
    Object.keys(websiteContent.projectModals).forEach(projectId => {
        const modalData = websiteContent.projectModals[projectId];
        const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
        
        if (!modal) return;
        
        // Check if modal has any content to populate
        const hasContent = hasModalContent(modalData);
        
        // Only populate if there's actual content in JSON
        // Otherwise, keep the hardcoded HTML content
        if (hasContent) {
            // Populate Header
            populateModalHeader(modal, modalData.header);
            
            // Populate Content Sections (this will clear and replace hardcoded content)
            populateModalContent(modal, modalData);
        } else {
            // No content in JSON - just update header if it exists, keep rest of hardcoded content
            if (modalData.header) {
                populateModalHeader(modal, modalData.header);
            }
        }
    });
}

// Check if modal data has any actual content (not just empty arrays)
function hasModalContent(modalData) {
    if (!modalData) return false;
    
    return (
        (modalData.overview && modalData.overview.length > 0) ||
        (modalData.levelDesign && modalData.levelDesign.length > 0) ||
        (modalData.goals && modalData.goals.length > 0) ||
        (modalData.features && modalData.features.length > 0) ||
        (modalData.metrics && modalData.metrics.length > 0) ||
        (modalData.challenges && modalData.challenges.length > 0) ||
        (modalData.gameAreas && modalData.gameAreas.length > 0) ||
        (modalData.media && modalData.media.length > 0) ||
        (modalData.finalThoughts && modalData.finalThoughts.length > 0)
    );
}

// Populate Modal Header
function populateModalHeader(modal, headerData) {
    if (!headerData) return;
    
    // Title
    const titleEl = modal.querySelector('.project-modal-title');
    if (titleEl && headerData.title) titleEl.textContent = headerData.title;
    
    // Subtitle
    const subtitleEl = modal.querySelector('.project-modal-subtitle');
    if (subtitleEl && headerData.subtitle) subtitleEl.textContent = headerData.subtitle;
    
    // Meta
    const metaEl = modal.querySelector('.project-modal-meta');
    if (metaEl && headerData.meta && headerData.meta.length > 0) {
        metaEl.innerHTML = '';
        headerData.meta.forEach(meta => {
            const span = document.createElement('span');
            span.className = 'project-modal-meta-item';
            span.innerHTML = `<strong>${meta.label}:</strong> ${meta.value}`;
            metaEl.appendChild(span);
        });
    }
    
    // Download Link
    const downloadBtn = modal.querySelector('.project-download-btn');
    if (downloadBtn && headerData.downloadLink) {
        downloadBtn.href = headerData.downloadLink;
    }
}

// Populate Modal Content Sections
function populateModalContent(modal, modalData) {
    const contentEl = modal.querySelector('.project-modal-content');
    if (!contentEl) return;
    
    // Clear existing sections (keep structure)
    const existingSections = contentEl.querySelectorAll('.project-modal-section');
    existingSections.forEach(section => section.remove());
    
    // Project Overview
    if (modalData.overview && modalData.overview.length > 0) {
        const section = createSection('Project Overview', 'overview');
        modalData.overview.forEach(text => {
            const p = document.createElement('p');
            p.className = 'project-modal-text';
            p.textContent = text;
            section.appendChild(p);
        });
        contentEl.appendChild(section);
    }
    
    // Level Design
    if (modalData.levelDesign && modalData.levelDesign.length > 0) {
        const section = createSection('Level Design', 'levelDesign');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'levels-toggle-btn';
        toggleBtn.innerHTML = '<span>Show Level Details</span><ion-icon name="chevron-down-outline"></ion-icon>';
        
        const levelsSection = document.createElement('div');
        levelsSection.className = 'project-levels-section';
        const episodesList = document.createElement('div');
        episodesList.className = 'project-episodes-list';
        
        modalData.levelDesign.forEach(level => {
            const episodeItem = document.createElement('div');
            episodeItem.className = 'project-episode-item';
            episodeItem.innerHTML = `
                <span class="project-episode-number">${level.number}</span>
                <h4 class="project-episode-title">${level.title}</h4>
                <p class="project-episode-description">${level.description}</p>
            `;
            episodesList.appendChild(episodeItem);
        });
        
        levelsSection.appendChild(episodesList);
        section.appendChild(toggleBtn);
        section.appendChild(levelsSection);
        contentEl.appendChild(section);
    }
    
    // Goals & Features
    if ((modalData.goals && modalData.goals.length > 0) || (modalData.features && modalData.features.length > 0)) {
        const section = createSection('Goals & Features', 'goalsFeatures');
        
        if (modalData.goals && modalData.goals.length > 0) {
            const goalsTitle = document.createElement('h4');
            goalsTitle.className = 'h4';
            goalsTitle.style.cssText = 'color: var(--white-2); margin-bottom: 10px;';
            goalsTitle.textContent = 'Project Goals';
            section.appendChild(goalsTitle);
            
            const goalsList = document.createElement('ul');
            goalsList.className = 'project-goals-list';
            modalData.goals.forEach(goal => {
                const li = document.createElement('li');
                li.textContent = goal;
                goalsList.appendChild(li);
            });
            section.appendChild(goalsList);
        }
        
        if (modalData.features && modalData.features.length > 0) {
            const featuresTitle = document.createElement('h4');
            featuresTitle.className = 'h4';
            featuresTitle.style.cssText = 'color: var(--white-2); margin: 20px 0 10px 0;';
            featuresTitle.textContent = 'Key Features';
            section.appendChild(featuresTitle);
            
            const featuresList = document.createElement('ul');
            featuresList.className = 'project-features-list';
            modalData.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            section.appendChild(featuresList);
        }
        
        contentEl.appendChild(section);
    }
    
    // Project Metrics
    if (modalData.metrics && modalData.metrics.length > 0) {
        const section = createSection('Project Metrics', 'metrics');
        const metricsGrid = document.createElement('div');
        metricsGrid.className = 'project-metrics-grid';
        
        modalData.metrics.forEach(metric => {
            const metricItem = document.createElement('div');
            metricItem.className = 'project-metric-item';
            metricItem.innerHTML = `
                <span class="project-metric-value">${metric.value}</span>
                <span class="project-metric-label">${metric.label}</span>
            `;
            metricsGrid.appendChild(metricItem);
        });
        
        section.appendChild(metricsGrid);
        contentEl.appendChild(section);
    }
    
    // Challenges & Solutions
    if (modalData.challenges && modalData.challenges.length > 0) {
        const section = createSection('Challenges & Solutions', 'challenges');
        
        modalData.challenges.forEach(challenge => {
            const challengeItem = document.createElement('div');
            challengeItem.className = 'project-episode-item';
            challengeItem.innerHTML = `
                <h4 class="project-episode-title">${challenge.title}</h4>
                <p class="project-episode-description">
                    <strong style="color: var(--vegas-gold);">Problem:</strong> ${challenge.problem}
                    <br><br>
                    <strong style="color: var(--vegas-gold);">Solution:</strong> ${challenge.solution}
                </p>
            `;
            section.appendChild(challengeItem);
        });
        
        contentEl.appendChild(section);
    }
    
    // Game Areas
    if (modalData.gameAreas && modalData.gameAreas.length > 0) {
        const section = createSection('Game Areas', 'gameAreas');
        const areasGrid = document.createElement('div');
        areasGrid.className = 'project-areas-grid';
        
        modalData.gameAreas.forEach(area => {
            const areaItem = document.createElement('div');
            areaItem.className = 'project-area-item';
            areaItem.innerHTML = `
                <h4 class="project-area-name">${area.name}</h4>
                <p class="project-area-description">${area.description}</p>
            `;
            areasGrid.appendChild(areaItem);
        });
        
        section.appendChild(areasGrid);
        contentEl.appendChild(section);
    }
    
    // Project Media
    if (modalData.media && modalData.media.length > 0) {
        const section = createSection('Project Media', 'media');
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'project-modal-media';
        
        modalData.media.forEach(media => {
            if (media.type === 'image') {
                const img = document.createElement('img');
                img.src = media.src;
                img.alt = media.alt || '';
                img.className = 'project-modal-image';
                mediaContainer.appendChild(img);
                
                if (media.caption) {
                    const caption = document.createElement('p');
                    caption.className = 'project-modal-media-caption';
                    caption.textContent = media.caption;
                    mediaContainer.appendChild(caption);
                }
            } else if (media.type === 'video') {
                const iframe = document.createElement('iframe');
                iframe.src = media.src;
                iframe.className = 'project-modal-video';
                iframe.setAttribute('allowfullscreen', '');
                mediaContainer.appendChild(iframe);
                
                if (media.caption) {
                    const caption = document.createElement('p');
                    caption.className = 'project-modal-media-caption';
                    caption.textContent = media.caption;
                    mediaContainer.appendChild(caption);
                }
            } else if (media.type === 'text') {
                const textDiv = document.createElement('div');
                textDiv.className = 'project-modal-text';
                textDiv.style.cssText = 'text-align: center; padding: 20px; background: var(--border-gradient-onyx); border-radius: 12px;';
                
                const strong = document.createElement('strong');
                strong.textContent = media.content || '';
                textDiv.appendChild(strong);
                
                if (media.link) {
                    const br = document.createElement('br');
                    textDiv.appendChild(br);
                    
                    const link = document.createElement('a');
                    link.href = media.link;
                    link.target = '_blank';
                    link.textContent = media.linkText || media.link;
                    link.style.cssText = 'color: var(--orange-yellow-crayola); text-decoration: underline;';
                    textDiv.appendChild(link);
                }
                
                mediaContainer.appendChild(textDiv);
            }
        });
        
        section.appendChild(mediaContainer);
        contentEl.appendChild(section);
    }
    
    // Final Thoughts & Learnings
    if (modalData.finalThoughts && modalData.finalThoughts.length > 0) {
        const section = createSection('Final Thoughts & Learnings', 'finalThoughts');
        modalData.finalThoughts.forEach(text => {
            const p = document.createElement('p');
            p.className = 'project-modal-text';
            p.textContent = text;
            section.appendChild(p);
        });
        contentEl.appendChild(section);
    }
    
    // Check if no content sections were added - show placeholder message
    const hasContent = contentEl.querySelectorAll('.project-modal-section').length > 0;
    if (!hasContent) {
        const section = createSection('Project Information', 'placeholder');
        const placeholder = document.createElement('p');
        placeholder.className = 'project-modal-text';
        placeholder.style.cssText = 'color: var(--light-gray-70); font-style: italic; text-align: center; padding: 40px 20px;';
        placeholder.textContent = 'Project details coming soon. Check back later for more information!';
        section.appendChild(placeholder);
        contentEl.appendChild(section);
    }
}

// Helper function to create a section
function createSection(title, className) {
    const section = document.createElement('div');
    section.className = 'project-modal-section';
    const titleEl = document.createElement('h3');
    titleEl.className = 'project-modal-section-title';
    titleEl.textContent = title;
    section.appendChild(titleEl);
    return section;
}

// Make loadContent available globally for manual reload
window.reloadContent = loadContent;

// Initialize when DOM is ready - wait a bit to ensure all elements are loaded
function initializeContentLoader() {
    // Wait a small delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('🚀 Initializing content loader...');
        loadContent();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContentLoader);
} else {
    // DOM already loaded, but wait a bit for other scripts
    initializeContentLoader();
}

// Also try loading after window fully loads (as backup)
window.addEventListener('load', () => {
    // Only reload if content wasn't loaded yet
    if (!websiteContent || Object.keys(websiteContent).length === 0) {
        console.log('🔄 Retrying content load after window load...');
        loadContent();
    }
});

