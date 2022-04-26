//  ViteWalletNetworkServiceProtocol.swift
//  ViteWallet
//
//  Created by Антон Текутов on 08.07.2021.
//

import Foundation

protocol ViteWalletNetworkServiceProtocol: AnyObject {
    
    func login(email: String, password: String, completion: @escaping LoginCompletion)
    func logout(completion: @escaping() -> Void)
    func getUserCoins(page: Int, completion: @escaping GetUserCoinsCompletion)
}

