# Gumroad License Setup Guide

This application uses Gumroad licensing to protect access to the ADHDkit workbook. Users must enter a valid license key purchased from Gumroad to access the content.

## How It Works

1. When users visit the site, `check-license.js` runs immediately
2. If no license is found, they're redirected to `license.html`
3. Users enter their Gumroad license key
4. The key is verified against the Gumroad API
5. Valid licenses are stored in localStorage
6. License is re-verified every 24 hours to catch refunds/expirations
7. If verification fails due to network issues, access is allowed for up to 7 days

## Gumroad Product Setup

### 1. Create Your Gumroad Product

1. Go to [Gumroad](https://gumroad.com) and create a new product
2. Set your price and product details
3. Enable "Generate license keys for customers" in product settings
4. After creating the product, note your **Product ID**

### 2. Get Your Product ID

Your product ID is already configured in the code:
- **Current Product ID**: `E80jP2nNTqprQeyJMK4BT~A==`

If you need to change it:
1. Find your product ID in your Gumroad product settings
2. Update it in two places:
   - `license.js` (line 4)
   - `check-license.js` (line 4)

### 3. Test the License System

**Using the Test Page (Recommended):**
1. Visit `test-license.html` in your browser (e.g., `http://localhost:5173/test-license.html` or `https://yoursite.com/test-license.html`)
2. First, test API connectivity using the "Test Gumroad API" button
3. If API is reachable, make a test purchase of your Gumroad product
4. Copy the license key from your confirmation email
5. Paste it in the "Test License Key" section and click "Test License"
6. The test page will show you detailed information about what's happening

**Manual Testing:**
1. Make a test purchase of your Gumroad product
2. Copy the license key from your confirmation email
3. Visit your site at `license.html`
4. Enter the license key
5. Open browser console (F12) to see detailed logs
6. Verify you can access the content

### 4. Important Notes

- **License keys are validated server-side** by Gumroad's API
- **Re-verification happens every 24 hours** to catch refunds and expirations
- **Offline grace period**: 7 days if verification fails due to network issues
- License keys are stored in browser localStorage
- Clearing browser data will require users to re-enter their key

## Security Features

✅ Server-side validation with Gumroad API
✅ Automatic re-verification every 24 hours
✅ Handles refunded/expired licenses
✅ Network error fallback (7-day grace period)
✅ Clean redirect flow for unauthorized access

## Files Involved

- **public/check-license.js** - Runs on app load, verifies existing licenses
- **public/license.html** - License key entry page UI
- **public/license.js** - Handles license verification and form submission
- **public/test-license.html** - Diagnostic tool for testing licensing setup
- **index.html** - Main app entry point, includes check-license.js

## Customization

### Update Product ID
Edit both `license.js` and `check-license.js`:
```javascript
const PRODUCT_ID = 'your-product-id-here';
```

### Change Verification Interval
Edit `check-license.js`:
```javascript
const VERIFICATION_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
```

### Adjust Grace Period
Edit `check-license.js`:
```javascript
if (lastVerified && (now - parseInt(lastVerified)) < (7 * 24 * 60 * 60 * 1000)) {
  // Change 7 to desired number of days
}
```

## Support Email

The license page includes a support link to: `support@adhdkit.online`

Make sure this email is set up to handle customer support inquiries about license keys.

## Troubleshooting

### Step 1: Use the Test Page
Visit `test-license.html` to diagnose issues. This page provides:
- API connectivity testing
- Detailed error messages from Gumroad
- Storage inspection
- Product ID configuration

### Common Issues

**"Invalid license key" error:**
1. **Check Product ID**: Make sure the Product ID in the code matches your Gumroad product
   - Open browser console and look for `Verifying license with Product ID:`
   - Compare it to your product ID in Gumroad dashboard
   - Update both `public/license.js` and `public/check-license.js` if needed
2. **License generation not enabled**:
   - Go to your Gumroad product settings
   - Scroll to "License keys" section
   - Enable "Generate license keys for customers"
3. **Incomplete license key**: Ensure the full key was copied (no spaces or missing characters)

**License verification fails:**
1. **Check API connectivity**: Use the test page's "Test Gumroad API" button
2. **Browser console errors**: Open DevTools (F12) and check the Console tab for detailed error messages
3. **CORS issues**: The current implementation uses URL-encoded format to avoid CORS. If you see CORS errors:
   - Make sure you're using `Content-Type: application/x-www-form-urlencoded`
   - Verify you're using `URLSearchParams` (already implemented)
4. **Ad blockers**: Some ad blockers may interfere with API calls. Try disabling temporarily.

**Wrong Product ID:**
If your Product ID is not `E80jP2nNTqprQeyJMK4BT~A==`:
1. Find your correct Product ID in Gumroad dashboard (usually under product permalink)
2. Update it in:
   - `public/license.js` line 4: `const PRODUCT_ID = 'your-id-here';`
   - `public/check-license.js` line 4: `const PRODUCT_ID = 'your-id-here';`
3. Rebuild the app: `npm run build`

**Users can't access after clearing browser data:**
- This is expected behavior - they need to re-enter their license key
- The key is verified with Gumroad, so it will work again

### Debugging Steps

1. **Test API First**: Use `test-license.html` to verify Gumroad API is reachable
2. **Check Console Logs**: The license verification logs detailed info to browser console
3. **Verify Product Setup**: Make sure license key generation is enabled in Gumroad
4. **Test with Real Key**: Make a test purchase and use the real license key
5. **Check Product ID Match**: Ensure your code uses the correct Product ID from Gumroad

### Getting Your Gumroad Product ID

1. Log into your Gumroad account
2. Go to your product page
3. The Product ID is in the product's permalink/URL or in the API settings
4. It usually looks like: `xxxxxxxxxxxx==` (base64 encoded string)
