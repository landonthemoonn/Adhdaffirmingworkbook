# 🚀 Quick Start Guide

## Opening in Xcode

1. **Navigate to the SwiftUI folder:**
   ```bash
   cd SwiftUI
   ```

2. **Open in Xcode:**
   ```bash
   open ADHDkit.swiftpm
   ```

3. **Select your target:**
   - For iPhone: Choose any iPhone simulator (iOS 17+)
   - For Mac: Choose "My Mac (Designed for iPad)" or "My Mac"

4. **Run the app:**
   - Press `⌘+R` or click the Play button
   - The app will build and launch

## What's Included

### ✅ Fully Functional
- **Dashboard**: Beautiful main screen with all workbooks
- **Gentle Habit System**: Complete 20-day tracker with:
  - All 20 days of micro-actions
  - Toggle to mark days as "noticed"
  - Neumorphic card design
  - Smooth animations

### 🎨 Design Features
- **Neumorphic UI**: Soft, clay-like cards with depth
- **Warm Colors**: Calming earth tones matching the original
- **Smooth Animations**: Spring-based transitions
- **Responsive**: Works on iPhone, iPad, and Mac

### 📋 Workbook Structure
All 10 workbooks are accessible:
1. Emotional Weather
2. Nervous System Reset  
3. Shame Detox
4. **Gentle Habit System** (fully implemented)
5. Home Reset
6. Work Styles
7. Task Initiation Lab
8. Daily Care
9. Energy Mapping
10. Sleep Sanctuary

## Customizing

### Change Colors
Edit `Theme.swift`:
```swift
static let accent = Color(hex: "EFA896") // Change this!
```

### Add Content
Look at `GentleHabitSystemView.swift` as a template for adding content to other workbooks.

## Tips

- The app uses UserDefaults-ready architecture (easy to add persistence)
- SF Symbols are used for all icons
- Each view is independent and easy to customize
- The design system is in `Theme.swift` for consistency

## Next Steps

To complete the other workbooks:
1. Create data models (like `DayData.swift`)
2. Add content to the placeholder views
3. Reuse the `DayCard` component or create new ones

**Enjoy building! Take what you need. Leave the rest.** 💙
