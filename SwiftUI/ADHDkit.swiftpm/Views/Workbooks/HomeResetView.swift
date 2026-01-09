import SwiftUI

struct HomeResetView: View {
    let onBack: () -> Void
    @StateObject private var persistence = PersistenceManager.shared
    @State private var completedTasks: Set<String> = []
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    // Back button
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Home Reset")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("Low-pressure weekly maintenance. Resets over cleanliness.")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Weekly tasks grid
                    LazyVGrid(columns: [
                        GridItem(.flexible(), spacing: 32),
                        GridItem(.flexible(), spacing: 32)
                    ], spacing: 32) {
                        ForEach(weeklyTasks) { task in
                            HomeTaskCard(
                                task: task,
                                isCompleted: Binding(
                                    get: { completedTasks.contains(task.day) },
                                    set: { newValue in
                                        if newValue {
                                            completedTasks.insert(task.day)
                                        } else {
                                            completedTasks.remove(task.day)
                                        }
                                        persistence.saveCompletedHomeTasks(completedTasks)
                                    }
                                )
                            )
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // Low energy mode tips
                    VStack(alignment: .leading, spacing: 20) {
                        Text("LOW ENERGY MODE")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        ForEach(lowEnergyModeTips, id: \.self) { tip in
                            HStack(spacing: 12) {
                                Circle()
                                    .fill(ADHDColors.accent)
                                    .frame(width: 8, height: 8)
                                
                                Text(tip)
                                    .font(.system(size: 16, weight: .medium))
                                    .foregroundColor(ADHDColors.secondaryText)
                            }
                        }
                    }
                    .padding(32)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(ADHDColors.pillBackground.opacity(0.5))
                    )
                    
                    // Footer
                    Text("One tiny reset is enough.")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(ADHDColors.secondaryText.opacity(0.6))
                        .tracking(0.5)
                        .frame(maxWidth: .infinity)
                        .padding(.top, 48)
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
        .onAppear {
            completedTasks = persistence.getCompletedHomeTasks()
        }
    }
}
