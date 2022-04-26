//___FILEHEADER___

import UIKit

final class ___VARIABLE_productName:identifier___View: AlertPresentationView {

///    let backgroundView = UIView()
///    let contentView = UIView()
///    var duration: TimeInterval = 0.4
///    var transitionYContentMovingDelta: CGFloat 

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        setupView()
    }

    // MARK: - Private methods
    
    private func setupView() {

        makeConstraints()
    }

    private func makeConstraints() {
        NSLayoutConstraint.activate([
            contentView.centerYAnchor.constraint(equalTo: centerYAnchor),
            contentView.centerXAnchor.constraint(equalTo: centerXAnchor),
            contentView.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.8),
            contentView.heightAnchor.constraint(equalTo: widthAnchor, multiplier: 0.8)
        ])
    }
}
