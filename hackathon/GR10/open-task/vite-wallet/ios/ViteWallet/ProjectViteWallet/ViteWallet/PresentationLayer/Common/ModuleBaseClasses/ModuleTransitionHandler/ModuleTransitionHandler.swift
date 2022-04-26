//
//  ModuleTransitionHandler.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

protocol ModuleTransitionHandler: AnyObject {
    
    func dismissSelf(animated: Bool, completionHandler: (() -> Void)?)
    func present(_ viewControllerToPresent: UIViewController, animated flag: Bool, completion: (() -> Void)?)
    func showInRootNavigationController(controller: UIViewController, completionHandler: ((Bool) -> Void)?)
    func showInNavigationController(controller: UIViewController, completionHandler: ((Bool) -> Void)?)
    func presentInNewRootNavigationStack(controller: UIViewController, animated: Bool, completionHandler: ((Bool) -> Void)?)
    func popToRootViewController(animated: Bool, completionHandler: ((Bool) -> Void)?)
}

extension ModuleTransitionHandler {
    
    func dismissSelf() {
        dismissSelf(animated: true, completionHandler: nil)
    }
    
    func present(_ viewControllerToPresent: UIViewController) {
        present(viewControllerToPresent, animated: true, completion: nil)
    }

    func showInRootNavigationController(_ controller: UIViewController) {
        showInRootNavigationController(controller: controller, completionHandler: nil)
    }
    
    func showInNavigationController(_ controller: UIViewController) {
        showInRootNavigationController(controller: controller, completionHandler: nil)
    }
    
    func showInNewRootNavigationStack(controller: UIViewController, animated: Bool = true) {
        presentInNewRootNavigationStack(controller: controller, animated: animated, completionHandler: nil)
    }
    
    func popToRootViewController() {
        popToRootViewController(animated: true, completionHandler: nil)
    }

}
