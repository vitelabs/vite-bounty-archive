//  ViteWalletRoutes.swift
//  ViteWallet
//
//  Created by Антон Текутов on 08.07.2021.
//

import Alamofire

enum ViteWalletRoutes: String, URLConvertible {
    
    static let endpoint = "http://139.59.228.158:8080"
    
    case save = "/save"
    case login = "/login"

    func asURL() throws -> URL {
        guard let url = URL(string: ViteWalletRoutes.endpoint + self.rawValue)
        else { throw RequestBuildError.cannotCreateUrl }
        return url
    }
    
    static func makeAuthHeadersFromToken(token: String, contentType: ContentType? = nil) -> HTTPHeaders {
        if let contentType = contentType {
            return [
                "Authorization": "Token \(token)",
                "Content-Type": contentType.rawValue
            ]
        } else {
            return ["Authorization": "Token \(token)"]
        }
    }
}

enum ContentType: String {
    case json = "application/json"
    case formData = "multipart/form-data"
}
