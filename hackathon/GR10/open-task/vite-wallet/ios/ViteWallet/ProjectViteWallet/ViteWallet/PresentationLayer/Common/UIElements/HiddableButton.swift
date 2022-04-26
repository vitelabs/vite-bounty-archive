//
//  HiddableButton.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class HiddableButton: UIView {
    
    let backgroundImage = UIImageView(image: R.image.fade())
    let button = ButtonWithTouchSize()
    
    override func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
        let inside = super.point(inside: point, with: event)
        if inside {
            let pointInSubview = button.convert(point, from: self)
            if button.point(inside: pointInSubview, with: event) {
                return true
            }
        }

        return false
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }
    
    // MARK: - Public methods
    
    func manageVisibility(hidden: Bool, animated: Bool = true) {
        if animated {
            UIView.animate(withDuration: 0.6) { [ weak self ] in
                self?.backgroundImage.transform = .init(translationX: 0, y: hidden ? 150 : 0)
            }
            UIView.animate(withDuration: 0.3) { [ weak self ] in
                self?.button.transform = .init(translationX: 0, y: hidden ? 150 : 0)
            }
        } else {
            backgroundImage.transform = .init(translationX: 0, y: hidden ? 150 : 0)
            button.transform = .init(translationX: 0, y: hidden ? 150 : 0)
        }
    }
    
    // MARK: - UI elements actions

    @objc private func buttonDidTapped(sender: ButtonWithTouchSize) {
        sender.tapAnimation()
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        translatesAutoresizingMaskIntoConstraints = false
        layer.masksToBounds = true
        
        addSubview(backgroundImage)
        backgroundImage.translatesAutoresizingMaskIntoConstraints = false
        backgroundImage.contentMode = .scaleToFill
        
        addSubview(button)
        UIStyleManager.buttonPrimary(button)
        button.setTitle(R.string.localizable.choose(), for: .normal)
        button.addTarget(self, action: #selector(buttonDidTapped(sender:)), for: .touchUpInside)
        
        manageVisibility(hidden: true, animated: false)
        
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 150),
            
            button.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -32),
            button.centerXAnchor.constraint(equalTo: centerXAnchor),
            button.widthAnchor.constraint(equalTo: widthAnchor, constant: -48),
            
            backgroundImage.heightAnchor.constraint(equalToConstant: 120),
            backgroundImage.bottomAnchor.constraint(equalTo: bottomAnchor),
            backgroundImage.centerXAnchor.constraint(equalTo: centerXAnchor),
            backgroundImage.widthAnchor.constraint(equalTo: widthAnchor)
        ])
    }
}
