//
//  HistoryCoordinator.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class HistoryCoordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((CustomizableHistoryViewModel) -> Void)? = nil) -> UIViewController {
        let view = HistoryViewController()
        let viewModel = HistoryViewModel()
        let coordinator = HistoryCoordinator()

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
extension HistoryCoordinator: HistoryCoordinatorProtocol {

}