import SwiftUI

struct DailyCareView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Daily Care",
                        subtitle: "A flexible check-in system. You only need one.",
                        description: "Simple daily rituals that meet you where you are."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Daily Care content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
