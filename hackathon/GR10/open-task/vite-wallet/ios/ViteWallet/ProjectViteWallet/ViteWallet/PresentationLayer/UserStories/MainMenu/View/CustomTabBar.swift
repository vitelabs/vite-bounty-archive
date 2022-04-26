//
//  CustomTabBar.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

protocol CustomTabBarSelectionDelegate: AnyObject {
    
    func selectionDidChange(oldSelectedIndex: Int, newSelectedIndex: Int)
}

class CustomTabBar: UIImageView {
    
    var buttons = [ButtonWithTouchSize]()
    let barButtonImages: [UIImage?] = [.res.menuHistory(), .res.menuWallet(), .res.menuSettings()]
    
    var selectedIndex = -1 {
        didSet {
            selectionDelegate?.selectionDidChange(oldSelectedIndex: oldValue, newSelectedIndex: selectedIndex)
        }
    }
    var selectedColor = R.color.tintMain()
    var unselectedColor: UIColor? {
        return R.color.tintGray()
    }
    var duration: TimeInterval = 0.2
    weak var selectionDelegate: CustomTabBarSelectionDelegate?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }
    
    // MARK: - Public methods
    
    func setSelectedIndex(index: Int, animated: Bool = true) {
        guard index >= 0,
              index < buttons.count,
              selectedIndex != index
        else { return }
        selectedIndex = index
    }
    
    func refreshSelection(animated: Bool = true) {
        for i in 0 ..< 3 {
            if i == selectedIndex {
                makeButtonSelected(button: buttons[i], animated: animated)
            } else {
                makeButtonUnselected(button: buttons[i], animated: animated)
            }
        }
    }
    
    // MARK: - UI elements actions
    
    @objc private func buttonTapped(button: ButtonWithTouchSize) {
        button.tapAnimation()
        guard let index = buttons.firstIndex(of: button),
              index != selectedIndex
        else { return }
        setSelectedIndex(index: index)
        refreshSelection()
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        
//        image = R.image.tabBarBackground()
//        tintColor = R.color.primaryBackground()
        isUserInteractionEnabled = true
        
        backgroundColor = .res.background()
        
        setupButtons()

        makeConstraints()
    }
    
    private func setupButtons() {
        for i in 0 ..< 3 {
            let button = ButtonWithTouchSize()
            buttons.append(button)
            addSubview(button)
            button.translatesAutoresizingMaskIntoConstraints = false
            button.setImage(barButtonImages[i], for: .normal)
            button.setImage(barButtonImages[i], for: .selected)
            button.setImage(barButtonImages[i], for: .highlighted)
            button.tintColor = selectedColor
            button.touchAreaPadding = UIEdgeInsets(top: 10, left: 35, bottom: 50, right: 35)
            button.addTarget(self, action: #selector(buttonTapped(button:)), for: .touchUpInside)
        }
    }
    
    private func makeButtonSelected(button: ButtonWithTouchSize, animated: Bool = true) {
        let action = { [ weak self ] in
            button.tintColor = self?.selectedColor
        }
        if animated {
            UIView.animate(withDuration: duration, animations: action)
        } else {
            action()
        }
    }
    
    private func makeButtonUnselected(button: ButtonWithTouchSize, animated: Bool = true) {
        let action = { [ weak self ] in
            button.tintColor = self?.unselectedColor
        }
        if animated {
            UIView.animate(withDuration: duration, animations: action)
        } else {
            action()
        }
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            buttons[0].widthAnchor.constraint(equalToConstant: 24),
            buttons[0].heightAnchor.constraint(equalToConstant: 24),
            buttons[0].topAnchor.constraint(equalTo: topAnchor, constant: 20),
            buttons[0].leftAnchor.constraint(equalTo: leftAnchor, constant: 60),
            
            buttons[1].widthAnchor.constraint(equalToConstant: 42),
            buttons[1].heightAnchor.constraint(equalToConstant: 42),
            buttons[1].topAnchor.constraint(equalTo: topAnchor, constant: 12),
            buttons[1].centerXAnchor.constraint(equalTo: centerXAnchor),
            
            buttons[2].widthAnchor.constraint(equalToConstant: 24),
            buttons[2].heightAnchor.constraint(equalToConstant: 24),
            buttons[2].topAnchor.constraint(equalTo: topAnchor, constant: 20),
            buttons[2].rightAnchor.constraint(equalTo: rightAnchor, constant: -60)
        ])
    }
}

