//
//  MainMenuViewModel.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

final class MainMenuViewModel {
	var output: MainMenuOutput?
}

// MARK: - Configuration
extension MainMenuViewModel: CustomizableMainMenuViewModel {

}

// MARK: - Interface for view
extension MainMenuViewModel: MainMenuViewModelProtocol {

}

