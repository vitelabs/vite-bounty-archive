//
//  WalletViewModel.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

final class WalletViewModel {
    
	var output: WalletOutput?
    
    var viteWalletNetwork: ViteWalletNetworkServiceProtocol!

}

// MARK: - Configuration
extension WalletViewModel: CustomizableWalletViewModel {

}

// MARK: - Interface for view
extension WalletViewModel: WalletViewModelProtocol {

}

