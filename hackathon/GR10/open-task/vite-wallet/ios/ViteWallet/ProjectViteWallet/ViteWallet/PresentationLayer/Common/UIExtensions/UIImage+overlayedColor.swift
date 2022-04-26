//
//  UIImage+overlayedColor.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UIImage {

    func overlayed(by overlayColor: UIColor) -> UIImage {
        //  Create rect to fit the image
        let rect = CGRect(x: 0, y: 0, width: self.size.width, height: self.size.height)

        // Create image context. 0 means scale of device's main screen
        UIGraphicsBeginImageContextWithOptions(rect.size, false, 0)
        let context = UIGraphicsGetCurrentContext()!

        //  Fill the rect by the final color
        overlayColor.setFill()
        context.fill(rect)

        //  Make the final shape by masking the drawn color with the images alpha values
        self.draw(in: rect, blendMode: .destinationIn, alpha: 1)

        //  Create new image from the context
        let overlayedImage = UIGraphicsGetImageFromCurrentImageContext()!

        //  Release context
        UIGraphicsEndImageContext()

        return overlayedImage
    }
}
