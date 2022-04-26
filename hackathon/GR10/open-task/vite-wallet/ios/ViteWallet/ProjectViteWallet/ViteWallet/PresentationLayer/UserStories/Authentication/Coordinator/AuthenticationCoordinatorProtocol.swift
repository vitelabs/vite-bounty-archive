//
//  AuthenticationCoordinatorProtocol.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

protocol AuthenticationCoordinatorProtocol: DefaultCoordinatorProtocol {
    
    func generateOnboarding() -> UIViewController
}
