import SwiftUI

struct SleepSanctuaryView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Sleep Sanctuary")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("Gentle rituals for winding down.")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Closure rituals
                    VStack(alignment: .leading, spacing: 24) {
                        Text("CLOSURE RITUALS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        Text("Pick one to help your brain know the day is done.")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        ForEach(closureOptions) { option in
                            HStack(spacing: 16) {
                                Image(systemName: option.iconName)
                                    .font(.system(size: 24, weight: .semibold))
                                    .foregroundColor(Color(hex: "8B5CF6"))
                                    .frame(width: 44)
                                
                                Text(option.text)
                                    .font(.system(size: 16, weight: .medium))
                                    .foregroundColor(ADHDColors.primaryText)
                            }
                            .padding(20)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(
                                RoundedRectangle(cornerRadius: 16)
                                    .fill(Color(hex: "F3E8FF"))
                            )
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // Mind prompts
                    VStack(alignment: .leading, spacing: 20) {
                        Text("MIND PROMPTS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        Text("Journal or just think through:")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        ForEach(mindPrompts, id: \.self) { prompt in
                            HStack(spacing: 12) {
                                Circle()
                                    .fill(Color(hex: "6366F1"))
                                    .frame(width: 8, height: 8)
                                
                                Text(prompt)
                                    .font(.system(size: 16, weight: .medium))
                                    .foregroundColor(ADHDColors.secondaryText)
                                    .italic()
                            }
                        }
                    }
                    .padding(32)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(Color(hex: "E0E7FF").opacity(0.5))
                    )
                    .padding(.bottom, 48)
                    
                    // Somatic rituals
                    VStack(alignment: .leading, spacing: 24) {
                        Text("SOMATIC RITUALS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        Text("Body-based techniques to signal rest.")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        LazyVGrid(columns: [
                            GridItem(.flexible(), spacing: 24),
                            GridItem(.flexible(), spacing: 24)
                        ], spacing: 24) {
                            ForEach(somaticRituals) { ritual in
                                VStack(alignment: .leading, spacing: 12) {
                                    HStack {
                                        Image(systemName: ritual.iconName)
                                            .font(.system(size: 24, weight: .semibold))
                                            .foregroundColor(ADHDColors.accent)
                                        
                                        Spacer()
                                    }
                                    
                                    Text(ritual.title)
                                        .font(.system(size: 18, weight: .bold))
                                        .foregroundColor(ADHDColors.primaryText)
                                    
                                    Text(ritual.description)
                                        .font(.system(size: 14, weight: .medium))
                                        .foregroundColor(ADHDColors.secondaryText)
                                        .lineSpacing(4)
                                }
                                .padding(20)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(
                                    RoundedRectangle(cornerRadius: 20)
                                        .fill(Color.white)
                                        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 4, y: 4)
                                )
                            }
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // Final prompts
                    VStack(spacing: 20) {
                        ForEach(finalPrompts, id: \.self) { prompt in
                            Text(prompt)
                                .font(.system(size: 20, weight: .bold))
                                .foregroundColor(ADHDColors.primaryText)
                                .multilineTextAlignment(.center)
                        }
                    }
                    .padding(32)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(ADHDColors.pillBackground.opacity(0.5))
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
