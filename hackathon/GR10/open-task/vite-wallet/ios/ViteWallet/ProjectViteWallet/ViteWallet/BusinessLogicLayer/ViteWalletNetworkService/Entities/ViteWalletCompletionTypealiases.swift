//  ViteWalletCompletionTypealiases.swift
//  ViteWallet
//
//  Created by Антон Текутов on 08.07.2021.
//

import Alamofire

typealias LoginCompletion = (Result<LoginRequestResult, NetworkServiceError>) -> Void
typealias GetUserCoinsCompletion = (Result<GetUserCoinsRequestResult, NetworkServiceError>) -> Void

