import Foundation

enum RegulatorType: String, Codable {
    case breath
    case sensory
    case movement
    
    var color: String {
        switch self {
        case .breath: return "93C5FD"
        case .sensory: return "C4B5FD"
        case .movement: return "86EFAC"
        }
    }
}

struct Regulator: Identifiable, Codable {
    let id: String
    let title: String
    let description: String
    let iconName: String
    let duration: String
    let type: RegulatorType
    let steps: [String]?
}

let regulators: [Regulator] = [
    Regulator(
        id: "box-breath",
        title: "Box Breathing",
        description: "Reset your vagus nerve. Inhale 4, Hold 4, Exhale 4, Hold 4.",
        iconName: "wind",
        duration: "2 min",
        type: .breath,
        steps: ["Inhale deeply", "Hold", "Exhale slowly", "Hold empty"]
    ),
    Regulator(
        id: "54321",
        title: "5-4-3-2-1 Grounding",
        description: "Reconnect with your physical environment.",
        iconName: "anchor",
        duration: "3 min",
        type: .sensory,
        steps: [
            "5 things you see",
            "4 things you can touch",
            "3 things you hear",
            "2 things you can smell",
            "1 emotion you feel"
        ]
    ),
    Regulator(
        id: "bilateral",
        title: "Bilateral Stimulation",
        description: "Tap your knees alternately or look left/right repeatedly.",
        iconName: "bolt.fill",
        duration: "1 min",
        type: .movement,
        steps: ["Tap left knee", "Tap right knee", "Repeat rhythmically", "Focus on the sensation"]
    ),
    Regulator(
        id: "audio-wall",
        title: "Sonic Cocoon",
        description: "Block out the chaos. Put on headphones with brown noise.",
        iconName: "headphones",
        duration: "Instant",
        type: .sensory,
        steps: nil
    )
]
