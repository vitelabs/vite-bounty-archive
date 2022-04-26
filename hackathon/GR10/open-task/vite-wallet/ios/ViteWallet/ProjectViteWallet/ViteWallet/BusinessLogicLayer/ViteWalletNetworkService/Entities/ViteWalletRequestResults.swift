//  ViteWalletRequestResults.swift
//  ViteWallet
//
//  Created by Антон Текутов on 08.07.2021.
//
//  Codable result structures

import Foundation

struct LoginRequestResult: Codable {
    let token: String
    let address: String
    let code: Int
}

struct GetUserCoinsRequestResult: Codable {
    let items: [CoinItem]
    let total: Int
}

struct CoinItem: Codable {
    let id: Int
    let type: String
    let address: String
}
