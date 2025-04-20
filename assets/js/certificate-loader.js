/*
 * Certificate Loader Script
 * 
 * This script loads your certificates from the assets/img/certificates folder
 */

// Add all certificates with proper information
document.addEventListener('DOMContentLoaded', function() {
    // Wait for certificate.js to initialize
    setTimeout(() => {
        // Algorithm Specialization by Stanford University
        addCertificate({
            title: 'Algorithm Specialization',
            issuer: 'Stanford University - Coursera',
            date: 'January - May 2024',
            id: 'ALGO-STANFORD-2024',
            link: '#',
            image: 'assets/img/certificates/algorithms_page-0001.jpg',
            index: 0
        });

        // Server-side JavaScript with Node.js
        addCertificate({
            title: 'Server-side JavaScript with Node.js',
            issuer: 'Coursera',
            date: 'April - June 2024',
            id: 'NODE-JS-2024',
            link: '#',
            image: 'assets/img/certificates/serverside_page-0001.jpg',
            index: 1
        });
        
        // Cloud Computing - NPTEL
        addCertificate({
            title: 'Cloud Computing',
            issuer: 'NPTEL',
            date: 'July - November 2024',
            id: 'CLOUD-NPTEL-2024',
            link: '#',
            image: 'assets/img/certificates/NPTEl_page-0001.jpg',
            index: 2
        });

        // Building Web Applications in PHP
        addCertificate({
            title: 'Building Web Applications in PHP',
            issuer: 'Coursera',
            date: 'November - December 2024',
            id: 'PHP-WEB-2024',
            link: '#',
            image: 'assets/img/certificates/webphp_page-0001.jpg',
            index: 3
        });

        console.log('Certificates loaded successfully!');
    }, 100);
}); 