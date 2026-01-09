import SwiftUI

struct DayCard: View {
    let day: DayData
    @Binding var isNoticed: Bool
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header with day badge and toggle
            HStack {
                // Day badge
                Text("Day \(day.day)")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(isNoticed ? ADHDColors.tertiaryText : Color(hex: "BFA69C"))
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(
                        Capsule()
                            .fill(isNoticed ? ADHDColors.pillBackground : Color(hex: "F3EBE6"))
                            .overlay(
                                Capsule()
                                    .stroke(Color.white.opacity(0.4), lineWidth: 1)
                            )
                    )
                
                Spacer()
                
                // Toggle button
                Button(action: {
                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                        isNoticed.toggle()
                    }
                }) {
                    HStack(spacing: 8) {
                        Image(systemName: isNoticed ? "checkmark.circle.fill" : "circle")
                            .font(.system(size: 16, weight: .bold))
                        Text(isNoticed ? "Noticed" : "Mark Noticed")
                            .font(.system(size: 12, weight: .bold))
                    }
                    .foregroundColor(ADHDColors.secondaryText)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .background(
                        Capsule()
                            .fill(ADHDColors.pillBackground)
                            .shadow(color: Color.black.opacity(isNoticed ? 0.1 : 0), radius: 2, x: 2, y: 2)
                            .shadow(color: Color.white.opacity(isNoticed ? 0 : 0.8), radius: 2, x: -2, y: -2)
                    )
                }
                .buttonStyle(PlainButtonStyle())
            }
            .padding(.bottom, 24)
            
            // Title
            Text(day.title)
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(isNoticed ? ADHDColors.tertiaryText : ADHDColors.primaryText)
                .padding(.bottom, 12)
            
            // Why
            Text(day.why)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(isNoticed ? ADHDColors.tertiaryText.opacity(0.8) : ADHDColors.secondaryText)
                .lineSpacing(4)
                .padding(.bottom, 32)
            
            // Micro action box
            VStack(alignment: .leading, spacing: 8) {
                Text("MICRO-ACTION")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(ADHDColors.tertiaryText)
                    .tracking(1.5)
                
                Text(day.microAction)
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(isNoticed ? ADHDColors.tertiaryText : ADHDColors.primaryText)
            }
            .padding(24)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(isNoticed ? ADHDColors.cardBackgroundNoticed.opacity(0.4) : Color(hex: "F9F3EF"))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.white.opacity(isNoticed ? 0 : 0.5), lineWidth: 1)
                    )
                    .shadow(color: Color.black.opacity(isNoticed ? 0 : 0.05), radius: 3, x: 3, y: 3)
                    .shadow(color: Color.white.opacity(isNoticed ? 0 : 1), radius: 3, x: -3, y: -3)
            )
            .padding(.bottom, 20)
            
            // Bonus action
            if let bonusAction = day.bonusAction {
                VStack(alignment: .leading, spacing: 4) {
                    Text("IF YOU HAVE ENERGY")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    Text(bonusAction)
                        .font(.system(size: 14, weight: .medium))
                        .italic()
                        .foregroundColor(isNoticed ? ADHDColors.tertiaryText : ADHDColors.secondaryText)
                }
                .padding(.horizontal, 8)
            }
        }
        .padding(32)
        .frame(maxWidth: .infinity, alignment: .leading)
        .neumorphic(isNoticed: isNoticed)
    }
}
