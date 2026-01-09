import SwiftUI

struct BackgroundView: View {
    @State private var animationAmount: CGFloat = 1.0
    
    var body: some View {
        ZStack {
            // Base gradient
            LinearGradient(
                colors: [
                    Color(hex: "E6D5CC"),
                    Color(hex: "Dcb8ad"),
                    Color(hex: "C9A69D")
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            
            // Animated mesh gradients
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            Color(hex: "FFDBCF").opacity(0.6),
                            Color(hex: "FFC8B3").opacity(0.8)
                        ],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .frame(width: UIScreen.main.bounds.width * 0.8)
                .blur(radius: 120)
                .offset(x: -100, y: -200)
                .scaleEffect(animationAmount)
                .opacity(0.6)
            
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            Color(hex: "E8A598").opacity(0.4),
                            Color(hex: "DFA899").opacity(0.6)
                        ],
                        startPoint: .trailing,
                        endPoint: .leading
                    )
                )
                .frame(width: UIScreen.main.bounds.width * 0.9)
                .blur(radius: 140)
                .offset(x: 100, y: 300)
                .scaleEffect(1.2 - (animationAmount - 1.0))
                .opacity(0.4)
            
            // Texture overlay
            Rectangle()
                .fill(Color.black.opacity(0.08))
                .blendMode(.overlay)
                .ignoresSafeArea()
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 20).repeatForever(autoreverses: true)) {
                animationAmount = 1.2
            }
        }
    }
}
