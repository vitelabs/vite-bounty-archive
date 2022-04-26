//
//  WalletCoordinator.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class WalletCoordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((CustomizableWalletViewModel) -> Void)? = nil) -> UIViewController {
        let view = WalletViewController()
        let viewModel = WalletViewModel()
        let coordinator = WalletCoordinator()

        view.viewModel = viewModel
        view.coordinator = coordinator

        coordinator.transition = view

        viewModel.viteWalletNetwork = ViteWalletNetworkService.shared

        if let configuration = configuration {
            configuration(viewModel)
        }

        return view
    }
}

// MARK: - Interface for view
extension WalletCoordinator: WalletCoordinatorProtocol {

}
