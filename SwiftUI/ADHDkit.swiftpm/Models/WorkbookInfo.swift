import SwiftUI

struct WorkbookInfo: Identifiable {
    let id = UUID()
    let title: String
    let description: String
    let iconName: String
    let status: WorkbookStatus
    let view: AppView
}

enum WorkbookStatus {
    case active
    case new
    case comingSoon
    
    var badge: String? {
        switch self {
        case .active:
            return nil
        case .new:
            return "NEW"
        case .comingSoon:
            return "COMING SOON"
        }
    }
}

let coreRegulationWorkbooks: [WorkbookInfo] = [
    WorkbookInfo(
        title: "Emotional Weather",
        description: "Identifying and riding out the waves of rejection sensitivity.",
        iconName: "cloud.fill",
        status: .active,
        view: .emotionalWeather
    ),
    WorkbookInfo(
        title: "Nervous System Reset",
        description: "Micro-regulation tools for when everything feels too loud.",
        iconName: "wind",
        status: .new,
        view: .nervousSystem
    ),
    WorkbookInfo(
        title: "Shame Detox",
        description: "Name and reframe the internalized narratives holding you back.",
        iconName: "shield.checkered",
        status: .new,
        view: .shameDetox
    )
]

let executiveFunctionWorkbooks: [WorkbookInfo] = [
    WorkbookInfo(
        title: "Gentle Habit System",
        description: "A 20-day support system prioritizing emotional safety over hustle.",
        iconName: "sparkles",
        status: .active,
        view: .gentleHabit
    ),
    WorkbookInfo(
        title: "Home Reset",
        description: "Low-pressure weekly maintenance. Resets over cleanliness.",
        iconName: "house.fill",
        status: .active,
        view: .homeReset
    ),
    WorkbookInfo(
        title: "Work Styles",
        description: "Recognize your preferred working style without judgment.",
        iconName: "brain.head.profile",
        status: .active,
        view: .workStyles
    ),
    WorkbookInfo(
        title: "Task Initiation Lab",
        description: "Start-only rituals and dopamine pairing to break paralysis.",
        iconName: "play.circle.fill",
        status: .new,
        view: .taskInitiation
    )
]

let bodyBrainCareWorkbooks: [WorkbookInfo] = [
    WorkbookInfo(
        title: "Daily Care",
        description: "A flexible check-in system. You only need one.",
        iconName: "heart.fill",
        status: .active,
        view: .dailyCare
    ),
    WorkbookInfo(
        title: "Energy Mapping",
        description: "Track capacity, not productivity. Permission to rest.",
        iconName: "bolt.fill",
        status: .new,
        view: .energyMapping
    ),
    WorkbookInfo(
        title: "Sleep Sanctuary",
        description: "Rituals to transition from high-alert to rest mode.",
        iconName: "moon.fill",
        status: .active,
        view: .sleepSanctuary
    )
]
