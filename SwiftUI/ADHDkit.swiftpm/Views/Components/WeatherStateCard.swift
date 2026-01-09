import SwiftUI

struct WeatherStateCard: View {
    let state: WeatherState
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 16) {
                // Icon
                HStack {
                    ZStack {
                        Circle()
                            .fill(state.gradient)
                            .frame(width: 60, height: 60)
                            .overlay(
                                Circle()
                                    .stroke(Color.white.opacity(0.5), lineWidth: 2)
                            )
                        
                        Image(systemName: state.iconName)
                            .font(.system(size: 28, weight: .semibold))
                            .foregroundColor(.white)
                    }
                    
                    Spacer()
                    
                    if isSelected {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 24))
                            .foregroundColor(Color(hex: "10B981"))
                    }
                }
                
                // Label
                Text(state.label)
                    .font(.system(size: 22, weight: .bold))
                    .foregroundColor(isSelected ? ADHDColors.primaryText : ADHDColors.primaryText)
                
                // Description
                Text(state.description)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(ADHDColors.secondaryText)
                    .lineSpacing(3)
                
                // Thoughts
                Text(state.thoughts)
                    .font(.system(size: 14, weight: .medium))
                    .italic()
                    .foregroundColor(ADHDColors.secondaryText.opacity(0.8))
                    .padding(.vertical, 8)
                
                // Reminder
                VStack(alignment: .leading, spacing: 6) {
                    Text("REMEMBER")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    Text(state.reminder)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(ADHDColors.primaryText)
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(ADHDColors.innerCardBg)
                )
            }
            .padding(28)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 32)
                    .fill(isSelected ? ADHDColors.cardBackground : Color.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 32)
                            .stroke(isSelected ? Color(hex: "10B981").opacity(0.5) : Color.clear, lineWidth: 3)
                    )
                    .shadow(color: Color.black.opacity(0.08), radius: 8, x: 8, y: 8)
                    .shadow(color: Color.white.opacity(0.8), radius: 8, x: -8, y: -8)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
