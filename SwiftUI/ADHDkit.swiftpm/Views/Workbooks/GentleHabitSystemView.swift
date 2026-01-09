import SwiftUI

struct GentleHabitSystemView: View {
    let onBack: () -> Void
    @StateObject private var persistence = PersistenceManager.shared
    @State private var noticedDays: Set<Int> = []
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Device board wrapper
                VStack(alignment: .leading, spacing: 0) {
                    // Back button
                    Button(action: onBack) {
                        HStack(spacing: 12) {
                            ZStack {
                                Circle()
                                    .fill(ADHDColors.pillBackground)
                                    .frame(width: 48, height: 48)
                                    .shadow(color: Color.black.opacity(0.1), radius: 4, x: 4, y: 4)
                                    .shadow(color: Color.white.opacity(0.8), radius: 4, x: -4, y: -4)
                                
                                Image(systemName: "arrow.left")
                                    .font(.system(size: 20, weight: .bold))
                                    .foregroundColor(ADHDColors.secondaryText)
                            }
                            
                            Text("BACK TO DASHBOARD")
                                .font(.system(size: 12, weight: .bold))
                                .foregroundColor(ADHDColors.secondaryText)
                                .tracking(1.5)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("You Don't Need Motivation.\n")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                            +
                        Text("You Need Support.")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.tertiaryText)
                        
                        Text("A 20-day gentle habit system prioritizing emotional safety over hustle. Progress is optional. ")
                            .font(.system(size: 20, weight: .regular))
                            .foregroundColor(ADHDColors.secondaryText)
                            +
                        Text("Just noticing is enough.")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 64)
                    
                    // Days grid
                    LazyVGrid(columns: [
                        GridItem(.flexible(), spacing: 32),
                        GridItem(.flexible(), spacing: 32)
                    ], spacing: 32) {
                        ForEach(gentleHabitDays) { day in
                            DayCard(
                                day: day,
                                isNoticed: Binding(
                                    get: { noticedDays.contains(day.day) },
                                    set: { newValue in
                                        if newValue {
                                            noticedDays.insert(day.day)
                                        } else {
                                            noticedDays.remove(day.day)
                                        }
                                    }
                                )
                            )
                        }
                    }
                    
                    // Footer
                    Text("Take what you need. Leave the rest.")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(ADHDColors.secondaryText.opacity(0.6))
                        .tracking(0.5)
                        .frame(maxWidth: .infinity)
                        .padding(.top, 80)
                }
                .padding(56)
                .background(
                    RoundedRectangle(cornerRadius: 56)
                        .fill(Color(hex: "F8F2EE"))
                        .shadow(color: Color.black.opacity(0.4), radius: 40, x: 0, y: 40)
                        .shadow(color: Color.black.opacity(0.2), radius: 20, x: 0, y: 20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 56)
                                .stroke(Color.white.opacity(0.6), lineWidth: 1)
                        )
                )
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
