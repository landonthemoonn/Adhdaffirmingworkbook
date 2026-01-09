import SwiftUI

struct WorkStyleCard: View {
    let style: WorkStyle
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 20) {
                // Header
                HStack {
                    ZStack {
                        RoundedRectangle(cornerRadius: 16)
                            .fill(style.colorTheme.lightColor)
                            .frame(width: 56, height: 56)
                        
                        Image(systemName: style.iconName)
                            .font(.system(size: 24, weight: .semibold))
                            .foregroundColor(style.colorTheme.color)
                    }
                    
                    Spacer()
                    
                    if isSelected {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 28))
                            .foregroundColor(style.colorTheme.color)
                    }
                }
                
                // Title
                Text(style.title)
                    .font(.system(size: 26, weight: .bold))
                    .foregroundColor(ADHDColors.primaryText)
                
                // Description
                Text(style.description)
                    .font(.system(size: 15, weight: .medium))
                    .foregroundColor(ADHDColors.secondaryText)
                    .lineSpacing(4)
                
                // Works Best
                VStack(alignment: .leading, spacing: 12) {
                    Text("WORKS BEST WHEN")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    ForEach(style.worksBest, id: \.self) { item in
                        HStack(alignment: .top, spacing: 10) {
                            Circle()
                                .fill(style.colorTheme.color)
                                .frame(width: 6, height: 6)
                                .padding(.top, 6)
                            
                            Text(item)
                                .font(.system(size: 14, weight: .regular))
                                .foregroundColor(ADHDColors.secondaryText)
                        }
                    }
                }
                .padding(20)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(style.colorTheme.lightColor.opacity(0.3))
                )
                
                // Supports
                VStack(alignment: .leading, spacing: 12) {
                    Text("SUPPORTS")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    ForEach(style.supports, id: \.self) { item in
                        HStack(alignment: .top, spacing: 10) {
                            Image(systemName: "star.fill")
                                .font(.system(size: 8))
                                .foregroundColor(style.colorTheme.color)
                                .padding(.top, 4)
                            
                            Text(item)
                                .font(.system(size: 14, weight: .regular))
                                .foregroundColor(ADHDColors.secondaryText)
                        }
                    }
                }
                .padding(.horizontal, 8)
            }
            .padding(32)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 32)
                    .fill(isSelected ? ADHDColors.cardBackground : Color.white)
                    .overlay(
                        RoundedRectangle(cornerRadius: 32)
                            .stroke(isSelected ? style.colorTheme.color.opacity(0.5) : Color.clear, lineWidth: 3)
                    )
                    .shadow(color: Color.black.opacity(0.08), radius: 8, x: 8, y: 8)
                    .shadow(color: Color.white.opacity(0.8), radius: 8, x: -8, y: -8)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
