import SwiftUI

struct HomeTaskCard: View {
    let task: HomeTask
    @Binding var isCompleted: Bool
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header with day and toggle
            HStack {
                // Day badge
                Text(task.day)
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(task.isRestDay ? Color(hex: "8B5CF6") : ADHDColors.labelText)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(
                        Capsule()
                            .fill(task.isRestDay ? Color(hex: "F3E8FF") : ADHDColors.pillBackground)
                            .overlay(
                                Capsule()
                                    .stroke(Color.white.opacity(0.4), lineWidth: 1)
                            )
                    )
                
                Spacer()
                
                // Toggle button (not for rest day)
                if !task.isRestDay {
                    Button(action: {
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                            isCompleted.toggle()
                        }
                    }) {
                        Image(systemName: isCompleted ? "checkmark.circle.fill" : "circle")
                            .font(.system(size: 24, weight: .bold))
                            .foregroundColor(isCompleted ? Color(hex: "10B981") : ADHDColors.secondaryText.opacity(0.4))
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .padding(.bottom, 24)
            
            // Title
            Text(task.title)
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(task.isRestDay ? Color(hex: "8B5CF6") : (isCompleted ? ADHDColors.tertiaryText : ADHDColors.primaryText))
                .padding(.bottom, 12)
            
            // Main task
            Text(task.task)
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(isCompleted ? ADHDColors.tertiaryText.opacity(0.8) : ADHDColors.secondaryText)
                .lineSpacing(4)
                .padding(.bottom, 20)
            
            // Low energy alternative
            if !task.isRestDay {
                VStack(alignment: .leading, spacing: 8) {
                    Text("LOW ENERGY MODE")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(ADHDColors.tertiaryText)
                        .tracking(1.5)
                    
                    Text(task.lowEnergyAlt)
                        .font(.system(size: 14, weight: .medium))
                        .italic()
                        .foregroundColor(isCompleted ? ADHDColors.tertiaryText : ADHDColors.secondaryText)
                }
                .padding(.horizontal, 8)
            }
        }
        .padding(32)
        .frame(maxWidth: .infinity, alignment: .leading)
        .neumorphic(isNoticed: isCompleted)
    }
}
