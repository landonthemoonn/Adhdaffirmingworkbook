// ADHDkit License Verification
// This checks if a valid license key is stored, and if not, prompts for one

const PRODUCT_ID = 'E80jP2nNTqprQeyJMK4BT~A==';
const LICENSE_KEY = 'adhdkit_license';

// Check if we already have a valid license
async function checkExistingLicense() {
    const storedLicense = localStorage.getItem(LICENSE_KEY);
    
    if (storedLicense) {
        // Verify it's still valid
        const isValid = await verifyLicense(storedLicense);
        if (isValid) {
            // Redirect to main app
            window.location.href = 'index.html';
        } else {
            // Invalid/expired, clear it
            localStorage.removeItem(LICENSE_KEY);
        }
    }
}

// Verify license key with Gumroad
async function verifyLicense(licenseKey) {
    try {
        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'product_id': PRODUCT_ID,
                'license_key': licenseKey.trim()
            })
        });

        const data = await response.json();
        
        // Gumroad returns success: true if valid
        return data.success === true;
    } catch (error) {
        console.error('License verification error:', error);
        return false;
    }
}

// Show message to user
function showMessage(text, type = 'error') {
    const messageDiv = document.getElementById('message');
    messageDiv.className = type;
    messageDiv.textContent = text;
}

// Handle form submission
document.getElementById('licenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const licenseInput = document.getElementById('licenseKey');
    const submitBtn = document.getElementById('submitBtn');
    const licenseKey = licenseInput.value.trim();
    
    if (!licenseKey) {
        showMessage('Please enter a license key', 'error');
        return;
    }
    
    // Disable form while checking
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span>';
    document.getElementById('message').textContent = '';
    
    // Verify the license
    const isValid = await verifyLicense(licenseKey);
    
    if (isValid) {
        // Save to localStorage
        localStorage.setItem(LICENSE_KEY, licenseKey);
        
        // Show success message
        showMessage('✓ License verified! Redirecting...', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Show error
        showMessage('Invalid license key. Please check your email and try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verify License';
    }
});

// Check for existing license when page loads
checkExistingLicense();