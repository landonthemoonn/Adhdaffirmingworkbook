import SwiftUI

struct HomeResetView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    // Back button
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    WorkbookHeader(
                        title: "Home Reset",
                        subtitle: "Low-pressure weekly maintenance. Resets over cleanliness.",
                        description: "A gentle approach to maintaining your space without the shame spiral."
                    )
                    .padding(.bottom, 64)
                    
                    // Content placeholder
                    PlaceholderContent(message: "Home Reset content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
