//
//  AboutUsViewModel.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

final class AboutUsViewModel {
	var output: AboutUsOutput?
}

// MARK: - Configuration
extension AboutUsViewModel: CustomizableAboutUsViewModel {

}

// MARK: - Interface for view
extension AboutUsViewModel: AboutUsViewModelProtocol {

}

