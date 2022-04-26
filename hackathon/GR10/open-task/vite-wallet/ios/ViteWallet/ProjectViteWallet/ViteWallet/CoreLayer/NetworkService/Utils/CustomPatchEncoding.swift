//
//  CustomPatchEncoding.swift
//  Uapp
//
//  Created by Anton Tekutov on 07.07.21.
//

import Alamofire

struct CustomPatchEncoding: ParameterEncoding {
    func encode(_ urlRequest: URLRequestConvertible, with parameters: Parameters?) throws -> URLRequest {
        let mutableRequest = try? URLEncoding().encode(urlRequest, with: parameters) as? NSMutableURLRequest

        do {
            let jsonData = try JSONSerialization.data(withJSONObject: parameters!, options: .prettyPrinted)
            mutableRequest?.httpBody = jsonData
        } catch {
            print(error.localizedDescription)
        }

        return mutableRequest! as URLRequest
    }
}
