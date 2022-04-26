//
//  SettingsTableViewCell.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class SettingsTableViewCell: UITableViewCell {
    
    static var identifier: String {
        String(describing: self)
    }
    
    private var animationStartTime = Date()

//    var backgroundViewSelected = UIView()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }
    
    // MARK: - Public methods
    
    func setContent(_ content: MenuRow) {
        imageView?.image = content.image
        textLabel?.text = content.title
        
        textLabel?.textColor = .res.tintLight()

        setDisclosure(toColour: .res.tintLight()!)
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        setDisclosure(toColour: .res.tintLight()!)
        
        layer.masksToBounds = true
        backgroundColor = .res.background()
        imageView?.tintColor = .res.tintMain()
        textLabel?.font = .res.avertaCYSemibold(size: 14)
        textLabel?.textColor = .res.tintLight()
        accessoryType = .disclosureIndicator
        imageView?.contentMode = .scaleAspectFit
        
        let clearView = UIView()
        clearView.backgroundColor = .clear
        selectedBackgroundView = clearView
                
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            
        ])
    }
}

extension UITableViewCell {

    func setDisclosure(toColour: UIColor) {
        for view in self.subviews {
            if let disclosure = view as? UIButton {
                if let image = disclosure.backgroundImage(for: .normal) {
                    let colouredImage = image.withRenderingMode(.alwaysTemplate)
                    disclosure.setImage(colouredImage, for: .normal)
                    disclosure.tintColor = toColour
                }
            }
        }
    }
}
