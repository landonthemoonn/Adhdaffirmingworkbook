import Foundation
import SwiftUI

enum WorkStyleTheme: String, Codable {
    case blue, rose, amber, emerald
    
    var color: Color {
        switch self {
        case .blue: return Color(hex: "3B82F6")
        case .rose: return Color(hex: "F43F5E")
        case .amber: return Color(hex: "F59E0B")
        case .emerald: return Color(hex: "10B981")
        }
    }
    
    var lightColor: Color {
        switch self {
        case .blue: return Color(hex: "DBEAFE")
        case .rose: return Color(hex: "FFE4E6")
        case .amber: return Color(hex: "FEF3C7")
        case .emerald: return Color(hex: "D1FAE5")
        }
    }
}

struct WorkStyle: Identifiable, Codable {
    let id: String
    let title: String
    let description: String
    let worksBest: [String]
    let supports: [String]
    let colorTheme: WorkStyleTheme
    let iconName: String
}

let workStyles: [WorkStyle] = [
    WorkStyle(
        id: "planner",
        title: "The Planner",
        description: "You find safety and flow in structure, predictability, and knowing exactly what comes next.",
        worksBest: [
            "The day has a clear shape or rhythm",
            "Tasks are broken down into small, visible steps",
            "You can see the \"finish line\" before starting"
        ],
        supports: [
            "Digital calendars with gentle reminders",
            "Morning roadmap sessions",
            "Checklists that allow for manual ticking"
        ],
        colorTheme: .blue,
        iconName: "calendar"
    ),
    WorkStyle(
        id: "priority",
        title: "The Sprinter",
        description: "You thrive on momentum and clarity, focusing intensely on the one thing that matters most right now.",
        worksBest: [
            "You have permission to ignore the small stuff",
            "There is a clear, singular goal for the session",
            "You can ride a wave of hyperfocus"
        ],
        supports: [
            "Body doubling (working alongside someone)",
            "\"Top 1\" sticky notes",
            "Timers to create gentle containers"
        ],
        colorTheme: .rose,
        iconName: "target"
    ),
    WorkStyle(
        id: "processor",
        title: "The Processor",
        description: "You need space, time, and low pressure to connect dots and understand concepts deeply.",
        worksBest: [
            "You are not being rushed or observed",
            "You can \"talk out\" or journal your thoughts",
            "You have time to transition between tasks"
        ],
        supports: [
            "Voice memos for brain dumps",
            "Uninterrupted \"deep work\" blocks",
            "Mind maps instead of linear lists"
        ],
        colorTheme: .amber,
        iconName: "square.stack.3d.up.fill"
    ),
    WorkStyle(
        id: "visualizer",
        title: "The Visualizer",
        description: "If you can't see it, it doesn't exist. You need tasks to be tangible, spatial, and colorful.",
        worksBest: [
            "Information is color-coded or spatially arranged",
            "You can move physical objects (post-its, tokens)",
            "Your environment is visually clear"
        ],
        supports: [
            "Kanban boards (To Do / Doing / Done)",
            "Whiteboards or large paper pads",
            "Visual timers (seeing time pass)"
        ],
        colorTheme: .emerald,
        iconName: "eye.fill"
    )
]
