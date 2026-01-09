import SwiftUI

// Color palette matching the original design
struct ADHDColors {
    // Base colors
    static let background = Color(hex: "E6D5CC")
    static let cardBackground = Color(hex: "FDF9F7")
    static let cardBackgroundNoticed = Color(hex: "F3EBE6")
    
    // Text colors
    static let primaryText = Color(hex: "5C3A3A")
    static let secondaryText = Color(hex: "9C7A70")
    static let tertiaryText = Color(hex: "C9B6AD")
    static let labelText = Color(hex: "8A6A60")
    
    // Accent colors
    static let accent = Color(hex: "EFA896")
    static let accentDark = Color(hex: "E08D79")
    
    // UI element colors
    static let pillBackground = Color(hex: "EEE6E1")
    static let divider = Color(hex: "D6CFC7")
    static let innerCardBg = Color(hex: "F9F3EF")
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// Shadow modifiers for neumorphic design
struct NeumorphicStyle: ViewModifier {
    var isPressed: Bool = false
    var isNoticed: Bool = false
    
    func body(content: Content) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 32)
                    .fill(isNoticed ? ADHDColors.cardBackgroundNoticed : ADHDColors.cardBackground)
                    .shadow(color: Color.black.opacity(isPressed ? 0 : 0.08), radius: isPressed ? 4 : 8, x: isPressed ? 2 : 8, y: isPressed ? 2 : 8)
                    .shadow(color: Color.white.opacity(isPressed ? 0 : 0.8), radius: isPressed ? 4 : 8, x: isPressed ? -2 : -8, y: isPressed ? -2 : -8)
            )
    }
}

struct InnerNeumorphicStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(ADHDColors.innerCardBg)
                    .shadow(color: Color.black.opacity(0.05), radius: 3, x: 3, y: 3)
                    .shadow(color: Color.white, radius: 3, x: -3, y: -3)
            )
    }
}

extension View {
    func neumorphic(isPressed: Bool = false, isNoticed: Bool = false) -> some View {
        modifier(NeumorphicStyle(isPressed: isPressed, isNoticed: isNoticed))
    }
    
    func innerNeumorphic() -> some View {
        modifier(InnerNeumorphicStyle())
    }
}
