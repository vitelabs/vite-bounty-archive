//
//  LoadingView.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class LoadingView: UIView {
    
    let logo = UIImageView()
    let hideLogoDuration: TimeInterval = 0.5

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        setupView()
    }
    
    // MARK: - Public methods
    
    func hideLogo() {
        UIView.transition(with: logo,
                          duration: hideLogoDuration) { [ weak self ] in
            guard let logo = self?.logo
            else { return }
            logo.alpha = 0
            logo.transform = CGAffineTransform(translationX: 0, y: -20)
                .scaledBy(x: 1.1, y: 1.1)
        }
    }

    // MARK: - Private methods
    
    private func setupView() {

        backgroundColor = R.color.background()
        
        addSubview(logo)
        logo.translatesAutoresizingMaskIntoConstraints = false
        logo.contentMode = .scaleAspectFit
        logo.image = R.image.launchLogo()
        
        makeConstraints()
    }

    private func makeConstraints() {
        NSLayoutConstraint.activate([
            logo.centerYAnchor.constraint(equalTo: centerYAnchor, constant: -100),
            logo.centerXAnchor.constraint(equalTo: centerXAnchor),
            logo.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.7)
        ])
    }
}
