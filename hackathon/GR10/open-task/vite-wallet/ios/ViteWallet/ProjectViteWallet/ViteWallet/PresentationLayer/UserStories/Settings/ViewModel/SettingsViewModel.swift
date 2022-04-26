//
//  SettingsViewModel.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation
import StoreKit

final class SettingsViewModel {
    
	var output: SettingsOutput?
    
    var purchaseManager: PurchaseManagerProtocol!
    var viteWalletNetwork: ViteWalletNetworkServiceProtocol!
}

// MARK: - Configuration
extension SettingsViewModel: CustomizableSettingsViewModel {

}

// MARK: - Interface for view
extension SettingsViewModel: SettingsViewModelProtocol {

    var termsOfUsageUrl: URL? {
        return purchaseManager.termsOfUsageUrl
    }
    var privacyPolicyUrl: URL? {
        return purchaseManager.privacyPolicyUrl
    }
    var supportUrl: URL? {
        return purchaseManager.supportUrl
    }

    func rateApp() {
        purchaseManager.rateApp()
    }
    
    func logOut() {
        viteWalletNetwork.logout {}
    }

}

