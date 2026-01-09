import SwiftUI

struct EmotionalWeatherView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Emotional Weather",
                        subtitle: "Identifying and riding out the waves of rejection sensitivity.",
                        description: "Learn to observe your emotional patterns without drowning in them."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Emotional Weather content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
