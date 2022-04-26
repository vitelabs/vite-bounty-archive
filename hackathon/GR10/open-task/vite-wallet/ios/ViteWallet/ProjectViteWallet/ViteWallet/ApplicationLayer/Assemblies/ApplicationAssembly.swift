//
//  ApplicationAssembly.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import Foundation

class ApplicationAssembly {
    
    static var appRouter: AppRouter = {
        return MainAppRouter()
    }()
}
