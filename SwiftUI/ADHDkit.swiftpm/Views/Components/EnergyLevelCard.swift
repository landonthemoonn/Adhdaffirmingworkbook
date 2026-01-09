import SwiftUI

struct EnergyLevelCard: View {
    let level: EnergyLevel
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 16) {
                // Header
                HStack {
                    ZStack {
                        Circle()
                            .fill(level.color.opacity(0.2))
                            .frame(width: 60, height: 60)
                        
                        Image(systemName: level.iconName)
                            .font(.system(size: 28, weight: .semibold))
                            .foregroundColor(level.color)
                    }
                    
                    Spacer()
                    
                    // Energy percentage
                    VStack(alignment: .trailing, spacing: 4) {
                        Text("\(level.level)%")
                            .font(.system(size: 32, weight: .bold))
                            .foregroundColor(level.color)
                        
                        if isSelected {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 20))
                                .foregroundColor(Color(hex: "10B981"))
                        }
                    }
                }
                
                // Label
                Text(level.label)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(ADHDColors.primaryText)
                
                // Description
                Text(level.description)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(ADHDColors.secondaryText)
                    .lineSpacing(3)
                
                // Recommendation
                VStack(alignment: .leading, spacing: 8) {
                    Text("RECOMMENDATION")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    Text(level.recommendation)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(ADHDColors.primaryText)
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(level.color.opacity(0.1))
                )
                
                // Protocol
                VStack(alignment: .leading, spacing: 12) {
                    Text("PROTOCOL")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    ForEach(Array(level.protocol.enumerated()), id: \.offset) { index, item in
                        HStack(alignment: .top, spacing: 10) {
                            Text("\(index + 1).")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(level.color)
                            
                            Text(item)
                                .font(.system(size: 14, weight: .regular))
                                .foregroundColor(ADHDColors.secondaryText)
                        }
                    }
                }
                .padding(.horizontal, 8)
            }
            .padding(28)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 32)
                    .fill(isSelected ? level.color.opacity(0.05) : Color.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 32)
                            .stroke(isSelected ? level.color.opacity(0.5) : Color.clear, lineWidth: 3)
                    )
                    .shadow(color: Color.black.opacity(0.08), radius: 8, x: 8, y: 8)
                    .shadow(color: Color.white.opacity(0.8), radius: 8, x: -8, y: -8)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
