import SwiftUI

struct TaskInitiationView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Task Initiation Lab",
                        subtitle: "Start-only rituals and dopamine pairing to break paralysis.",
                        description: "Experiment with different ways to unstick yourself from task freeze."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Task Initiation Lab content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
