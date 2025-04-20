/*
 * Certificate Helper Script
 * 
 * This script helps you add certificates to your portfolio by:
 * 1. Providing a function to update certificate placeholders with actual images
 * 2. Adding click functionality to certificate cards
 * 
 * Usage:
 * - Call addCertificate() for each certificate you want to add
 * - The function will replace placeholders with actual certificate images
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize certificates if any are already defined
    initializeCertificates();
    
    // Add click event listeners to certificate cards
    const certCards = document.querySelectorAll('.certification__card');
    certCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the click was on the link, don't do anything (let the link handle it)
            if (e.target.closest('.certification__link')) return;
            
            // Otherwise, toggle the expanded class
            this.classList.toggle('certification__card--expanded');
            
            // Check if we have an image container in this card
            const imgContainer = this.querySelector('.certification__img-container');
            if (imgContainer && imgContainer.querySelector('img')) {
                const img = imgContainer.querySelector('img');
                
                // If this card is now expanded and we haven't created a large view yet
                if (this.classList.contains('certification__card--expanded') && !document.querySelector('.certificate-large-view')) {
                    openLargeView(img.src, img.alt);
                }
            }
        });
    });
    
    // Close large view when clicking outside the image
    document.addEventListener('click', function(e) {
        const largeView = document.querySelector('.certificate-large-view');
        if (largeView && !e.target.closest('.certificate-large-view__container') && !e.target.closest('.certification__card')) {
            closeLargeView();
        }
    });
    
    // Close large view when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.certificate-large-view')) {
            closeLargeView();
        }
    });
});

/**
 * Initialize certificates from any that might be defined in the HTML
 */
function initializeCertificates() {
    // You can add custom initialization logic here
    console.log('Certificate section initialized');
}

/**
 * Open a large view of the certificate
 * 
 * @param {string} imageSrc - Path to the certificate image
 * @param {string} imageAlt - Alt text for the image
 */
function openLargeView(imageSrc, imageAlt) {
    // Create the large view container
    const largeView = document.createElement('div');
    largeView.className = 'certificate-large-view';
    
    // Create the content container
    const container = document.createElement('div');
    container.className = 'certificate-large-view__container';
    
    // Create the image
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt || 'Certificate';
    img.className = 'certificate-large-view__img';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'certificate-large-view__close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeLargeView);
    
    // Assemble the components
    container.appendChild(img);
    container.appendChild(closeBtn);
    largeView.appendChild(container);
    
    // Add to the document
    document.body.appendChild(largeView);
    
    // Prevent scrolling on the body while large view is open
    document.body.style.overflow = 'hidden';
    
    // Add animation class after a short delay (for transition effect)
    setTimeout(() => {
        largeView.classList.add('certificate-large-view--active');
    }, 10);
}

/**
 * Close the large view
 */
function closeLargeView() {
    const largeView = document.querySelector('.certificate-large-view');
    
    if (largeView) {
        // Remove the active class first (for transition)
        largeView.classList.remove('certificate-large-view--active');
        
        // Wait for transition to complete before removing from DOM
        setTimeout(() => {
            document.body.removeChild(largeView);
            document.body.style.overflow = '';
        }, 300); // Match this with the CSS transition time
    }
}

/**
 * Add a certificate to the portfolio
 * 
 * @param {Object} certData - Certificate data
 * @param {string} certData.title - Certificate title
 * @param {string} certData.issuer - Certificate issuer
 * @param {string} certData.date - Issue date
 * @param {string} certData.id - Credential ID
 * @param {string} certData.link - URL to view the certificate
 * @param {string} certData.image - Path to certificate image
 * @param {number} [certData.index=0] - Index of the certificate card to update (0-based)
 */
function addCertificate(certData) {
    // Get certificate cards
    const certCards = document.querySelectorAll('.certification__card');
    
    // Get the card to update (default to first one if index is invalid)
    const index = certData.index || 0;
    const card = certCards[index] || certCards[0];
    
    if (!card) {
        console.error('No certificate cards found in the document');
        return;
    }
    
    // Update certificate information
    if (certData.title) {
        const titleEl = card.querySelector('.certification__title');
        if (titleEl) titleEl.textContent = certData.title;
    }
    
    if (certData.issuer) {
        const issuerEl = card.querySelector('.certification__issuer');
        if (issuerEl) issuerEl.textContent = 'Issuer: ' + certData.issuer;
    }
    
    if (certData.date) {
        const dateEl = card.querySelector('.certification__date');
        if (dateEl) dateEl.textContent = 'Issued: ' + certData.date;
    }
    
    if (certData.id) {
        const idEl = card.querySelector('.certification__id');
        if (idEl) idEl.textContent = 'Credential ID: ' + certData.id;
    }
    
    if (certData.link) {
        const linkEl = card.querySelector('.certification__link');
        if (linkEl) linkEl.href = certData.link;
    }
    
    // Replace placeholder with actual image if image path is provided
    if (certData.image) {
        const placeholder = card.querySelector('.certification__placeholder');
        if (placeholder) {
            // Create image container and image
            const imgContainer = document.createElement('div');
            imgContainer.className = 'certification__img-container';
            
            const img = document.createElement('img');
            img.src = certData.image;
            img.alt = certData.title || 'Certificate';
            img.className = 'certification__img';
            
            // Add image to container
            imgContainer.appendChild(img);
            
            // Replace placeholder with image container
            placeholder.parentNode.replaceChild(imgContainer, placeholder);
        }
    }
}

/* 
 * Example usage:
 * 
 * addCertificate({
 *     title: 'Web Development Fundamentals',
 *     issuer: 'Coursera',
 *     date: 'January 2024',
 *     id: 'WD-2024-12345',
 *     link: 'https://example.com/certificate',
 *     image: 'assets/img/certificates/web-dev-cert.jpg',
 *     index: 0  // Replace first certificate card (optional)
 * });
 */ 