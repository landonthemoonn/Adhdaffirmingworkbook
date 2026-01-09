import SwiftUI

struct ShameDetoxView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Shame Detox",
                        subtitle: "Name and reframe the internalized narratives holding you back.",
                        description: "Gentle excavation of the stories you've been carrying that aren't yours."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Shame Detox content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
