//
//  AppRouter.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

protocol AppRouter: AnyObject {

	var window: UIWindow! { get set }
    
    func handleLaunch()
}
