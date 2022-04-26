//
//  UIImageView+setDefaultLoadingInicator.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import SDWebImage
import UIKit

extension UIImageView {
    
    func setDefaultLoadingInicator() {
        sd_imageIndicator = SDWebImageActivityIndicator.white
    }
}
