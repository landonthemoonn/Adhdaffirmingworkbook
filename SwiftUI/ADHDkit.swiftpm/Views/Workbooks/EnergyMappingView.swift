import SwiftUI

struct EnergyMappingView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    WorkbookHeader(
                        title: "Energy Mapping",
                        subtitle: "Track capacity, not productivity. Permission to rest.",
                        description: "Understand your energy patterns and respect your limits."
                    )
                    .padding(.bottom, 64)
                    
                    PlaceholderContent(message: "Energy Mapping content coming soon...")
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
