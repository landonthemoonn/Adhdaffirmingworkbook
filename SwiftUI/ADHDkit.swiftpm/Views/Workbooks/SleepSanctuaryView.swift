import SwiftUI

struct SleepSanctuaryView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Sleep Sanctuary",
                        subtitle: "Rituals to transition from high-alert to rest mode.",
                        description: "Create a soothing pathway from wakefulness to peaceful sleep."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Sleep Sanctuary content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
