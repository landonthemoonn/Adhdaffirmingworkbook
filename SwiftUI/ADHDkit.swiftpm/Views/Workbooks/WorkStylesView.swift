import SwiftUI

struct WorkStylesView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Work Styles",
                        subtitle: "Recognize your preferred working style without judgment.",
                        description: "Discover how you work best and honor your natural rhythms."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Work Styles content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
