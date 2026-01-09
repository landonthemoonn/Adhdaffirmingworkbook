import SwiftUI

struct CareOptionButton: View {
    let option: String
    let theme: CareTheme
    let isCompleted: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                onTap()
            }
        }) {
            HStack(spacing: 12) {
                Image(systemName: isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(isCompleted ? theme.color : ADHDColors.secondaryText.opacity(0.4))
                
                Text(option)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(isCompleted ? ADHDColors.tertiaryText : ADHDColors.primaryText)
                    .strikethrough(isCompleted, color: ADHDColors.tertiaryText)
                
                Spacer()
            }
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(isCompleted ? theme.lightColor.opacity(0.3) : Color.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.white.opacity(0.6), lineWidth: 1)
                    )
                    .shadow(color: Color.black.opacity(isCompleted ? 0.02 : 0.05), radius: 4, x: 4, y: 4)
                    .shadow(color: Color.white.opacity(isCompleted ? 0.3 : 0.8), radius: 4, x: -4, y: -4)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
