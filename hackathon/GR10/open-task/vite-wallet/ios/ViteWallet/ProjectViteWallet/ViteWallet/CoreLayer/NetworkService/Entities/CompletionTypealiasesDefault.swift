//
//  CompletionTypealiasesDefault.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import Alamofire

typealias DefaultRequestCompletion<T: Codable> = (Result<T, NetworkServiceError>) -> Void
