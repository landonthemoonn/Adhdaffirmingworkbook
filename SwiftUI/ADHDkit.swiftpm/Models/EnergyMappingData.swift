import Foundation
import SwiftUI

struct EnergyLevel: Identifiable, Codable {
    let id: String
    let level: Int // 0-100
    let label: String
    let description: String
    let iconName: String
    let recommendation: String
    let colorHex: String
    let protocol: [String]
    
    var color: Color {
        Color(hex: colorHex)
    }
}

let energyLevels: [EnergyLevel] = [
    EnergyLevel(
        id: "surge",
        level: 90,
        label: "Hyper-Capacity",
        description: "You feel like you can do everything. Danger of overcommitting.",
        iconName: "bolt.fill",
        recommendation: "Pick 1 hard thing. Do NOT promise more future work.",
        colorHex: "D97706",
        protocol: [
            "Identify ONE high-value task",
            "Set a timer for 45 minutes",
            "Write down ideas for later (don't switch tasks)",
            "Drink water (you will forget)"
        ]
    ),
    EnergyLevel(
        id: "steady",
        level: 70,
        label: "Sustainable Flow",
        description: "Good focus. Calm body.",
        iconName: "battery.100",
        recommendation: "Do the \"Deep Work\" now. It won't last all day.",
        colorHex: "059669",
        protocol: [
            "Work on the main project",
            "Clear the inbox (batching)",
            "Schedule meetings",
            "Take a 5 min stretch break every hour"
        ]
    ),
    EnergyLevel(
        id: "low",
        level: 30,
        label: "Low Power Mode",
        description: "Brain fog. Heavy limbs.",
        iconName: "battery.25",
        recommendation: "Admin tasks, sorting, or passive consumption. No new decisions.",
        colorHex: "475569",
        protocol: [
            "Delete old files/emails",
            "Organize physical desk",
            "Watch a tutorial (passive learning)",
            "Do laundry or dishes (mindless movement)"
        ]
    ),
    EnergyLevel(
        id: "empty",
        level: 10,
        label: "System Collapse",
        description: "RSD, tears, or paralysis.",
        iconName: "battery.0",
        recommendation: "Stop. Floor time. Sensory deprivation. Eat something.",
        colorHex: "DC2626",
        protocol: [
            "Lie on the floor",
            "Eat a protein snack",
            "Put on noise-canceling headphones",
            "Cancel non-urgent plans",
            "No screens for 20 minutes"
        ]
    )
]
