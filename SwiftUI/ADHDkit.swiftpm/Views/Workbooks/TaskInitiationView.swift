import SwiftUI

struct TaskInitiationView: View {
    let onBack: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    BackButton(onBack: onBack)
                        .padding(.bottom, 32)
                    
                    // Header
                    VStack(spacing: 24) {
                        Text("Task Initiation Lab")
                            .font(.system(size: 48, weight: .bold))
                            .foregroundColor(ADHDColors.primaryText)
                        
                        Text("The hardest part is starting.")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        Text("You don't need to do the whole thing. You just need to begin.")
                            .font(.system(size: 16, weight: .regular))
                            .foregroundColor(ADHDColors.secondaryText.opacity(0.8))
                    }
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 800)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 48)
                    
                    // Dopamine menu
                    VStack(alignment: .leading, spacing: 24) {
                        Text("DOPAMINE MENU")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        Text("Pair the boring task with one of these:")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        LazyVGrid(columns: [
                            GridItem(.flexible(), spacing: 24),
                            GridItem(.flexible(), spacing: 24),
                            GridItem(.flexible(), spacing: 24)
                        ], spacing: 24) {
                            ForEach(dopamineMenu) { spark in
                                VStack(spacing: 16) {
                                    ZStack {
                                        Circle()
                                            .fill(ADHDColors.accent.opacity(0.2))
                                            .frame(width: 70, height: 70)
                                        
                                        Image(systemName: spark.iconName)
                                            .font(.system(size: 32, weight: .semibold))
                                            .foregroundColor(ADHDColors.accent)
                                    }
                                    
                                    Text(spark.title)
                                        .font(.system(size: 18, weight: .bold))
                                        .foregroundColor(ADHDColors.primaryText)
                                    
                                    Text(spark.effect)
                                        .font(.system(size: 14, weight: .medium))
                                        .foregroundColor(ADHDColors.secondaryText)
                                        .italic()
                                }
                                .multilineTextAlignment(.center)
                                .padding(24)
                                .frame(maxWidth: .infinity)
                                .background(
                                    RoundedRectangle(cornerRadius: 20)
                                        .fill(Color.white)
                                        .shadow(color: Color.black.opacity(0.05), radius: 6, x: 6, y: 6)
                                )
                            }
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // Initiation scripts
                    VStack(alignment: .leading, spacing: 24) {
                        Text("INITIATION SCRIPTS")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        Text("Say these out loud or write them down:")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(ADHDColors.secondaryText)
                        
                        ForEach(initiationScripts, id: \.self) { script in
                            HStack(alignment: .top, spacing: 16) {
                                Image(systemName: "quote.opening")
                                    .font(.system(size: 20, weight: .bold))
                                    .foregroundColor(Color(hex: "6366F1"))
                                
                                Text(script)
                                    .font(.system(size: 18, weight: .medium))
                                    .foregroundColor(ADHDColors.primaryText)
                                    .italic()
                            }
                            .padding(24)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(
                                RoundedRectangle(cornerRadius: 20)
                                    .fill(Color(hex: "E0E7FF").opacity(0.5))
                            )
                        }
                    }
                    .padding(.bottom, 48)
                    
                    // 2-minute rule
                    VStack(spacing: 20) {
                        Text("THE 2-MINUTE RULE")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(ADHDColors.labelText)
                            .tracking(2)
                        
                        VStack(spacing: 16) {
                            Text("You are allowed to quit after 2 minutes.")
                                .font(.system(size: 24, weight: .bold))
                                .foregroundColor(ADHDColors.primaryText)
                            
                            Text("Set a timer. Do the thing for 2 minutes. Then decide if you want to continue. Most times, starting is the only hard part.")
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(ADHDColors.secondaryText)
                                .lineSpacing(6)
                        }
                    }
                    .multilineTextAlignment(.center)
                    .padding(32)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(ADHDColors.pillBackground.opacity(0.5))
                    )
                }
                .padding(56)
                .background(WorkbookBackground())
                .padding(.horizontal, 20)
                .padding(.vertical, 48)
            }
        }
    }
}
