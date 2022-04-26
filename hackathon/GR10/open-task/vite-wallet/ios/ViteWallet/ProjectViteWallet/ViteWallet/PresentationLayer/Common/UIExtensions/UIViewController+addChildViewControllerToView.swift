//
//  UIViewController+addChildViewControllerToView.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UIViewController {
    
    func addChildViewControllerToView(vc: UIViewController, into containerView: UIView) {
        self.addChild(vc)
        containerView.addSubview(vc.view)
        vc.view.frame = containerView.bounds
        vc.view.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            vc.view.topAnchor.constraint(equalTo: containerView.topAnchor),
            vc.view.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
            vc.view.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            vc.view.trailingAnchor.constraint(equalTo: containerView.trailingAnchor)
        ])
        
        vc.didMove(toParent: self)
    }
}
