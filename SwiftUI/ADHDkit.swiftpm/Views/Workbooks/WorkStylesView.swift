import SwiftUI

struct WorkStylesView: View {
    let onBack: () -> Void
    @StateObject private var persistence = PersistenceManager.shared
    @State private var selectedStyle: String?
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Work Styles")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("Which resonates most?")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        Text("There's no wrong answer. You might be a mix.")
                            .font(.system(size: 16, weight: .regular))
                            .foregroundColor(ADHDColors.secondaryText.opacity(0.8))
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Work styles
                    VStack(spacing: 32) {
                        ForEach(workStyles) { style in
                            WorkStyleCard(
                                style: style,
                                isSelected: selectedStyle == style.id,
                                onTap: {
                                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                                        selectedStyle = style.id
                                        persistence.saveSelectedWorkStyle(style.id)
                                    }
                                }
                            )
                        }
                    }
                    
                    // Footer message
                    VStack(spacing: 16) {
                        Text("Your brain works differently.")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("That's not a bug. It's a feature.")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .padding(32)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(ADHDColors.pillBackground.opacity(0.5))
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
            selectedStyle = persistence.getSelectedWorkStyle()
        }
    }
}
