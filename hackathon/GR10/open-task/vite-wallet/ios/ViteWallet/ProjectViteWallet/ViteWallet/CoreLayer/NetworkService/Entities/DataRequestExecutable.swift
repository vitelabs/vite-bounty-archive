//
//  DataRequestExecutable.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import Alamofire

protocol DataRequestExecutable {
    
    var execute: DataRequest { get }
}

extension DataRequest: DataRequestExecutable {
    
    var execute: DataRequest {
        return self
    }
}
