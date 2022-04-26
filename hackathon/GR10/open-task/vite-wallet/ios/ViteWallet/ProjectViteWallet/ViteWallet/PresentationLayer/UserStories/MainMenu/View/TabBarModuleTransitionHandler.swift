//
//  TabBarModuleTransitionHandler.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation

protocol TabBarModuleTransitionHandler: ModuleTransitionHandler {
    
    var selectedIndex: Int { get set }
}
