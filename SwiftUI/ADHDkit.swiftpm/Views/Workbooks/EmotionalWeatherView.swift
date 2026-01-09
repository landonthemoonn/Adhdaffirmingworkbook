import SwiftUI

struct EmotionalWeatherView: View {
    let onBack: () -> Void
    @StateObject private var persistence = PersistenceManager.shared
    @State private var selectedWeather: String?
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Emotional Weather")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("What's your forecast today?")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Weather states
                    LazyVGrid(columns: [
                        GridItem(.flexible(), spacing: 32),
                        GridItem(.flexible(), spacing: 32)
                    ], spacing: 32) {
                        ForEach(weatherStates) { state in
                            WeatherStateCard(
                                state: state,
                                isSelected: selectedWeather == state.id,
                                onTap: {
                                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                                        selectedWeather = state.id
                                        persistence.saveSelectedWeatherState(state.id)
                                    }
                                }
                            )
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // Storm signals
                    VStack(alignment: .leading, spacing: 24) {
                        Text("STORM SIGNALS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        VStack(alignment: .leading, spacing: 20) {
                            Text("Body Signals")
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(ADHDColors.primaryText)
                            
                            ForEach(StormSignals.body, id: \.self) { signal in
                                HStack(spacing: 12) {
                                    Circle()
                                        .fill(Color(hex: "F59E0B"))
                                        .frame(width: 6, height: 6)
                                    Text(signal)
                                        .font(.system(size: 15, weight: .medium))
                                        .foregroundColor(ADHDColors.secondaryText)
                                }
                            }
                        }
                        
                        VStack(alignment: .leading, spacing: 20) {
                            Text("Thought Patterns")
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(ADHDColors.primaryText)
                            
                            ForEach(StormSignals.thoughts, id: \.self) { thought in
                                HStack(spacing: 12) {
                                    Circle()
                                        .fill(Color(hex: "8B5CF6"))
                                        .frame(width: 6, height: 6)
                                    Text(thought)
                                        .font(.system(size: 15, weight: .medium))
                                        .foregroundColor(ADHDColors.secondaryText)
                                }
                            }
                        }
                    }
                    .padding(32)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(Color(hex: "FEF3C7").opacity(0.5))
                    )
                    .padding(.bottom, 48)
                    
                    // Regulation options
                    VStack(alignment: .leading, spacing: 24) {
                        Text("REGULATION TOOLS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        ForEach(regulationOptions) { option in
                            VStack(alignment: .leading, spacing: 12) {
                                HStack {
                                    Text(option.title)
                                        .font(.system(size: 18, weight: .bold))
                                        .foregroundColor(ADHDColors.primaryText)
                                    
                                    Spacer()
                                    
                                    Text(option.duration)
                                        .font(.system(size: 12, weight: .bold))
                                        .foregroundColor(ADHDColors.accent)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 6)
                                        .background(
                                            Capsule()
                                                .fill(ADHDColors.accent.opacity(0.1))
                                        )
                                }
                                
                                Text(option.benefit)
                                    .font(.system(size: 14, weight: .medium))
                                    .italic()
                                    .foregroundColor(ADHDColors.secondaryText)
                                
                                Text(option.description)
                                    .font(.system(size: 15, weight: .regular))
                                    .foregroundColor(ADHDColors.secondaryText)
                                    .lineSpacing(4)
                            }
                            .padding(24)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(
                                RoundedRectangle(cornerRadius: 20)
                                    .fill(Color.white)
                                    .shadow(color: Color.black.opacity(0.05), radius: 8, x: 4, y: 4)
                            )
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // Reflection prompts
                    VStack(alignment: .leading, spacing: 20) {
                        Text("REFLECTION PROMPTS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        ForEach(reflectionPrompts, id: \.self) { prompt in
                            Text("• \(prompt)")
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(ADHDColors.secondaryText)
                        }
                    }
                    .padding(32)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(ADHDColors.pillBackground.opacity(0.5))
                    )
                    
                    Text("Feelings are real. Stories might not be.")
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
            selectedWeather = persistence.getSelectedWeatherState()
        }
    }
}
