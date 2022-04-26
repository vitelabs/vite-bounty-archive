//
//  WalletView.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class WalletView: UIView {
    
    let title = UILabel()
    let titleLogo = UIImageView(image: .res.walletLogo())
    let glow = GlowView()
    let mockUp = UIImageView(image: .res.walletMockUp())
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        backgroundColor = .res.background()
        
        addSubview(glow)
        glow.translatesAutoresizingMaskIntoConstraints = false
        
        addSubview(titleLogo)
        titleLogo.translatesAutoresizingMaskIntoConstraints = false
        
        addSubview(title)
        title.translatesAutoresizingMaskIntoConstraints = false
        title.font = .res.avertaCYSemibold(size: 18)
        title.textColor = .res.tintLight()
        title.text = .res.walletTitle()
        
        addSubview(mockUp)
        mockUp.translatesAutoresizingMaskIntoConstraints = false
        
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            title.leftAnchor.constraint(equalTo: leftAnchor, constant: 64),
            title.rightAnchor.constraint(equalTo: rightAnchor, constant: -24),
            title.centerYAnchor.constraint(equalTo: topAnchor, constant: .res.navigationBarCenterY),
            
            titleLogo.widthAnchor.constraint(equalToConstant: 36),
            titleLogo.heightAnchor.constraint(equalToConstant: 36),
            titleLogo.leftAnchor.constraint(equalTo: leftAnchor, constant: 24),
            titleLogo.centerYAnchor.constraint(equalTo: title.centerYAnchor),
            
            glow.centerXAnchor.constraint(equalTo: leftAnchor, constant: .res.screenBounds.width * 0.25),
            glow.centerYAnchor.constraint(equalTo: topAnchor, constant: .res.screenBounds.height * 0.25),
            glow.widthAnchor.constraint(equalToConstant: .res.screenBounds.width),
            glow.heightAnchor.constraint(equalToConstant: .res.screenBounds.width),
            
            mockUp.topAnchor.constraint(equalTo: safeAreaLayoutGuide.topAnchor),
            mockUp.leftAnchor.constraint(equalTo: leftAnchor),
            mockUp.rightAnchor.constraint(equalTo: rightAnchor)
        ])
    }
}
