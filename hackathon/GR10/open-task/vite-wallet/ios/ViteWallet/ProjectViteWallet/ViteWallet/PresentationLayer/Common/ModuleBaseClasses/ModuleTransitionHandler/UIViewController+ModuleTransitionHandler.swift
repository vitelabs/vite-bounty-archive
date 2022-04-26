//
//  UIViewController+ModuleTransitionHandler.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UIViewController: ModuleTransitionHandler {
    
    func dismissSelf(animated: Bool, completionHandler: (() -> Void)?) {
        if let navigation = navigationController {
            if navigation.topViewController == self {
                navigation.popViewController(animated: animated)
            } else {
                navigation.viewControllers.removeAll(where: { $0 === self })
            }
        } else {
            dismiss(animated: animated, completion: completionHandler)
        }
    }

    func showInRootNavigationController(controller: UIViewController, completionHandler: ((Bool) -> Void)?) {
        guard let root = UIApplication.shared.keyWindow?.rootViewController
        else {
            completionHandler?(false)
            return
        }
        
        root.show(controller, sender: nil)
        completionHandler?(true)
    }
    
    func showInNavigationController(controller: UIViewController, completionHandler: ((Bool) -> Void)?) {
        guard let nc = navigationController
        else {
            completionHandler?(false)
            return
        }
        
        nc.show(controller, sender: nil)
        completionHandler?(true)
    }

    func presentInNewRootNavigationStack(controller: UIViewController, animated: Bool, completionHandler: ((Bool) -> Void)?) {
        guard let keyWindow = UIApplication.shared.keyWindow
        else {
            completionHandler?(false)
            return
        }
        
        let rootVC = UINavigationController(rootViewController: controller)
        UIStyleManager.navigationControllerTransparent(rootVC)
        
        if animated {
            UIView.transition(with: keyWindow, duration: 0.5, options: .transitionCrossDissolve) {}
        }
        
        keyWindow.rootViewController = rootVC
        completionHandler?(true)
    }
    
    func popToRootViewController(animated: Bool, completionHandler: ((Bool) -> Void)?) {
        guard let nc = navigationController
        else {
            completionHandler?(false)
            return
        }
        nc.popToRootViewController(animated: true)

        completionHandler?(true)
    }
}
