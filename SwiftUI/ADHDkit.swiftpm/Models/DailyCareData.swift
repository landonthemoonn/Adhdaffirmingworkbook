import Foundation
import SwiftUI

enum CareTheme: String, Codable {
    case rose
    case emerald
    case indigo
    
    var color: Color {
        switch self {
        case .rose: return Color(hex: "F43F5E")
        case .emerald: return Color(hex: "10B981")
        case .indigo: return Color(hex: "6366F1")
        }
    }
    
    var lightColor: Color {
        switch self {
        case .rose: return Color(hex: "FFE4E6")
        case .emerald: return Color(hex: "D1FAE5")
        case .indigo: return Color(hex: "E0E7FF")
        }
    }
}

struct CareCategory: Identifiable, Codable {
    let id: String
    let title: String
    let theme: CareTheme
    let options: [String]
}

let dailyCareCategories: [CareCategory] = [
    CareCategory(
        id: "body",
        title: "Body",
        theme: .rose,
        options: [
            "Drink a glass of water",
            "Stretch for 30 seconds",
            "Wash your face",
            "Eat something small",
            "Take 3 deep breaths",
            "Put on comfortable clothes"
        ]
    ),
    CareCategory(
        id: "home",
        title: "Home",
        theme: .emerald,
        options: [
            "Open a window",
            "Make the bed (loosely)",
            "Clear one surface",
            "Water a plant",
            "Put one dish away",
            "Adjust the lighting"
        ]
    ),
    CareCategory(
        id: "mind",
        title: "Mind",
        theme: .indigo,
        options: [
            "Listen to one song",
            "Write down one thought",
            "Step outside for a moment",
            "Pet an animal or soft object",
            "Read one page",
            "Close your eyes for a minute"
        ]
    )
]
