//  ViteWalletNetworkService.swift
//  ViteWallet
//
//  Created by Антон Текутов on 08.07.2021.
//

import Alamofire

class ViteWalletNetworkService: NetworkService {
    
    static let shared: ViteWalletNetworkServiceProtocol = ViteWalletNetworkService()
    
    private let requestBuilder = ViteWalletRequestBuilder.self
    
    var userToken: String? {
        didSet {
            saveTokenInStorrage()
        }
    }
    
    override init() {
        super.init()
        
        let storrage = SecureStorage.shared
        userToken = storrage.getStringValue(for: .userToken)
    }
    
    private func saveTokenInStorrage() {
        guard let userToken = userToken
        else { return }
        
        let storrage = SecureStorage.shared
        try? storrage.set(userToken, for: .userToken)
    }
}

extension ViteWalletNetworkService: ViteWalletNetworkServiceProtocol {
    
    func login(email: String, password: String, completion: @escaping LoginCompletion) {
        let request = requestBuilder.login(email: email, password: password)
        let loginResultHandler: LoginCompletion = { [ weak self ] result in
            guard let self = self
            else { return }
            
            switch result {
            case .success(let data):
                self.userToken = data.token
                
            case .failure(let error):
                print(error)
            }
            completion(result)
        }
        
        makeDefaultRequest(dataRequest: request, completion: loginResultHandler)
    }
    
    func logout(completion: @escaping() -> Void) {
        userToken = nil
        let storrage = SecureStorage.shared
        try? storrage.deleteValue(for: .userToken)
    }
    
    func getUserCoins(page: Int, completion: @escaping GetUserCoinsCompletion) {
        guard let token = userToken
        else {
            completion(.failure(.badToken))
            return
        }
        
        let request = requestBuilder.getUserCouns(token: token, page: page)
        makeDefaultRequest(dataRequest: request, completion: completion)
    }

}
