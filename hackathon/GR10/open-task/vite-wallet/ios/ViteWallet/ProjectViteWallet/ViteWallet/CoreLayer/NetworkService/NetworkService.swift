//
//  NetworkService.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import Alamofire

class NetworkService {
    
    internal final func makeDefaultRequest<T: Codable>(dataRequest: DataRequestExecutable, completion: @escaping DefaultRequestCompletion<T>) {
        dataRequest.execute
            .response { response in
                switch response.result {
                case .success:
                    guard let data = response.data,
                          let parcedData: T = DataParser.parse(data: data)
                    else { completion(.failure(.cannotParceData)); return }
                    completion(.success(parcedData))
                    
                case .failure:
                    if let code = response.error?.responseCode,
                       let error = NetworkServiceError(rawValue: code) {
                        completion(.failure(error))
                    }
                    else {
                        completion(.failure(.unknown))
                        return
                    }
                }
            }
    }
}
