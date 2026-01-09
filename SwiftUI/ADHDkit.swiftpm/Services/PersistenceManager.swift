import Foundation

class PersistenceManager: ObservableObject {
    static let shared = PersistenceManager()
    
    private let defaults = UserDefaults.standard
    
    // Keys for storage
    private enum Keys {
        static let noticedDays = "noticedDays"
        static let completedHomeTasks = "completedHomeTasks"
        static let selectedWeatherState = "selectedWeatherState"
        static let completedCareOptions = "completedCareOptions"
        static let currentEnergyLevel = "currentEnergyLevel"
        static let selectedWorkStyle = "selectedWorkStyle"
    }
    
    // MARK: - Gentle Habit System
    
    func getNoticedDays() -> Set<Int> {
        let array = defaults.array(forKey: Keys.noticedDays) as? [Int] ?? []
        return Set(array)
    }
    
    func saveNoticedDays(_ days: Set<Int>) {
        defaults.set(Array(days), forKey: Keys.noticedDays)
    }
    
    func toggleDay(_ day: Int) {
        var days = getNoticedDays()
        if days.contains(day) {
            days.remove(day)
        } else {
            days.insert(day)
        }
        saveNoticedDays(days)
    }
    
    // MARK: - Home Reset
    
    func getCompletedHomeTasks() -> Set<String> {
        let array = defaults.array(forKey: Keys.completedHomeTasks) as? [String] ?? []
        return Set(array)
    }
    
    func saveCompletedHomeTasks(_ tasks: Set<String>) {
        defaults.set(Array(tasks), forKey: Keys.completedHomeTasks)
    }
    
    func toggleHomeTask(_ day: String) {
        var tasks = getCompletedHomeTasks()
        if tasks.contains(day) {
            tasks.remove(day)
        } else {
            tasks.insert(day)
        }
        saveCompletedHomeTasks(tasks)
    }
    
    // MARK: - Emotional Weather
    
    func getSelectedWeatherState() -> String? {
        defaults.string(forKey: Keys.selectedWeatherState)
    }
    
    func saveSelectedWeatherState(_ stateId: String?) {
        if let stateId = stateId {
            defaults.set(stateId, forKey: Keys.selectedWeatherState)
        } else {
            defaults.removeObject(forKey: Keys.selectedWeatherState)
        }
    }
    
    // MARK: - Daily Care
    
    func getCompletedCareOptions() -> Set<String> {
        let array = defaults.array(forKey: Keys.completedCareOptions) as? [String] ?? []
        return Set(array)
    }
    
    func saveCompletedCareOptions(_ options: Set<String>) {
        defaults.set(Array(options), forKey: Keys.completedCareOptions)
    }
    
    func toggleCareOption(_ option: String) {
        var options = getCompletedCareOptions()
        if options.contains(option) {
            options.remove(option)
        } else {
            options.insert(option)
        }
        saveCompletedCareOptions(options)
    }
    
    func resetDailyCare() {
        saveCompletedCareOptions([])
    }
    
    // MARK: - Energy Mapping
    
    func getCurrentEnergyLevel() -> String? {
        defaults.string(forKey: Keys.currentEnergyLevel)
    }
    
    func saveCurrentEnergyLevel(_ levelId: String?) {
        if let levelId = levelId {
            defaults.set(levelId, forKey: Keys.currentEnergyLevel)
        } else {
            defaults.removeObject(forKey: Keys.currentEnergyLevel)
        }
    }
    
    // MARK: - Work Styles
    
    func getSelectedWorkStyle() -> String? {
        defaults.string(forKey: Keys.selectedWorkStyle)
    }
    
    func saveSelectedWorkStyle(_ styleId: String?) {
        if let styleId = styleId {
            defaults.set(styleId, forKey: Keys.selectedWorkStyle)
        } else {
            defaults.removeObject(forKey: Keys.selectedWorkStyle)
        }
    }
    
    // MARK: - Clear All Data
    
    func clearAllData() {
        let domain = Bundle.main.bundleIdentifier!
        defaults.removePersistentDomain(forName: domain)
        defaults.synchronize()
    }
}
