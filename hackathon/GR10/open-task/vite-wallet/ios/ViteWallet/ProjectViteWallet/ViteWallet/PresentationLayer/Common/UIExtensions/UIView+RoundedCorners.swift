//
//  UIView+RoundedCorners.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UIView {
    
    func roundCorners(corners: CACornerMask, radius: CGFloat = 8) {
        clipsToBounds = true
        layer.cornerRadius = radius
        layer.maskedCorners = corners
    }
}
