import SwiftUI

struct EnergyMappingView: View {
    let onBack: () -> Void
    @StateObject private var persistence = PersistenceManager.shared
    @State private var currentEnergyLevel: String?
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Energy Mapping")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("Where's your battery right now?")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Energy levels
                    VStack(spacing: 32) {
                        ForEach(energyLevels) { level in
                            EnergyLevelCard(
                                level: level,
                                isSelected: currentEnergyLevel == level.id,
                                onTap: {
                                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                                        currentEnergyLevel = level.id
                                        persistence.saveCurrentEnergyLevel(level.id)
                                    }
                                }
                            )
                        }
                    }
                    
                    // Important message
                    VStack(spacing: 20) {
                        Text("IMPORTANT")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        VStack(spacing: 16) {
                            Text("You are not broken for being tired.")
                                .font(.system(size: 20, weight: .bold))
                                .foregroundColor(ADHDColors.primaryText)
                            
                            Text("Your worth is not tied to your output. Low energy days are not wasted days. Sometimes the most productive thing you can do is rest.")
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(ADHDColors.secondaryText)
                                .lineSpacing(6)
                        }
                    }
                    .multilineTextAlignment(.center)
                    .padding(32)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(Color(hex: "FEF3C7").opacity(0.5))
                    )
                    .padding(.top, 48)
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
        .onAppear {
            currentEnergyLevel = persistence.getCurrentEnergyLevel()
        }
    }
}
