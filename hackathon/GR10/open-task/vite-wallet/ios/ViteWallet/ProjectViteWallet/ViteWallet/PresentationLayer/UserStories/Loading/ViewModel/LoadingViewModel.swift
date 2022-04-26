//
//  LoadingViewModel.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

final class LoadingViewModel {
    
	var output: LoadingOutput?
    
    var viteWalletNetwork: ViteWalletNetworkServiceProtocol!
    
}

// MARK: - Configuration
extension LoadingViewModel: CustomizableLoadingViewModel {

}

// MARK: - Interface for view
extension LoadingViewModel: LoadingViewModelProtocol {
    
    func startConfiguration() {
        
    }
    
    func checkActiveUser(_ completion: @escaping(Bool) -> Void) {
        viteWalletNetwork.getUserCoins(page: 1) { result in
            switch result {
            case .success(let data):
                print(data)
                completion(true)
                
            case .failure:
                completion(false)
            }
            
        }
    }
}

