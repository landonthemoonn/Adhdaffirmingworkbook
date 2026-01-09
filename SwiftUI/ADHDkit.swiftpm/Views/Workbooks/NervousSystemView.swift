import SwiftUI

struct NervousSystemView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Nervous System Reset")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("When everything feels too loud.")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Regulators
                    ForEach(regulators) { regulator in
                        VStack(alignment: .leading, spacing: 16) {
                            // Header
                            HStack {
                                ZStack {
                                    RoundedRectangle(cornerRadius: 14)
                                        .fill(Color(hex: regulator.type.color).opacity(0.2))
                                        .frame(width: 56, height: 56)
                                    
                                    Image(systemName: regulator.iconName)
                                        .font(.system(size: 26, weight: .semibold))
                                        .foregroundColor(Color(hex: regulator.type.color))
                                }
                                
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(regulator.title)
                                        .font(.system(size: 24, weight: .bold))
                                        .foregroundColor(ADHDColors.primaryText)
                                    
                                    HStack(spacing: 12) {
                                        Text(regulator.duration)
                                            .font(.system(size: 12, weight: .bold))
                                            .foregroundColor(Color(hex: regulator.type.color))
                                            .padding(.horizontal, 10)
                                            .padding(.vertical, 4)
                                            .background(
                                                Capsule()
                                                    .fill(Color(hex: regulator.type.color).opacity(0.15))
                                            )
                                        
                                        Text(regulator.type.rawValue.uppercased())
                                            .font(.system(size: 10, weight: .bold))
                                            .foregroundColor(ADHDColors.tertiaryText)
                                            .tracking(1)
                                    }
                                }
                                
                                Spacer()
                            }
                            
                            // Description
                            Text(regulator.description)
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(ADHDColors.secondaryText)
                                .lineSpacing(4)
                            
                            // Steps
                            if let steps = regulator.steps {
                                VStack(alignment: .leading, spacing: 12) {
                                    ForEach(Array(steps.enumerated()), id: \.offset) { index, step in
                                        HStack(alignment: .top, spacing: 12) {
                                            Text("\(index + 1)")
                                                .font(.system(size: 14, weight: .bold))
                                                .foregroundColor(Color(hex: regulator.type.color))
                                                .frame(width: 24, height: 24)
                                                .background(
                                                    Circle()
                                                        .fill(Color(hex: regulator.type.color).opacity(0.15))
                                                )
                                            
                                            Text(step)
                                                .font(.system(size: 15, weight: .regular))
                                                .foregroundColor(ADHDColors.secondaryText)
                                        }
                                    }
                                }
                                .padding(.top, 8)
                            }
                        }
                        .padding(32)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(
                            RoundedRectangle(cornerRadius: 32)
                                .fill(Color.white)
                                .shadow(color: Color.black.opacity(0.06), radius: 8, x: 8, y: 8)
                                .shadow(color: Color.white.opacity(0.8), radius: 8, x: -8, y: -8)
                        )
                        .padding(.bottom, 32)
                    }
                    
                    // Emergency message
                    VStack(spacing: 16) {
                        Text("🆘 Overwhelm Protocol")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        VStack(alignment: .leading, spacing: 12) {
                            Text("1. Stop what you're doing")
                            Text("2. Put on headphones (silence or brown noise)")
                            Text("3. Lie down or find a wall to lean against")
                            Text("4. Close your eyes")
                            Text("5. You don't have to fix anything right now")
                        }
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(ADHDColors.secondaryText)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .multilineTextAlignment(.center)
                    .padding(32)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(Color(hex: "FEE2E2").opacity(0.5))
                    )
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
