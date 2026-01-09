import Foundation

struct Spark: Identifiable, Codable {
    let id: String
    let title: String
    let iconName: String
    let effect: String
}

let dopamineMenu: [Spark] = [
    Spark(id: "audio", title: "Sonic Drive", iconName: "music.note", effect: "Rhythm for momentum"),
    Spark(id: "drink", title: "Potion", iconName: "cup.and.saucer.fill", effect: "Sensory bridge"),
    Spark(id: "body-double", title: "Body Double", iconName: "person.2.fill", effect: "Shared presence"),
    Spark(id: "timer", title: "Micro-Timer", iconName: "timer", effect: "Urgency burst"),
    Spark(id: "novelty", title: "Novelty", iconName: "sparkles", effect: "New environment")
]

let initiationScripts = [
    "I don't have to finish. I just have to open the file.",
    "I will do this for 2 minutes, then I am allowed to quit.",
    "I am just setting up the station, not doing the work yet.",
    "I will do the easiest, dumbest part first."
]
