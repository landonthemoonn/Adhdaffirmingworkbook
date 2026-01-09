import SwiftUI

struct ContentView: View {
    @State private var currentView: AppView = .dashboard
    @State private var showQuickAdd = false
    
    var body: some View {
        ZStack {
            // Background
            BackgroundView()
            
            // Main Content
            VStack {
                switch currentView {
                case .dashboard:
                    DashboardView(navigateToView: { view in
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = view
                        }
                    })
                case .gentleHabit:
                    GentleHabitSystemView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .homeReset:
                    HomeResetView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .workStyles:
                    WorkStylesView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .dailyCare:
                    DailyCareView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .emotionalWeather:
                    EmotionalWeatherView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .sleepSanctuary:
                    SleepSanctuaryView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .nervousSystem:
                    NervousSystemView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .taskInitiation:
                    TaskInitiationView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .shameDetox:
                    ShameDetoxView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                case .energyMapping:
                    EnergyMappingView(onBack: {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                            currentView = .dashboard
                        }
                    })
                }
            }
            .frame(maxWidth: 1200)
            .padding(.horizontal, 20)
        }
        .ignoresSafeArea()
    }
}

enum AppView {
    case dashboard
    case gentleHabit
    case homeReset
    case workStyles
    case dailyCare
    case emotionalWeather
    case sleepSanctuary
    case nervousSystem
    case taskInitiation
    case shameDetox
    case energyMapping
}
