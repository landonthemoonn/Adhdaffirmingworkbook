// ADHDkit License Verification
// This checks if a valid license key is stored, and if not, prompts for one

const PRODUCT_ID = 'E80jP2nNTqprQeyJMK4BT~A==';
const LICENSE_KEY = 'adhdkit_license';

// Check if we already have a valid license
async function checkExistingLicense() {
    const storedLicense = localStorage.getItem(LICENSE_KEY);

    if (storedLicense) {
        // Verify it's still valid
        const result = await verifyLicense(storedLicense);
        if (result.valid) {
            // Update last verified timestamp
            localStorage.setItem('adhdkit_last_verified', Date.now().toString());
            // Redirect to main app
            window.location.href = 'index.html';
        } else {
            // Invalid/expired, clear it
            localStorage.removeItem(LICENSE_KEY);
            localStorage.removeItem('adhdkit_last_verified');
            console.log('Stored license is invalid:', result.message);
        }
    }
}

// Verify license key with Gumroad
async function verifyLicense(licenseKey) {
    try {
        console.log('Verifying license with Product ID:', PRODUCT_ID);
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
        console.log('Gumroad API Response:', data);

        // Gumroad returns success: true if valid
        if (data.success === true) {
            return { valid: true, data };
        } else {
            return { valid: false, message: data.message || 'Invalid license key', data };
        }
    } catch (error) {
        console.error('License verification error:', error);
        return { valid: false, message: `Network error: ${error.message}` };
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
    const result = await verifyLicense(licenseKey);

    if (result.valid) {
        // Save to localStorage
        localStorage.setItem(LICENSE_KEY, licenseKey);
        localStorage.setItem('adhdkit_last_verified', Date.now().toString());

        // Show success message
        showMessage('✓ License verified! Redirecting...', 'success');

        // Redirect after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Show error with specific message
        const errorMsg = result.message || 'Invalid license key. Please check your email and try again.';
        showMessage(`✗ ${errorMsg}\n\nTroubleshooting:\n• Make sure you copied the full license key\n• Check that license generation is enabled on Gumroad\n• Try the test page: test-license.html`, 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verify License';
    }
});

// Check for existing license when page loads
checkExistingLicense();