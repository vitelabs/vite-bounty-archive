//
//  TitledView.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

class TitledView: UIView {
    
    let title = UILabel()
    
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
        
        addSubview(title)
        title.translatesAutoresizingMaskIntoConstraints = false
        title.font = .res.avertaCYSemibold(size: 18)
        title.textColor = .res.tintLight()
        
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            title.leftAnchor.constraint(equalTo: leftAnchor, constant: 24),
            title.rightAnchor.constraint(equalTo: rightAnchor, constant: -24),
            title.centerYAnchor.constraint(equalTo: topAnchor, constant: .res.navigationBarCenterY)
        ])
    }
}
