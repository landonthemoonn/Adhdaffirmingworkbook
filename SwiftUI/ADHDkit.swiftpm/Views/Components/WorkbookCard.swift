import SwiftUI

struct WorkbookCard: View {
    let workbook: WorkbookInfo
    let onTap: () -> Void
    @State private var isPressed = false
    
    var body: some View {
        Button(action: {
            if workbook.status != .comingSoon {
                onTap()
            }
        }) {
            VStack(alignment: .leading, spacing: 16) {
                // Header: Icon + Status
                HStack {
                    // Icon well
                    ZStack {
                        RoundedRectangle(cornerRadius: 16)
                            .fill(ADHDColors.innerCardBg)
                            .frame(width: 56, height: 56)
                            .shadow(color: Color.black.opacity(0.12), radius: 3, x: 3, y: 3)
                            .shadow(color: Color.white, radius: 3, x: -3, y: -3)
                        
                        Image(systemName: workbook.iconName)
                            .font(.system(size: 24, weight: .semibold))
                            .foregroundColor(workbook.status == .comingSoon ? ADHDColors.tertiaryText : ADHDColors.accent)
                    }
                    .scaleEffect(isPressed ? 1.0 : 1.05)
                    
                    Spacer()
                    
                    // Indicator dot
                    if workbook.status != .comingSoon {
                        Circle()
                            .fill(ADHDColors.accent.opacity(isPressed ? 1.0 : 0.3))
                            .frame(width: 8, height: 8)
                    }
                }
                
                // Title
                Text(workbook.title)
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(workbook.status == .comingSoon ? ADHDColors.tertiaryText : ADHDColors.primaryText)
                    .fixedSize(horizontal: false, vertical: true)
                
                // Description
                Text(workbook.description)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(workbook.status == .comingSoon ? ADHDColors.tertiaryText.opacity(0.8) : ADHDColors.secondaryText)
                    .lineSpacing(4)
                    .fixedSize(horizontal: false, vertical: true)
                
                Spacer()
                
                // Status badge
                if let badge = workbook.status.badge {
                    HStack {
                        Text(badge)
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(ADHDColors.tertiaryText)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(
                                Capsule()
                                    .fill(ADHDColors.pillBackground)
                            )
                        Spacer()
                    }
                }
            }
            .padding(28)
            .frame(maxWidth: .infinity, minHeight: 220)
            .neumorphic(isPressed: isPressed, isNoticed: workbook.status == .comingSoon)
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(workbook.status == .comingSoon)
        .scaleEffect(isPressed ? 0.98 : 1.0)
        .offset(y: isPressed ? 2 : -2)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in
                    withAnimation(.spring(response: 0.2, dampingFraction: 0.6)) {
                        isPressed = true
                    }
                }
                .onEnded { _ in
                    withAnimation(.spring(response: 0.2, dampingFraction: 0.6)) {
                        isPressed = false
                    }
                }
        )
    }
}
