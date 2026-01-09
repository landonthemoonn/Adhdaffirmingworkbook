# ADHDkit - SwiftUI Version

A beautiful, ADHD-affirming productivity app built with SwiftUI for iOS and macOS.

## About

This is a SwiftUI port of the original web-based ADHD-Affirming Productivity Worksheet. It maintains the same beautiful clay-style neumorphic design and gentle, supportive approach to executive function support.

## Features

### Core Regulation & Safety
- **Emotional Weather**: Identifying and riding out the waves of rejection sensitivity
- **Nervous System Reset**: Micro-regulation tools for when everything feels too loud
- **Shame Detox**: Name and reframe the internalized narratives holding you back

### Executive Function
- **Gentle Habit System**: A 20-day support system with micro-actions (fully implemented!)
- **Home Reset**: Low-pressure weekly maintenance
- **Work Styles**: Recognize your preferred working style without judgment
- **Task Initiation Lab**: Start-only rituals and dopamine pairing to break paralysis

### Body & Brain Care
- **Daily Care**: A flexible check-in system
- **Energy Mapping**: Track capacity, not productivity. Permission to rest
- **Sleep Sanctuary**: Rituals to transition from high-alert to rest mode

## Getting Started

### Requirements
- Xcode 15 or later
- iOS 17+ or macOS 14+
- Swift 5.9+

### Opening the Project

1. Open the project in Xcode:
   ```bash
   open ADHDkit.swiftpm
   ```

2. Select your target device (iOS or macOS)

3. Press `⌘+R` to build and run

### Project Structure

```
ADHDkit.swiftpm/
├── App.swift                    # Main app entry point
├── ContentView.swift            # Root view with navigation
├── Theme.swift                  # Color palette and neumorphic styles
├── Models/
│   ├── DayData.swift           # Data model for habit days
│   └── WorkbookInfo.swift      # Workbook metadata
├── Views/
│   ├── BackgroundView.swift    # Animated gradient background
│   ├── DashboardView.swift     # Main dashboard
│   ├── Components/
│   │   ├── WorkbookCard.swift  # Clickable workbook cards
│   │   ├── DayCard.swift       # Day progress cards
│   │   └── WorkbookComponents.swift  # Shared UI components
│   └── Workbooks/
│       ├── GentleHabitSystemView.swift  # 20-day habit tracker
│       └── [Other workbook views...]    # Additional workbooks
```

## Design Philosophy

The SwiftUI version stays true to the original design:

- **Neumorphic UI**: Soft, clay-like buttons and cards with subtle shadows
- **Warm Color Palette**: Calming earth tones (#E6D5CC, #EFA896, #5C3A3A)
- **Smooth Animations**: Spring-based transitions for a gentle feel
- **No Pressure**: "Just noticing is enough" - progress without guilt

## Implementation Status

✅ **Completed**
- Dashboard with all workbook cards
- Gentle Habit System (fully functional with 20 days)
- Neumorphic design system
- Smooth navigation and animations
- Day tracking with toggle states

🚧 **In Progress**
- Additional workbook content
- Data persistence (UserDefaults/CoreData)
- Quick Add modal
- Print/export functionality

## Customization

### Colors

Edit `Theme.swift` to customize the color palette:

```swift
struct ADHDColors {
    static let accent = Color(hex: "EFA896")
    static let primaryText = Color(hex: "5C3A3A")
    // ... customize more colors
}
```

### Adding Content

To add content to placeholder workbooks, create views similar to `GentleHabitSystemView.swift` with your own data models.

## Key Differences from Web Version

- Uses native SwiftUI components instead of React
- SF Symbols for icons (instead of Lucide icons)
- Native iOS/macOS gestures and interactions
- Potential for Apple Watch companion app
- iCloud sync capability (future)

## Contributing

This is a port of the original design. To maintain consistency:
1. Keep the neumorphic design language
2. Use the established color palette
3. Maintain the gentle, supportive tone
4. Prioritize simplicity over features

## Credits

Original web design: [ADHD-Affirming Productivity Worksheet](https://www.figma.com/design/4PC02oV3fPcv9vCFsCEnmi/ADHD-Affirming-Productivity-Worksheet)

SwiftUI port: Built with care for the ADHD community

## License

See the main repository for license information.

---

**Take what you need. Leave the rest.** 💙
