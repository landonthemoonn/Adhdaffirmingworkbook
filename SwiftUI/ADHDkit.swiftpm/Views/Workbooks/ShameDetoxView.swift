import SwiftUI

struct ShameDetoxView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Shame Detox")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("These aren't truths. They're wounds.")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        Text("Tap each card to see a different story.")
                            .font(.system(size: 16, weight: .regular))
                            .foregroundColor(ADHDColors.secondaryText.opacity(0.8))
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Reframe cards
                    LazyVGrid(columns: [
                        GridItem(.flexible(), spacing: 32),
                        GridItem(.flexible(), spacing: 32)
                    ], spacing: 32) {
                        ForEach(shameReframes) { reframe in
                            ShameReframeCard(reframe: reframe)
                        }
                    }
                    
                    // Closing message
                    VStack(spacing: 20) {
                        Text("REMEMBER")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        VStack(spacing: 16) {
                            Text("Shame is learned.")
                                .font(.system(size: 24, weight: .bold))
                                .foregroundColor(ADHDColors.primaryText)
                            
                            Text("What was learned can be unlearned. You don't have to carry these stories anymore. You can write new ones.")
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
                            .fill(Color(hex: "D1FAE5").opacity(0.5))
                    )
                    .padding(.top, 48)
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
