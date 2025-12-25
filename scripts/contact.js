document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;

            let isValid = true;
            clearErrors();

            if (!name) {
                showError('name', 'Name is required');
                isValid = false;
            }

            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            if (!message) {
                showError('message', 'Message is required');
                isValid = false;
            }

            if (!privacy) {
                showError('privacy', 'You must agree to the Privacy Policy');
                isValid = false;
            }

            if (isValid) {
                formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.setAttribute('role', 'alert');
                form.reset();
                
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }
        });

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();

        if (field.hasAttribute('required') && !value) {
            showError(fieldName, 'This field is required');
            return false;
        }

        if (fieldName === 'email' && value && !isValidEmail(value)) {
            showError(fieldName, 'Please enter a valid email address');
            return false;
        }

        clearError(fieldName);
        return true;
    }

    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (field) {
            field.setAttribute('aria-invalid', 'true');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (field) {
            field.removeAttribute('aria-invalid');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.removeAttribute('aria-invalid');
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
