import SwiftUI

struct DashboardView: View {
    let navigateToView: (AppView) -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Device board wrapper
                VStack(alignment: .leading, spacing: 0) {
                    // Header section
                    VStack(alignment: .center, spacing: 16) {
                        // Brand pill
                        HStack(spacing: 12) {
                            Circle()
                                .fill(ADHDColors.accent)
                                .frame(width: 10, height: 10)
                            
                            Text("DASHBOARD")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(ADHDColors.labelText)
                                .tracking(2)
                        }
                        .padding(.horizontal, 20)
                        .padding(.vertical, 8)
                        .background(
                            Capsule()
                                .fill(ADHDColors.pillBackground)
                                .shadow(color: Color.black.opacity(0.2), radius: 2, x: 2, y: 2)
                                .shadow(color: Color.white.opacity(0.8), radius: 2, x: -2, y: -2)
                        )
                        
                        // Title
                        Text("ADHDkit")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        // Subtitle
                        Text("Your safe executive function space.")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                            .tracking(0.5)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 56)
                    
                    // Sections
                    VStack(spacing: 64) {
                        // Core Regulation & Safety
                        WorkbookSection(
                            title: "Core Regulation & Safety",
                            workbooks: coreRegulationWorkbooks,
                            navigateToView: navigateToView
                        )
                        
                        // Executive Function
                        WorkbookSection(
                            title: "Executive Function",
                            workbooks: executiveFunctionWorkbooks,
                            navigateToView: navigateToView
                        )
                        
                        // Body & Brain Care
                        WorkbookSection(
                            title: "Body & Brain Care",
                            workbooks: bodyBrainCareWorkbooks,
                            navigateToView: navigateToView
                        )
                    }
                }
                .padding(56)
                .background(
                    RoundedRectangle(cornerRadius: 56)
                        .fill(Color(hex: "F8F2EE"))
                        .shadow(color: Color.black.opacity(0.4), radius: 40, x: 0, y: 40)
                        .shadow(color: Color.black.opacity(0.2), radius: 20, x: 0, y: 20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 56)
                                .stroke(Color.white.opacity(0.6), lineWidth: 1)
                        )
                )
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}

struct WorkbookSection: View {
    let title: String
    let workbooks: [WorkbookInfo]
    let navigateToView: (AppView) -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 32) {
            // Section header
            HStack(spacing: 16) {
                Text(title)
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(ADHDColors.labelText)
                    .tracking(2)
                
                Rectangle()
                    .fill(ADHDColors.divider)
                    .frame(height: 1)
            }
            
            // Workbook cards grid
            LazyVGrid(columns: [
                GridItem(.flexible(), spacing: 32),
                GridItem(.flexible(), spacing: 32),
                GridItem(.flexible(), spacing: 32)
            ], spacing: 32) {
                ForEach(workbooks) { workbook in
                    WorkbookCard(workbook: workbook) {
                        navigateToView(workbook.view)
                    }
                }
            }
        }
    }
}
