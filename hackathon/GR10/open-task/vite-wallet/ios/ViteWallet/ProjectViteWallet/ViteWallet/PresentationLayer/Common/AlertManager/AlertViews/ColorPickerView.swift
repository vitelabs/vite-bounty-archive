//
//  ColorPickerView.swift
//  Albomika
//
//  Created by Anton Tekutov on 07.07.21.
//  Copyright © 2020 inostudio. All rights reserved.
//

import UIKit

class ColorPickerView: UIView {
    
    let stack = UIStackView()
    let demoViewSide: CGFloat = 150
    let selectionViewSize: CGFloat = 22
    let selectionViewRadius: CGFloat = 60
    let colorsImage = UIImageView()
    let demoView = UIView()
    let selectionView = TouchClearUIView()
    let sliderWhite = UISlider()
    let sliderBlack = UISlider()
    
    var selectionCenterX: NSLayoutConstraint?
    var selectionCenterY: NSLayoutConstraint?
    
    var black: CGFloat {
        return CGFloat(sliderBlack.value)
    }
    
    var white: CGFloat {
        return CGFloat(sliderWhite.value)
    }
    
    var color = UIColor() {
        didSet {
            demoView.backgroundColor = color
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
    
    // MARK: - Public methods
    
    func setColor(_ color: UIColor) {
        demoView.backgroundColor = color
        let rgba = color.rgba
        let minComponent = min(rgba.red, min(rgba.green, rgba.blue))
        let maxComponent = max(rgba.red, max(rgba.green, rgba.blue))
        sliderWhite.value = Float(minComponent)
        sliderBlack.value = Float(1 - maxComponent)
        
        var angle: CGFloat = -.pi / 2
        if rgba.red > rgba.green && rgba.red >= rgba.blue {
            angle += rgba.blue >= rgba.green ? .pi * rgba.blue / 3 : .pi * -rgba.green / 3
        }
        if rgba.blue >= rgba.green && rgba.blue > rgba.red {
            angle += .pi * 2 / 3
            angle += rgba.green >= rgba.red ? .pi * rgba.green / 3 : .pi * -rgba.red / 3
        }
        if rgba.green >= rgba.red && rgba.green > rgba.blue {
            angle += .pi * 4 / 3
            angle += rgba.red >= rgba.blue ? .pi * rgba.red / 3 : .pi * -rgba.blue / 3
        }
        let x = selectionViewRadius * cos(angle)
        let y = selectionViewRadius * sin(angle)
        selectionCenterX!.constant = x
        selectionCenterY!.constant = y
        
        angle += .pi / 2
        var pickedColor = colorFromDegreesAngle(angle * 180 / .pi)
        selectionView.backgroundColor = pickedColor
        
        pickedColor = applyBlackWhiteModificatiors(pickedColor)
        self.color = pickedColor
    }
    
    // MARK: - Private methods

    private func colorFromDegreesAngle(_ angle: CGFloat) -> UIColor {
        
        var angle = Float(angle)
        while angle >= 360 { 
            angle -= 360 
        }
        while angle < 0 {
            angle += 360
        }
        
        let value = angle * 6 / 360
        
        let maxColorValue: Float = 1
        let minColorValue: Float = 0
        
        var red = minColorValue, blue = minColorValue, green = minColorValue
        switch value {
        case 0...1:
            red = maxColorValue
            blue = minColorValue + (maxColorValue - minColorValue) * value
            green = minColorValue
        case 1...2:
            red = maxColorValue - (maxColorValue - minColorValue) * (value - 1)
            blue = maxColorValue
            green = minColorValue
        case 2...3:
            red = minColorValue
            blue = maxColorValue
            green = minColorValue + (maxColorValue - minColorValue) * (value - 2)
        case 3...4:
            red = minColorValue
            blue = maxColorValue - (maxColorValue - minColorValue) * (value - 3)
            green = maxColorValue
        case 4...5:
            red = minColorValue + (maxColorValue - minColorValue) * (value - 4)
            blue = minColorValue
            green = maxColorValue
        case 5...6:
            red = maxColorValue
            blue = minColorValue
            green = maxColorValue - (maxColorValue - minColorValue) * (value - 5)
        default:
            break
        }
        return UIColor(red: CGFloat(red), 
                       green: CGFloat(green), 
                       blue: CGFloat(blue), 
                       alpha: 1)
    }
    
    private func putSelectionWithTouchPoint(_ touch: CGPoint) {
        let center = colorsImage.center
        let touchRelativePoint = CGPoint(x: touch.x - center.x, y: touch.y - center.y)
        let touchRadius = sqrt(touchRelativePoint.x * touchRelativePoint.x + touchRelativePoint.y * touchRelativePoint.y)
        let multiplyer = selectionViewRadius / touchRadius
        let x = touchRelativePoint.x * multiplyer
        let y = touchRelativePoint.y * multiplyer
        selectionView.center = CGPoint(x: x + center.x, y: y + center.y)
        
        var angle = atan(x / y) * 180 / .pi
        if y >= 0 {
            angle = 180 - angle
        } else {
            angle = x >= 0 ? -angle : 360 - angle
        }
        var pickedColor = colorFromDegreesAngle(angle)
        selectionView.backgroundColor = pickedColor
        
        pickedColor = applyBlackWhiteModificatiors(pickedColor)
        color = pickedColor
    }
    
    private func applyBlackWhiteModificatiors(_ color: UIColor) -> UIColor {
        return UIColor(red: max(min(color.rgba.red, 1 - black), white), 
                       green: max(min(color.rgba.green, 1 - black), white),
                       blue: max(min(color.rgba.blue, 1 - black), white),
                       alpha: color.rgba.alpha)
    }
    
    // MARK: - UI elements actions
    
    @objc func sliderValueChanged(slider: UISlider!) {
        let otherSlider = slider === sliderWhite ? sliderBlack : sliderWhite
        if slider.value + otherSlider.value > 1 {
            otherSlider.value = 1 - slider.value
        }
        if let selectedColor = selectionView.backgroundColor {
            color = applyBlackWhiteModificatiors(selectedColor)
        }
    }
    
    @objc private func handlePan(recognizer: UIPanGestureRecognizer) {
        let touch = recognizer.location(in: self)
        putSelectionWithTouchPoint(touch)
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        
        setupStackAndDemo()
        setupSliders()
        
        makeConstraints()
    }
    
    private func setupStackAndDemo() {
        
        addSubview(colorsImage)
        colorsImage.translatesAutoresizingMaskIntoConstraints = false
        colorsImage.layer.cornerRadius = demoViewSide / 2
        colorsImage.image = R.image.colorPicker()
        UIStyleManager.shadow(colorsImage)
        let panRecognizer = UIPanGestureRecognizer(target: self, action: #selector(handlePan(recognizer:)))
        colorsImage.isUserInteractionEnabled = true
        colorsImage.addGestureRecognizer(panRecognizer)
        
        addSubview(demoView)
        demoView.translatesAutoresizingMaskIntoConstraints = false
        demoView.layer.cornerRadius = demoViewSide / 4
        
        addSubview(selectionView)
        selectionView.translatesAutoresizingMaskIntoConstraints = false
        selectionView.layer.cornerRadius = selectionViewSize / 2
        selectionView.layer.borderColor = UIColor.white.cgColor
        selectionView.layer.borderWidth = 2
        
        addSubview(stack)
        stack.translatesAutoresizingMaskIntoConstraints = false
        stack.axis = .vertical
        stack.spacing = 15
    }
    
    private func setupSliders() {
        stack.addArrangedSubview(sliderWhite)
        sliderWhite.translatesAutoresizingMaskIntoConstraints = false
        sliderWhite.minimumValue = 0
        sliderWhite.maximumValue = 1
        sliderWhite.tintColor = .white
        sliderWhite.thumbTintColor = .white
        UIStyleManager.shadow(sliderWhite)
        sliderWhite.addTarget(self, action: #selector(sliderValueChanged(slider:)), for: .valueChanged)
        
        stack.addArrangedSubview(sliderBlack)
        sliderBlack.translatesAutoresizingMaskIntoConstraints = false
        sliderBlack.minimumValue = 0
        sliderBlack.maximumValue = 1
        sliderBlack.tintColor = .black
        sliderBlack.thumbTintColor = .black
        sliderBlack.addTarget(self, action: #selector(sliderValueChanged(slider:)), for: .valueChanged)
    }
    
    private func makeConstraints() {
        selectionCenterX = selectionView.centerXAnchor.constraint(equalTo: colorsImage.centerXAnchor, constant: selectionViewRadius)
        selectionCenterY = selectionView.centerYAnchor.constraint(equalTo: colorsImage.centerYAnchor, constant: selectionViewRadius)
        NSLayoutConstraint.activate([
            colorsImage.topAnchor.constraint(equalTo: topAnchor, constant: 10),
            colorsImage.centerXAnchor.constraint(equalTo: centerXAnchor),
            colorsImage.widthAnchor.constraint(equalToConstant: demoViewSide),
            colorsImage.heightAnchor.constraint(equalToConstant: demoViewSide),
            
            demoView.centerYAnchor.constraint(equalTo: colorsImage.centerYAnchor),
            demoView.centerXAnchor.constraint(equalTo: centerXAnchor),
            demoView.widthAnchor.constraint(equalToConstant: demoViewSide / 2),
            demoView.heightAnchor.constraint(equalToConstant: demoViewSide / 2),
            
            selectionView.heightAnchor.constraint(equalToConstant: selectionViewSize),
            selectionView.widthAnchor.constraint(equalToConstant: selectionViewSize),
            selectionCenterX!,
            selectionCenterY!,
            
            stack.topAnchor.constraint(equalTo: colorsImage.bottomAnchor, constant: 10),
            stack.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.85),
            stack.centerXAnchor.constraint(equalTo: centerXAnchor)
        ])
    }
}
