//
//  UIConstants.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

struct UIConstants {

    static let statusBarHeight: CGFloat = {
        return UIApplication.shared.statusBarFrame.size.height
    }()

    static let navigationBarHeight: CGFloat = {
        let navController = UINavigationController()
        let height = navController.navigationBar.bounds.height + statusBarHeight
        return height
    }()

    static let navigationBarCenterY: CGFloat = {
        return statusBarHeight + (UIConstants.navigationBarHeight - UIConstants.statusBarHeight) / 2
    }()
    
    static let screenBounds: CGRect = {
        return UIScreen.main.bounds
    }()
    
    static let widthDesignCoefficient: CGFloat = {
        UIConstants.screenBounds.width / 375
    }()
    
    static let heightDesignCoefficient: CGFloat = {
        UIConstants.screenBounds.height / 812
    }()
    
    static let customTabBarHeight: CGFloat = {
        return 64 + (UIApplication.shared.keyWindow?.safeAreaInsets.bottom ?? 0)
    }()
}
