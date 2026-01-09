import SwiftUI

struct ShameReframeCard: View {
    let reframe: Reframing
    @State private var isFlipped = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            if !isFlipped {
                // Toxic side
                VStack(alignment: .leading, spacing: 16) {
                    Text("TOXIC THOUGHT")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(Color(hex: "DC2626"))
                        .tracking(1.5)
                    
                    Text(reframe.toxic)
                        .font(.system(size: 22, weight: .bold))
                        .foregroundColor(Color(hex: "991B1B"))
                        .lineSpacing(6)
                    
                    Spacer()
                    
                    Button(action: {
                        withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
                            isFlipped = true
                        }
                    }) {
                        HStack {
                            Spacer()
                            Text("Reframe This")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(ADHDColors.accent)
                            Image(systemName: "arrow.right.circle.fill")
                                .font(.system(size: 20))
                                .foregroundColor(ADHDColors.accent)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(32)
                .frame(maxWidth: .infinity, minHeight: 280, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 32)
                        .fill(Color(hex: "FEE2E2"))
                        .overlay(
                            RoundedRectangle(cornerRadius: 32)
                                .stroke(Color(hex: "FCA5A5").opacity(0.5), lineWidth: 2)
                        )
                )
            } else {
                // Reframe side
                VStack(alignment: .leading, spacing: 16) {
                    Text("REFRAME")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(Color(hex: "059669"))
                        .tracking(1.5)
                    
                    Text(reframe.reframe)
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(Color(hex: "065F46"))
                        .lineSpacing(6)
                    
                    Spacer()
                    
                    Button(action: {
                        withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
                            isFlipped = false
                        }
                    }) {
                        HStack {
                            Image(systemName: "arrow.left.circle.fill")
                                .font(.system(size: 20))
                                .foregroundColor(Color(hex: "6B7280"))
                            Text("See Original")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(Color(hex: "6B7280"))
                            Spacer()
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(32)
                .frame(maxWidth: .infinity, minHeight: 280, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 32)
                        .fill(Color(hex: "D1FAE5"))
                        .overlay(
                            RoundedRectangle(cornerRadius: 32)
                                .stroke(Color(hex: "6EE7B7").opacity(0.5), lineWidth: 2)
                        )
                )
            }
        }
        .shadow(color: Color.black.opacity(0.08), radius: 8, x: 8, y: 8)
        .shadow(color: Color.white.opacity(0.6), radius: 8, x: -8, y: -8)
    }
}
