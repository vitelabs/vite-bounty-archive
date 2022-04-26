//
//  UIButton+setContentForAllStates.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UIButton {
    
    func setImage(_ image: UIImage?) {
        let cases: [UIControl.State] = [
            .normal,
            .highlighted,
            .disabled,
            .selected,
            .focused,
            .reserved
        ]
        for state in cases {
            setImage(image, for: state)
        }
        
    }
    
    func setTitle(_ string: String?) {
        let cases: [UIControl.State] = [
            .normal,
            .highlighted,
            .disabled,
            .selected,
            .focused,
            .reserved
        ]
        for state in cases {
            setTitle(string, for: state)
        }
    }
}
