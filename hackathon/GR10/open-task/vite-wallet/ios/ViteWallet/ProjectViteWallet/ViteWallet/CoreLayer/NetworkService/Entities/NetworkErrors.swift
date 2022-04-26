//
//  Errors.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import Alamofire

enum NetworkServiceError: Int, Error {
    case cannotParceData
    case unknown
    case badToken = 201
    case badRoute = 404
    case badRequestDataFormat = 500
    
    var localizedDescription: String {
        switch self {
        case .cannotParceData:
            return R.string.localizable.cannotParceData()
        case .unknown:
            return R.string.localizable.unknownError()
        case .badToken:
            return R.string.localizable.badToken()
        case .badRoute:
            return R.string.localizable.badRoute()
        case .badRequestDataFormat:
            return R.string.localizable.badRequestDataFormat()
        }
    }
}

enum RequestBuildError: Error {
    case cannotCreateUrl
}
