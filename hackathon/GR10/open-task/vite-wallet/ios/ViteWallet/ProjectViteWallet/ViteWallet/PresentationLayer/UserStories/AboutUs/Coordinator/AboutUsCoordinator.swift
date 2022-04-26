//
//  AboutUsCoordinator.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class AboutUsCoordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((CustomizableAboutUsViewModel) -> Void)? = nil) -> UIViewController {
        let view = AboutUsViewController()
        let viewModel = AboutUsViewModel()
        let coordinator = AboutUsCoordinator()

        view.viewModel = viewModel
        view.coordinator = coordinator

        coordinator.transition = view

        if let configuration = configuration {
            configuration(viewModel)
        }

        return view
    }
}

// MARK: - Interface for view
extension AboutUsCoordinator: AboutUsCoordinatorProtocol {

}