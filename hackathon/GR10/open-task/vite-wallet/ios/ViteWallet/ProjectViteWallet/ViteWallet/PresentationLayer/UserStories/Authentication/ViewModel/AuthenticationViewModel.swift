//
//  AuthenticationViewModel.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

final class AuthenticationViewModel {
    
	var output: AuthenticationOutput?
    
    var viteWalletNetwork: ViteWalletNetworkServiceProtocol!

}

// MARK: - Configuration
extension AuthenticationViewModel: CustomizableAuthenticationViewModel {

}

// MARK: - Interface for view
extension AuthenticationViewModel: AuthenticationViewModelProtocol {

    func signIn(email: String, password: String, completion: @escaping(Result<Void, NetworkServiceError>) -> Void) {
        viteWalletNetwork.login(email: email, password: password) { result in
            switch result {
            case .success:
                completion(.success(()))

            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}

