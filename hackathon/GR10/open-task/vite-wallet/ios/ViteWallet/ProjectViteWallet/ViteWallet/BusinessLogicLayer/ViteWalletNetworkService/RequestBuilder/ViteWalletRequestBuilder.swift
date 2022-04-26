//  ViteWalletRequestBuilder.swift
//  ViteWallet
//
//  Created by Антон Текутов on 08.07.2021.
//

import Alamofire

enum ViteWalletRequestBuilder {
    
    case login(email: String,
               password: String)
    case getUserCouns(token: String,
                      page: Int)
}

extension ViteWalletRequestBuilder: DataRequestExecutable {
    
    var execute: DataRequest {
        switch self {
        
        case .login(email: let email, password: let password):
            let parameters: [String: Any] = [
                "email": email,
                "password": password
            ]
            
            return AF.request(ViteWalletRoutes.login, method: .post, parameters: parameters, encoding: JSONEncoding.default)
            
        case .getUserCouns(token: let token, page: let page):
            //        TODO: pagination

            let parameters: [String: Any] = [
                "token": token,
                "type": "token"
            ]
            
            return AF.request(ViteWalletRoutes.save, method: .get, parameters: parameters)
        }
    }
}
