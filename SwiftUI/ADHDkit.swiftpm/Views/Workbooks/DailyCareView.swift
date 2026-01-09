import SwiftUI

struct DailyCareView: View {
    let onBack: () -> Void
    @StateObject private var persistence = PersistenceManager.shared
    @State private var completedOptions: Set<String> = []
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Daily Care")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("Pick one from each category.")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        Text("That's it. You did it.")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Reset button
                    HStack {
                        Spacer()
                        Button(action: {
                            withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                completedOptions.removeAll()
                                persistence.resetDailyCare()
                            }
                        }) {
                            HStack(spacing: 8) {
                                Image(systemName: "arrow.clockwise")
                                    .font(.system(size: 14, weight: .bold))
                                Text("Reset Day")
                                    .font(.system(size: 14, weight: .bold))
                            }
                            .foregroundColor(ADHDColors.accent)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 12)
                            .background(
                                Capsule()
                                    .fill(ADHDColors.accent.opacity(0.1))
                            )
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                    .padding(.bottom, 32)
                    
                    // Categories
                    ForEach(dailyCareCategories) { category in
                        VStack(alignment: .leading, spacing: 20) {
                            // Category header
                            HStack(spacing: 12) {
                                Circle()
                                    .fill(category.theme.color)
                                    .frame(width: 12, height: 12)
                                
                                Text(category.title)
                                    .font(.system(size: 24, weight: .bold))
                                    .foregroundColor(ADHDColors.primaryText)
                            }
                            
                            // Options
                            ForEach(category.options, id: \.self) { option in
                                CareOptionButton(
                                    option: option,
                                    theme: category.theme,
                                    isCompleted: completedOptions.contains(option),
                                    onTap: {
                                        if completedOptions.contains(option) {
                                            completedOptions.remove(option)
                                        } else {
                                            completedOptions.insert(option)
                                        }
                                        persistence.saveCompletedCareOptions(completedOptions)
                                    }
                                )
                            }
                        }
                        .padding(.bottom, 40)
                    }
                    
                    // Encouragement
                    VStack(spacing: 16) {
                        Text("You only needed one.")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("If you did more, that's beautiful. If you did one, that's enough.")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .padding(32)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(ADHDColors.pillBackground.opacity(0.5))
                    )
                    .padding(.top, 32)
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
        .onAppear {
            completedOptions = persistence.getCompletedCareOptions()
        }
    }
}
