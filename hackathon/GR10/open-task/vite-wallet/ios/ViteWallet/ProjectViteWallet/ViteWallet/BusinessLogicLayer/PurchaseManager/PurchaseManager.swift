//
//  PurchaseManager.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import StoreKit

class PurchaseManager: PurchaseManagerProtocol {
    
    static let shared: PurchaseManagerProtocol = PurchaseManager()
        
    var termsOfUsageUrl: URL? {
        return URL(string: "https://github.com/FarFlare/vite-wallet/")
    }
    
    var privacyPolicyUrl: URL? {
        return URL(string: "https://github.com/FarFlare/vite-wallet/")
    }
    
    var supportUrl: URL? {
        return URL(string: "https://github.com/FarFlare/vite-wallet/")
    }
    
    func rateApp() {
        SKStoreReviewController.requestReview()
    }
}
