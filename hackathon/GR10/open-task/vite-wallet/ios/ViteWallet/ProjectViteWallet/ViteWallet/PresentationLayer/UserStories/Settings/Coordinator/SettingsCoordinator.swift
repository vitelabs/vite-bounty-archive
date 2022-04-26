//
//  SettingsCoordinator.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class SettingsCoordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((CustomizableSettingsViewModel) -> Void)? = nil) -> UIViewController {
        let view = SettingsViewController()
        let viewModel = SettingsViewModel()
        let coordinator = SettingsCoordinator()

        view.viewModel = viewModel
        view.coordinator = coordinator

        coordinator.transition = view
        
        viewModel.viteWalletNetwork = ViteWalletNetworkService.shared
        
        viewModel.purchaseManager = PurchaseManager.shared

        if let configuration = configuration {
            configuration(viewModel)
        }

        return view
    }
}

// MARK: - Interface for view
extension SettingsCoordinator: SettingsCoordinatorProtocol {

}
