//
//  AuthenticationInput.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

protocol CustomizableAuthenticationViewModel: AnyObject {
    
    var output: AuthenticationOutput? { get set }
}