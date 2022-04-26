//
//  WalletInput.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

protocol CustomizableWalletViewModel: AnyObject {
    
    var output: WalletOutput? { get set }
}