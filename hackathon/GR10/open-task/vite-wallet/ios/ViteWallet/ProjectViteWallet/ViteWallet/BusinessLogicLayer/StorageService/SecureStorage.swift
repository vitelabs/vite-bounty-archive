//
//  SecureStorage.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation

final class SecureStorage {
    static let shared = SecureStorage()
    
    private func save(_ itemValue: Data, for itemKey: StorageItemKey) throws {
        guard getData(for: itemKey) == nil else {
            guard let _ = try? updateData(itemValue, for: itemKey) else {
                throw KeychainStorageError.failedToSetValue
            }
            
            return
        }
        
        let addQuery: [String: AnyObject] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: itemKey.rawValue as AnyObject,
            kSecValueData as String: itemValue as AnyObject
        ]
        
        let queryStatus = SecItemAdd(addQuery as CFDictionary, nil)
        guard queryStatus == errSecSuccess else {
            print("Keychain: error adding record to Keychain - \(queryStatus)")
            throw KeychainStorageError.failedToSetValue
        }
    }
    
    private func getData(for itemKey: StorageItemKey) -> Data? {
        let loadQuery: [String: AnyObject] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: itemKey.rawValue as AnyObject,
            kSecReturnData as String: kCFBooleanTrue,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        var result: AnyObject?
        let queryStatus = SecItemCopyMatching(loadQuery as CFDictionary, &result)
        
        guard let data = result as? Data else {
            print("Keychain: error parsing record from Keychain - \(queryStatus)")
            return nil
        }
        
        return data
    }
    
    private func updateData(_ itemValue: Data, for itemKey: StorageItemKey) throws {
        let updateQuery: [String: AnyObject] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: itemKey.rawValue as AnyObject
        ]
        
        let attributesToUpdate: [String: Any] = [
            kSecValueData as String: itemValue
        ]
        
        let updateStatus = SecItemUpdate(updateQuery as CFDictionary, attributesToUpdate as CFDictionary)
        
        guard updateStatus == errSecSuccess else {
            print("Keychain: error update record from Keychain - \(updateStatus)")
            throw KeychainStorageError.failedToUpdateValue
        }
    }
    
    private func deleteData(for itemKey: StorageItemKey) throws {
        let deleteQuery: [String: AnyObject] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: itemKey.rawValue as AnyObject
        ]
        
        let deleteStatus = SecItemDelete(deleteQuery as CFDictionary)
        
        guard deleteStatus == errSecSuccess else {
            print("Keychain: error delete record from Keychain - \(deleteStatus)")
            throw KeychainStorageError.failedToDeleteValue
        }
    }
}

extension SecureStorage: SettingsStoring {
    func set(_ itemValue: Bool, for itemKey: StorageItemKey) throws {
        let bytes: [UInt8] = itemValue ? [1] : [0]
        let itemData = Data(bytes)
        
        try save(itemData, for: itemKey)
    }
    
    func set(_ itemValue: String, for itemKey: StorageItemKey) throws {
        guard let itemData = itemValue.data(using: .utf8) else {
            throw KeychainStorageError.failedToConvertToData
        }
        
        try save(itemData, for: itemKey)
    }
    
    func getBoolValue(for itemKey: StorageItemKey) -> Bool? {
        guard let data = getData(for: itemKey)
        else { return false }
        
        let keyValue = Bool(truncating: data[0] as NSNumber)
        return keyValue
    }
    
    func getStringValue(for itemKey: StorageItemKey) -> String? {
        guard let data = getData(for: itemKey)
        else { return nil }
        
        let keyValue = NSString(data: data, encoding: String.Encoding.utf8.rawValue) as String?
        return keyValue
    }
    
    func deleteValue(for itemKey: StorageItemKey) throws {
        try deleteData(for: itemKey)
    }
}
