//
//  SettingsStoring.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation

protocol SettingsStoring {
    func set(_ itemValue: Bool, for itemKey: StorageItemKey) throws
    func set(_ itemValue: String, for itemKey: StorageItemKey) throws

    func getBoolValue(for itemKey: StorageItemKey) -> Bool?
    func getStringValue(for itemKey: StorageItemKey) -> String?

    func deleteValue(for itemKey: StorageItemKey) throws
}
