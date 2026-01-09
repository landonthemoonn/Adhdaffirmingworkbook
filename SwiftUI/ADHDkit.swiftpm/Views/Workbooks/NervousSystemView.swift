import SwiftUI

struct NervousSystemView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Nervous System Reset",
                        subtitle: "Micro-regulation tools for when everything feels too loud.",
                        description: "Quick interventions to bring your system back to baseline."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Nervous System Reset content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
