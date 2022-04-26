//
//  GlowView.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class GlowView: UIImageView {
    
    init() {
        super.init(image: nil)
        setupView()
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
    
    func startAnimation() {
        transform = CGAffineTransform.identity
        UIView.transition(with: self,
                          duration: 0.7,
                          options: [.autoreverse, .repeat]) { [ weak self ] in
            self?.transform = .init(scaleX: 1.3, y: 1.3)
        }
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        image = .res.glow()
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            
        ])
    }
}
