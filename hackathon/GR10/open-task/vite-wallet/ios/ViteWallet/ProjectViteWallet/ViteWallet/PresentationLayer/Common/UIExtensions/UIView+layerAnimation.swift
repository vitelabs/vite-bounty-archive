//
//  UIView+layerAnimation.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UIView {
    
    func animateLayer<Value>(_ keyPath: WritableKeyPath<CALayer, Value>, to value: Value, duration: CFTimeInterval) {
        let keyString = NSExpression(forKeyPath: keyPath).keyPath
        let animation = CABasicAnimation(keyPath: keyString)
        animation.fromValue = layer[keyPath: keyPath]
        animation.toValue = value
        animation.duration = duration
        layer.add(animation, forKey: animation.keyPath)
        var thelayer = layer
        thelayer[keyPath: keyPath] = value
    }
}
