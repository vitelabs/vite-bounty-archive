//
//  MainMenuCoordinator.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class MainMenuCoordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((CustomizableMainMenuViewModel) -> Void)? = nil) -> UIViewController {
        let view = MainMenuViewController()
        let viewModel = MainMenuViewModel()
        let coordinator = MainMenuCoordinator()

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
extension MainMenuCoordinator: MainMenuCoordinatorProtocol {
    
    func generateWalletModule() -> UIViewController {
        let vc = WalletCoordinator.createModule()
        return vc
    }
    
    func generateHistoryModule() -> UIViewController {
        let vc = HistoryCoordinator.createModule()
        return vc
    }
    
    func generateSettingsModule() -> UIViewController {
        let vc = SettingsCoordinator.createModule()
        return vc
    }
}
