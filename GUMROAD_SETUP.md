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

1. Make a test purchase of your Gumroad product
2. Copy the license key from your confirmation email
3. Visit your site and enter the license key
4. Verify you can access the content

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

- **check-license.js** - Runs on app load, verifies existing licenses
- **license.html** - License key entry page UI
- **license.js** - Handles license verification and form submission
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

**"Invalid license key" error:**
- Verify the product ID matches your Gumroad product
- Check that license key generation is enabled in Gumroad
- Ensure the customer copied the full license key

**License verification fails:**
- Check browser console for API errors
- Verify Gumroad API is accessible (not blocked by firewall/adblocker)
- Test the Gumroad API directly: https://api.gumroad.com/v2/licenses/verify

**Users can't access after clearing browser data:**
- This is expected behavior - they need to re-enter their license key
- The key is verified with Gumroad, so it will work again
