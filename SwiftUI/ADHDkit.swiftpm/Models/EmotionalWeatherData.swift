import Foundation
import SwiftUI

struct WeatherState: Identifiable, Codable {
    let id: String
    let label: String
    let iconName: String
    let description: String
    let thoughts: String
    let reminder: String
    let gradientColors: [String]
    
    var gradient: LinearGradient {
        LinearGradient(
            colors: gradientColors.map { Color(hex: $0) },
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}

let weatherStates: [WeatherState] = [
    WeatherState(
        id: "clear",
        label: "Clear",
        iconName: "sun.max.fill",
        description: "Calm, regulated, able to see perspective.",
        thoughts: "\"I can handle this.\"",
        reminder: "Savor this stability.",
        gradientColors: ["E0F2FE", "DBEAFE"]
    ),
    WeatherState(
        id: "overcast",
        label: "Overcast",
        iconName: "cloud.fill",
        description: "Heavy, low energy, muted motivation.",
        thoughts: "\"Why is this so hard today?\"",
        reminder: "Low energy is not a moral failing.",
        gradientColors: ["F1F5F9", "CBD5E1"]
    ),
    WeatherState(
        id: "drizzle",
        label: "Drizzle",
        iconName: "cloud.drizzle.fill",
        description: "Mild irritation, background anxiety, sadness.",
        thoughts: "\"I feel a bit off/sad.\"",
        reminder: "It is okay to feel gray.",
        gradientColors: ["DBEAFE", "E0E7FF"]
    ),
    WeatherState(
        id: "heavy-rain",
        label: "Heavy Rain",
        iconName: "cloud.heavyrain.fill",
        description: "Overwhelm, crying, urge to withdraw.",
        thoughts: "\"It's all too much.\"",
        reminder: "This storm will run out of rain.",
        gradientColors: ["C7D2FE", "93C5FD"]
    ),
    WeatherState(
        id: "thunder",
        label: "Thunder",
        iconName: "cloud.bolt.fill",
        description: "Intense anger, rejection sensitivity, fight/flight.",
        thoughts: "\"They hate me / I hate them.\"",
        reminder: "Feelings are real, stories might not be.",
        gradientColors: ["DDD6FE", "C4B5FD"]
    ),
    WeatherState(
        id: "fog",
        label: "Fog",
        iconName: "cloud.fog.fill",
        description: "Confusion, dissociation, brain fog.",
        thoughts: "\"I don't know what I'm doing.\"",
        reminder: "Clarity will return in time.",
        gradientColors: ["E7E5E4", "D6D3D1"]
    )
]

struct StormSignals {
    static let body = [
        "Tight chest",
        "Jaw clenching",
        "Restlessness / Pacing",
        "Sudden heavy fatigue",
        "Heat or buzzing sensation",
        "Holding breath"
    ]
    
    static let thoughts = [
        "\"They hate me\"",
        "\"I messed everything up\"",
        "Urge to explain / over-apologize",
        "Urge to disappear / ghost",
        "Replaying conversations",
        "\"I am too much\""
    ]
}

struct RegulationOption: Identifiable, Codable {
    let id: String
    let title: String
    let duration: String
    let benefit: String
    let description: String
}

let regulationOptions: [RegulationOption] = [
    RegulationOption(
        id: "senses",
        title: "5-4-3-2-1 Grounding",
        duration: "2 mins",
        benefit: "Interrupts spinning thoughts",
        description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste."
    ),
    RegulationOption(
        id: "breathe",
        title: "Slow Exhale Breathing",
        duration: "1 min",
        benefit: "Calms the nervous system",
        description: "Inhale for 4, hold for 4, exhale slowly for 6 or 8."
    ),
    RegulationOption(
        id: "ground",
        title: "Floor Press",
        duration: "30 secs",
        benefit: "Physical grounding",
        description: "Press your feet firmly into the floor. Feel the support beneath you."
    ),
    RegulationOption(
        id: "cold",
        title: "Temperature Shock",
        duration: "1 min",
        benefit: "Resets the vagus nerve",
        description: "Splash cold water on your face or run wrists under cold tap."
    ),
    RegulationOption(
        id: "write",
        title: "Unsent Letter",
        duration: "5 mins",
        benefit: "Gets the loop out of your head",
        description: "Write the angry/sad thought completely unfiltered. Do NOT send it."
    )
]

let reflectionPrompts = [
    "What actually happened vs. what I feared?",
    "What support would feel good right now?",
    "What doesn't need solving tonight?"
]
