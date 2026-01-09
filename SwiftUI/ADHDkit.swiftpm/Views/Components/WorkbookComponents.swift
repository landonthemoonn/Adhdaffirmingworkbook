import SwiftUI

// Reusable back button component
struct BackButton: View {
    let onBack: () -> Void
    
    var body: some View {
        Button(action: onBack) {
            HStack(spacing: 12) {
                ZStack {
                    Circle()
                        .fill(ADHDColors.pillBackground)
                        .frame(width: 48, height: 48)
                        .shadow(color: Color.black.opacity(0.1), radius: 4, x: 4, y: 4)
                        .shadow(color: Color.white.opacity(0.8), radius: 4, x: -4, y: -4)
                    
                    Image(systemName: "arrow.left")
                        .font(.system(size: 20, weight: .bold))
                        .foregroundColor(ADHDColors.secondaryText)
                }
                
                Text("BACK TO DASHBOARD")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(ADHDColors.secondaryText)
                    .tracking(1.5)
            }
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// Reusable workbook header
struct WorkbookHeader: View {
    let title: String
    let subtitle: String
    let description: String
    
    var body: some View {
        VStack(spacing: 24) {
            Text(title)
                .font(.system(size: 48, weight: .bold))
                .foregroundColor(ADHDColors.primaryText)
            
            Text(subtitle)
                .font(.system(size: 20, weight: .medium))
                .foregroundColor(ADHDColors.secondaryText)
            
            Text(description)
                .font(.system(size: 16, weight: .regular))
                .foregroundColor(ADHDColors.secondaryText.opacity(0.8))
        }
        .multilineTextAlignment(.center)
        .frame(maxWidth: 800)
        .frame(maxWidth: .infinity)
    }
}

// Placeholder content for incomplete workbooks
struct PlaceholderContent: View {
    let message: String
    
    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "doc.text")
                .font(.system(size: 64))
                .foregroundColor(ADHDColors.tertiaryText)
            
            Text(message)
                .font(.system(size: 20, weight: .medium))
                .foregroundColor(ADHDColors.secondaryText)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 80)
    }
}

// Reusable background for workbook views
struct WorkbookBackground: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 56)
            .fill(Color(hex: "F8F2EE"))
            .shadow(color: Color.black.opacity(0.4), radius: 40, x: 0, y: 40)
            .shadow(color: Color.black.opacity(0.2), radius: 20, x: 0, y: 20)
            .overlay(
                RoundedRectangle(cornerRadius: 56)
                    .stroke(Color.white.opacity(0.6), lineWidth: 1)
            )
    }
}
