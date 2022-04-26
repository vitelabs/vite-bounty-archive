//
//  MainMenuCoordinatorProtocol.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

protocol MainMenuCoordinatorProtocol: DefaultCoordinatorProtocol {
    
    func generateWalletModule() -> UIViewController
    func generateHistoryModule() -> UIViewController
    func generateSettingsModule() -> UIViewController
}
