import Foundation

struct ClosureOption: Identifiable, Codable {
    let id: String
    let text: String
    let iconName: String
}

let closureOptions = [
    ClosureOption(
        id: "wait",
        text: "Write down what can wait until tomorrow",
        iconName: "pencil"
    ),
    ClosureOption(
        id: "well",
        text: "Choose one thing you did well today",
        iconName: "checkmark.circle.fill"
    ),
    ClosureOption(
        id: "pause",
        text: "Name one unfinished thing and consciously pause it",
        iconName: "moon.fill"
    )
]

let mindPrompts = [
    "What is looping right now?",
    "What am I afraid of forgetting?",
    "What feels unresolved but not urgent?"
]

struct SomaticRitual: Identifiable, Codable {
    let id: String
    let title: String
    let iconName: String
    let description: String
}

let somaticRituals = [
    SomaticRitual(
        id: "breath",
        title: "Slow Breathing",
        iconName: "wind",
        description: "Inhale for 4 counts, exhale for 6 or 8. Signal safety to your vagus nerve."
    ),
    SomaticRitual(
        id: "muscle",
        title: "Muscle Release",
        iconName: "figure.walk",
        description: "Squeeze your toes, then release. Move up to your calves, thighs, and so on."
    ),
    SomaticRitual(
        id: "warmth",
        title: "Warmth",
        iconName: "cup.and.saucer.fill",
        description: "A warm shower, a heavy blanket, or a cup of herbal tea."
    ),
    SomaticRitual(
        id: "stretch",
        title: "Gentle Stretch",
        iconName: "figure.walk",
        description: "Slow neck rolls or reaching for the sky. No forcing."
    ),
    SomaticRitual(
        id: "touch",
        title: "Hand on Heart",
        iconName: "heart.fill",
        description: "Place one hand on your chest, one on your belly. Feel the rise and fall."
    ),
    SomaticRitual(
        id: "eyes",
        title: "Eye Rest",
        iconName: "eye.slash.fill",
        description: "Close your eyes or soften your gaze. Let the visual stimulation fade."
    )
]

let finalPrompts = [
    "You are allowed to stop.",
    "Nothing else is required.",
    "Rest is happening even if sleep doesn't.",
    "The day is done. You are safe."
]
