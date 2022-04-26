//
//  ButtonWithTouchSize.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class ButtonWithTouchSize: UIButton {
    
    var touchAreaPadding: UIEdgeInsets?

    override func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
        guard let insets = touchAreaPadding else {
            return super.point(inside: point, with: event)
        }
        let rect = bounds.inset(by: insets.inverted())
        return rect.contains(point)
    }
    
    func setDefaultAreaPadding() {
        touchAreaPadding = UIEdgeInsets(top: 15, left: 15, bottom: 15, right: 15)
    }
}

extension UIEdgeInsets {

    func inverted() -> UIEdgeInsets {
        return UIEdgeInsets(top: -top,
                            left: -left,
                            bottom: -bottom,
                            right: -right)
    }
}
