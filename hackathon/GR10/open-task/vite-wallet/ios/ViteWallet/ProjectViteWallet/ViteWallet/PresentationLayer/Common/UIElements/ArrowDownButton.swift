//
//  ArrowDownButton.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class ArrowDownButton: UIButton {
    
    let arrow = UIImageView(image: R.image.arrowDown())
    let label = UILabel()
    
    var text: String? {
        get {
            label.text
        }
        set {
            label.text = newValue
        }
    }
    
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
        
        UIStyleManager.textDefaultInput(self, addHeightConstraint: false)
        
        addSubview(label)
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = .res.avertaCYBold(size: 14)
        label.textColor = R.color.tintDark()
        label.numberOfLines = 0
        
        addSubview(arrow)
        arrow.translatesAutoresizingMaskIntoConstraints = false
        arrow.contentMode = .scaleAspectFit
        arrow.tintColor = R.color.tintDark()
        
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            arrow.centerYAnchor.constraint(equalTo: centerYAnchor),
            arrow.widthAnchor.constraint(equalToConstant: 12),
            arrow.rightAnchor.constraint(equalTo: rightAnchor, constant: -24),
            
            label.centerYAnchor.constraint(equalTo: centerYAnchor),
            label.leftAnchor.constraint(equalTo: leftAnchor, constant: 24),
            label.rightAnchor.constraint(equalTo: arrow.leftAnchor, constant: -24),
            
            heightAnchor.constraint(equalTo: label.heightAnchor, constant: 34)
        ])
    }
}
