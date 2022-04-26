//
//  AlertPresentationView.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class AlertPresentationView: UIView {
    
    let backgroundView = UIView()
    let contentView = UIView()
    
    var duration: TimeInterval = 0.3
    
    var transitionYContentMovingDelta: CGFloat = UIConstants.screenBounds.width * 0.6

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        setupView()
    }
    
    // MARK: - Public methods
    
    /// Method to set transition fraction complete.
    /// State -1 = content view is hiden in the bottom screen part;
    /// state 0 = means content view is active;
    /// state 1 = means content view is hiden in the top screen part.
    /// - Parameters:
    ///   - fractionCompletionState: value from -1 to 1
    ///   - animated: execite vith animation flag
    func setTransitionViewState(fractionCompletionState: Float, animated: Bool, duration: TimeInterval? = nil) {
        let fraction = CGFloat(min(max(fractionCompletionState, -1), 1))
        let fractionAbs: CGFloat = abs(fraction)
        let fractionAbsSqrt: CGFloat = sqrt(fractionAbs)

        let scaleModifier = (1 - fractionAbs) * 0.05 + 0.95
        
        let transitionAction = { [ weak self ] in
            guard let self = self
            else { return }
            self.backgroundView.alpha = CGFloat(1 - fractionAbsSqrt)
            self.contentView.alpha = CGFloat(1 - fractionAbsSqrt)
            self.contentView.transform = .init(translationX: 0, y: self.transitionYContentMovingDelta * fraction)
                .scaledBy(x: scaleModifier, y: scaleModifier)
        }
        
        let duration = duration ?? self.duration
        DispatchQueue.main.async {
            if animated {
                UIView.animate(withDuration: duration, animations: transitionAction)
            } else {
                transitionAction()
            }
        }
    }

    // MARK: - Private methods
    
    private func setupView() {
        backgroundColor = .clear
        
        addSubview(backgroundView)
        backgroundView.backgroundColor = .res.background()?.withAlphaComponent(0.6)
        backgroundView.translatesAutoresizingMaskIntoConstraints = false
        backgroundView.isUserInteractionEnabled = true
        
        addSubview(contentView)
        contentView.translatesAutoresizingMaskIntoConstraints = false
        contentView.backgroundColor = .white
        contentView.isUserInteractionEnabled = true
        
        makeConstraints()
    }

    private func makeConstraints() {
        NSLayoutConstraint.activate([
            backgroundView.topAnchor.constraint(equalTo: topAnchor),
            backgroundView.bottomAnchor.constraint(equalTo: bottomAnchor),
            backgroundView.leftAnchor.constraint(equalTo: leftAnchor),
            backgroundView.rightAnchor.constraint(equalTo: rightAnchor)
        ])
    }
}
