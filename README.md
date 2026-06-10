# 🍽️ Clovis Hotel - Food Ordering Website

A complete web-based food ordering system for Clovis Hotel with WhatsApp integration and QR code generation.

## ✨ Features

✅ **Customer Ordering Interface**
- Browse all food items with descriptions and prices
- Filter by category (Main Course, Beverages, Appetizers, etc.)
- Select quantities and add items to order
- Beautiful, responsive design
- Real-time order summary

✅ **WhatsApp Integration**
- Send orders directly to waiter via WhatsApp
- Formatted order message with items, quantities, and total price
- One-click ordering with automatic WhatsApp opening

✅ **Admin Panel**
- Manage food menu (add, edit, delete items)
- Update prices and descriptions
- Change waiter WhatsApp number
- Add advertisement banners
- Manage food categories

✅ **QR Code Generation**
- Generate QR code linking to your ordering page
- Download QR code as PNG image
- Print-friendly QR code for tables
- Easy sharing with customers

✅ **Data Persistence**
- All data saved to browser's local storage
- Menu items persist across page reloads
- Settings automatically saved

## 🚀 How to Host

### Option 1: GitHub Pages (Free & Easy)

1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Select "main" as the source branch
4. Save
5. Your site will be available at: `https://clovisangwa.github.io/clovis-hotel-ordering/`

### Option 2: Netlify (Free & Faster)

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select the `clovis-hotel-ordering` repository
5. Deploy!

### Option 3: Vercel (Free & Fast)

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Paste your repository URL
4. Deploy!

### Option 4: Your Own Server

Simply upload all files to your web server via FTP/SSH.

## 📱 QR Code Integration

### Generate Your QR Code

1. Open your hosted website
2. Click the "📱 QR Code" button in the navigation
3. A QR code will be generated linking to your menu
4. Click "⬇️ Download QR Code" to save as PNG

### Using the QR Code

1. Print the QR code
2. Place it on each table at Clovis Hotel
3. Customers scan with their phone camera
4. They're taken directly to your menu
5. Orders are sent to your WhatsApp

## 🔧 Admin Panel Usage

### Access Admin Panel

1. From the main menu, click "⚙️ Admin Panel"
2. Enter your admin area (password optional - add if needed)

### Add New Food Item

1. Fill in:
   - Food Name (e.g., "Ugali with Beans")
   - Price in FBU (e.g., 3000)
   - Category (e.g., "Main Course")
   - Description (e.g., "Delicious maize meal with beans")
   - Emoji/Icon (e.g., 🍝)
2. Click "Add Food Item"
3. Item appears immediately on the menu

### Edit Food Item

1. In "Edit or Delete Food Items" section
2. Click "✏️ Edit" on the item
3. Update any details
4. Changes are saved instantly

### Delete Food Item

1. Click "🗑️ Delete" on the item
2. Confirm deletion
3. Item is removed from menu

### Update WhatsApp Number

1. In the "Settings" section
2. Enter new waiter WhatsApp number
3. Click "Save Phone Number"
4. All future orders will go to this number

### Update Advertisement Banner

1. In the "Settings" section
2. Enter your advertisement text
3. Click "Save Advertisement"
4. Banner appears on customer ordering page

## 📝 Default Menu Items

- 🍝 Ugali with Beans - 3000 FBU
- 🍗 Rice and Chicken - 5000 FBU
- 🐟 Fish and Chips - 6000 FBU
- 🥤 Juice - 1500 FBU
- 🥃 Soda - 2000 FBU
- 🥟 Samosa - 1000 FBU

## 🛠️ Technical Details

- **Frontend**: HTML5, CSS3, JavaScript
- **Storage**: Browser LocalStorage
- **WhatsApp**: API integration via wa.me
- **QR Code**: QRCode.js library
- **Responsive**: Mobile-first design

## 📱 WhatsApp Integration

Waiter's current WhatsApp number: **0785277428**

To change:
1. Go to Admin Panel
2. Update the WhatsApp number
3. All future orders go to new number

## 🔒 Security Notes

- Phone numbers are stored in browser only
- No data sent to external servers
- Menu data persists locally
- All communication via WhatsApp Web

## 📧 Support

For issues or questions about your Clovis Hotel ordering system:
- Check the QR code and link generation features
- Ensure WhatsApp is installed on devices
- Test the order sending functionality
- Verify internet connection for WhatsApp

## 🎨 Customization

You can customize:
- Colors in `styles.css`
- Default menu in `app.js` and `admin.js`
- Add more categories in the admin panel
- Change logos and text in HTML files

## 📄 Files Structure

```
clovis-hotel-ordering/
├── index.html          # Main ordering page
├── admin.html          # Admin panel
├── qr.html             # QR code page
├── app.js              # Customer app logic
├── admin.js            # Admin panel logic
├── styles.css          # All styling
└── README.md           # This file
```

## 🚀 Next Steps

1. ✅ Host on GitHub Pages, Netlify, or Vercel
2. ✅ Generate QR code from your hosted site
3. ✅ Print and place QR codes on restaurant tables
4. ✅ Add your food menu via Admin Panel
5. ✅ Update waiter WhatsApp number
6. ✅ Start receiving orders!

## 📲 Mobile Friendly

The website is fully responsive and works on:
- Smartphones (iOS & Android)
- Tablets
- Desktop browsers

## 🎯 How It Works

1. **Customer** scans QR code on table
2. **Menu** loads on their phone
3. **Customer** selects food and quantities
4. **Customer** clicks "Send Order to Waiter"
5. **WhatsApp** opens with pre-filled order
6. **Waiter** receives order on phone
7. **Kitchen** prepares food

---

**Made with ❤️ for Clovis Hotel**
