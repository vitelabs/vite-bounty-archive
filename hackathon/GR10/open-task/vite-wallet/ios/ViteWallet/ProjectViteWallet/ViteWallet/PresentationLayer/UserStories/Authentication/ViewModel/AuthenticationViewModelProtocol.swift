//
//  AuthenticationViewModelProtocol.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

protocol AuthenticationViewModelProtocol: AnyObject {
    
    func signIn(email: String, password: String, completion: @escaping(Result<Void, NetworkServiceError>) -> Void)
}
