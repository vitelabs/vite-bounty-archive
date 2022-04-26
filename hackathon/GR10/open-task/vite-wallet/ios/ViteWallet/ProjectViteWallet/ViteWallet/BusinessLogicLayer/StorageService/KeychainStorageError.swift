//
//  KeychainStorageError.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation

enum KeychainStorageError: Error {
    case itemNotFound
    case failedToSetValue
    case failedToUpdateValue
    case failedToDeleteValue
    case failedToConvertToData
}
