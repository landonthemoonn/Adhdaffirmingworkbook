import Foundation

struct HomeTask: Identifiable, Codable {
    let id = UUID()
    let day: String
    let title: String
    let task: String
    let lowEnergyAlt: String
    let isRestDay: Bool
    
    enum CodingKeys: String, CodingKey {
        case day, title, task, lowEnergyAlt, isRestDay
    }
}

let weeklyTasks: [HomeTask] = [
    HomeTask(
        day: "Monday",
        title: "Surface Reset",
        task: "Clear one nightstand or desk corner (5 mins).",
        lowEnergyAlt: "Just straighten the piles so they look intentional.",
        isRestDay: false
    ),
    HomeTask(
        day: "Tuesday",
        title: "Dish Collection",
        task: "Gather all cups and bottles to the sink.",
        lowEnergyAlt: "Bring just the one closest to you.",
        isRestDay: false
    ),
    HomeTask(
        day: "Wednesday",
        title: "Floor Scan",
        task: "Pick up 3 pieces of trash or laundry.",
        lowEnergyAlt: "Kick items out of the main walking path.",
        isRestDay: false
    ),
    HomeTask(
        day: "Thursday",
        title: "Clothing Refresh",
        task: "Start one wash cycle or put away one pile.",
        lowEnergyAlt: "Move clean clothes from chair to basket (no folding).",
        isRestDay: false
    ),
    HomeTask(
        day: "Friday",
        title: "Fridge Triage",
        task: "Throw away one expired item.",
        lowEnergyAlt: "Identify one leftover to eat today.",
        isRestDay: false
    ),
    HomeTask(
        day: "Saturday",
        title: "Entrance Reset",
        task: "Line up shoes or hang up bags.",
        lowEnergyAlt: "Clear just the path to the door.",
        isRestDay: false
    ),
    HomeTask(
        day: "Sunday",
        title: "Rest Day",
        task: "Do absolutely nothing. You have done enough.",
        lowEnergyAlt: "Breathe.",
        isRestDay: true
    )
]

let lowEnergyModeTips = [
    "Open one window for fresh air.",
    "Light a candle or turn on a soft lamp.",
    "Put just one thing back where it belongs."
]
