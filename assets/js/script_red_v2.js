

// element toggle function
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { 
        elementToggleFunc(sidebar); 
    });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
        modalContainer.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

// add click event to all modal items
if (testimonialsItem.length > 0) {
    testimonialsItem.forEach(item => {
        item.addEventListener("click", function () {
            if (modalImg && modalTitle && modalText) {
                modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
                modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
                modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
                modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
                testimonialsModalFunc();
            }
        });
    });
}

// add click event to modal close button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
    select.addEventListener("click", function (e) { 
        e.stopPropagation(); // Prevent event bubbling
        elementToggleFunc(this); 
    });
    
    // Close select when clicking outside
    document.addEventListener("click", function(e) {
        if (select && !select.contains(e.target) && !e.target.closest('.select-list')) {
            select.classList.remove("active");
        }
    });
}

// filter variables
// Note: filterItems will be re-queried in filterFunc to handle dynamically added items

const filterFunc = function (selectedValue) {
    // Normalize the selected value
    selectedValue = selectedValue.toLowerCase().trim();
    
    // Re-query filter items each time to include dynamically added items
    const filterItems = document.querySelectorAll("[data-filter-item]");
    
    filterItems.forEach(item => {
        const itemCategory = item.dataset.category ? item.dataset.category.toLowerCase().trim() : "";
        
        if (selectedValue === "all") {
            item.classList.add("active");
        } else if (selectedValue === itemCategory) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// add event in all select items
if (selectItems.length > 0 && selectValue) {
    selectItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent event bubbling
            e.preventDefault(); // Prevent default behavior
            let selectedValue = this.innerText.toLowerCase().trim();
            let displayText = this.innerText.trim();
            selectValue.innerText = displayText;
            if (select) elementToggleFunc(select);
            
            // Normalize "game project" to match data-category
            if (selectedValue === "game project") {
                selectedValue = "game project";
            }
            
            filterFunc(selectedValue);
            
            // Also update filter buttons to match
            filterBtn.forEach(btn => {
                const btnText = btn.innerText.toLowerCase().trim();
                if (btnText === selectedValue || (selectedValue === "all" && btnText === "all")) {
                    filterBtn.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                }
            });
        });
    });
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        let selectedValue = this.innerText.toLowerCase().trim();
        let displayText = this.innerText.trim();
        if (selectValue) selectValue.innerText = displayText;
        
        // Normalize "game project" to match data-category
        if (selectedValue === "game project") {
            selectedValue = "game project";
        }
        
        filterFunc(selectedValue);

        if (lastClickedBtn) lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (formInputs.length > 0 && form && formBtn) {
    formInputs.forEach(input => {
        input.addEventListener("input", function () {
            // check form validation
            if (form.checkValidity()) {
                formBtn.removeAttribute("disabled");
            } else {
                formBtn.setAttribute("disabled", "");
            }
        });
    });
    
    // Handle form submission
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get("fullname");
        const email = formData.get("email");
        const message = formData.get("message");
        
        // Get recipient email from content.json (if loaded) or use default
        const recipientEmail = (window.websiteContent && window.websiteContent.personalInfo && window.websiteContent.personalInfo.email) 
            ? window.websiteContent.personalInfo.email 
            : 'santhoshratnam1@gmail.com';
        
        // Create mailto link
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon><span>Opening Email Client...</span>';
        formBtn.style.background = 'var(--bg-gradient-yellow-1)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
            formBtn.style.background = '';
            form.reset();
            formBtn.setAttribute("disabled", "");
        }, 2000);
    });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
        pages.forEach((page, pageIndex) => {
            if (this.innerHTML.toLowerCase() === page.dataset.page) {
                page.classList.add("active");
                navigationLinks[pageIndex].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                page.classList.remove("active");
                navigationLinks[pageIndex].classList.remove("active");
            }
        });
        
        // Reset sidebar (close show contacts) when navigating to new page
        if (sidebar) {
            sidebar.classList.remove("active");
        }
    });
});

// Project modal functionality - Using event delegation for dynamically added items
const projectModalContainer = document.querySelector(".project-modal-container");
const projectOverlay = document.querySelector(".project-overlay");

// Make these functions available globally so content-loader can re-initialize if needed
window.initProjectModals = function() {
    const projectModalCloseBtns = document.querySelectorAll(".project-modal-close-btn");
    
    if (projectModalContainer && projectOverlay) {
        const toggleProjectModal = function () {
            projectModalContainer.classList.toggle("active");
            projectOverlay.classList.toggle("active");
        }

        const closeAllModals = function () {
            document.querySelectorAll("[data-project-modal]").forEach(modal => {
                modal.style.display = "none";
            });
            projectModalContainer.classList.remove("active");
            projectOverlay.classList.remove("active");
        }

        // Use event delegation on the project list container
        // This works for both existing and dynamically added project items
        const projectList = document.querySelector(".project-list");
        if (projectList && !projectList.hasAttribute('data-modal-listener')) {
            // Mark that we've attached the listener
            projectList.setAttribute('data-modal-listener', 'true');
            
            // Attach event listener to the parent (event delegation)
            // This will work for all current and future project items
            projectList.addEventListener("click", function (e) {
                // Find the closest project item
                const projectItem = e.target.closest("[data-project-id]");
                if (projectItem) {
                    const projectId = projectItem.dataset.projectId;
                    const modal = document.querySelector(`[data-project-modal="${projectId}"]`);

                    if (modal) {
                        e.preventDefault();
                        e.stopPropagation();
                        modal.style.display = "block";
                        toggleProjectModal();
                    }
                }
            });
        }

        // Close modal when clicking ANY close button
        // Use event delegation on document to catch all close buttons (including dynamically added ones)
        if (!window.projectModalCloseHandlersAttached) {
            document.addEventListener("click", function(e) {
                if (e.target.closest(".project-modal-close-btn")) {
                    closeAllModals();
                }
            });

            // Close modal when clicking overlay
            projectOverlay.addEventListener("click", function () {
                closeAllModals();
            });

            // Close modal with ESC key
            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape" && projectModalContainer.classList.contains("active")) {
                    closeAllModals();
                }
            });
            
            window.projectModalCloseHandlersAttached = true;
        }
    }
};

// Initialize project modals
window.initProjectModals();

// Levels toggle functionality - Using event delegation for dynamically created buttons
if (!window.levelsToggleInitialized) {
    // Use event delegation on document to catch all toggle buttons (including dynamically added ones)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.levels-toggle-btn')) {
            const btn = e.target.closest('.levels-toggle-btn');
            btn.classList.toggle('active');
            const levelsSection = btn.nextElementSibling;
            if (levelsSection && levelsSection.classList.contains('project-levels-section')) {
                levelsSection.classList.toggle('active');
            }
        }
    });
    
    window.levelsToggleInitialized = true;
    console.log('✅ Levels toggle functionality initialized');
}

    
