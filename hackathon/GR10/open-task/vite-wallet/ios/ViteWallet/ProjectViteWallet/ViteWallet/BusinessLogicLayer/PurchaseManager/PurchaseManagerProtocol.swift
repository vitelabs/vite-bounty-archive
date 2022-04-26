//
//  PurchaseManagerProtocol.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation

protocol PurchaseManagerProtocol: AnyObject {
    
    var termsOfUsageUrl: URL? { get }
    var privacyPolicyUrl: URL? { get }
    var supportUrl: URL? { get }
    
    func rateApp()    
}
