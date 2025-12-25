document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');
    const burgerMenu = document.getElementById('burgerMenu');
    const navList = document.getElementById('navList');
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const cookieSettings = document.getElementById('cookieSettings');
    const cookieSettingsPanel = document.getElementById('cookieSettingsPanel');
    const cookieSave = document.getElementById('cookieSave');
    const navArticles = document.querySelector('.nav-articles');

    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 1000);
    }

    if (burgerMenu && navList) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navList.classList.toggle('active');
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            burgerMenu.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !navList.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navList.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (navArticles) {
        const navArticlesLink = navArticles.querySelector('.nav-link');
        navArticlesLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navArticles.classList.toggle('active');
            }
        });
    }

    if (cookieBanner) {
        const cookieConsent = localStorage.getItem('cookieConsent');
        const isHomePage = window.location.pathname.endsWith('home.html') || 
                          window.location.pathname.endsWith('/') ||
                          window.location.pathname === '' ||
                          !window.location.pathname.includes('.html');

        if (!cookieConsent && isHomePage) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 500);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                localStorage.setItem('cookiePreferences', JSON.stringify({
                    essential: true,
                    analytics: true,
                    marketing: true
                }));
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 400);
            });
        }

        if (cookieReject) {
            cookieReject.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'rejected');
                localStorage.setItem('cookiePreferences', JSON.stringify({
                    essential: true,
                    analytics: false,
                    marketing: false
                }));
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 400);
            });
        }

        if (cookieSettings) {
            cookieSettings.addEventListener('click', function() {
                cookieSettingsPanel.style.display = 
                    cookieSettingsPanel.style.display === 'none' ? 'block' : 'none';
            });
        }

        if (cookieSave) {
            cookieSave.addEventListener('click', function() {
                const preferences = {
                    essential: true,
                    analytics: document.getElementById('analyticsCookies').checked,
                    marketing: document.getElementById('marketingCookies').checked
                };
                localStorage.setItem('cookieConsent', 'custom');
                localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 400);
            });
        }
    }

    const navLinks = document.querySelectorAll('.nav-link, .article-link, .cta-link, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                if (pageLoader) {
                    pageLoader.classList.remove('hidden');
                }
            }
        });
    });

    window.addEventListener('pageshow', function(event) {
        if (pageLoader) {
            if (event.persisted) {
                pageLoader.classList.add('hidden');
            } else {
                setTimeout(() => {
                    pageLoader.classList.add('hidden');
                }, 500);
            }
        }
    });

    window.addEventListener('popstate', function() {
        if (pageLoader) {
            pageLoader.classList.remove('hidden');
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 300);
        }
    });

    window.addEventListener('load', function() {
        if (pageLoader) {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 500);
        }
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
});
