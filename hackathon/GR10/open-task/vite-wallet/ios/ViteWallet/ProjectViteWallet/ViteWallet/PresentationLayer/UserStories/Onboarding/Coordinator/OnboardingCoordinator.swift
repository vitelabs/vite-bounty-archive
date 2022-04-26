//
//  OnboardingCoordinator.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class OnboardingCoordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((CustomizableOnboardingViewModel) -> Void)? = nil) -> UIViewController {
        let view = OnboardingViewController()
        let viewModel = OnboardingViewModel()
        let coordinator = OnboardingCoordinator()

        view.viewModel = viewModel
        view.coordinator = coordinator

        coordinator.transition = view

        if let configuration = configuration {
            configuration(viewModel)
        }

        return view
    }
    
    static func createModuleAuthenticationMode(_ configuration: ((CustomizableOnboardingViewModel) -> Void)? = nil) -> UIViewController {
        let view = OnboardingViewController()
        let viewModel = OnboardingViewModel()
        let coordinator = OnboardingCoordinator()

        view.viewModel = viewModel
        view.coordinator = coordinator

        coordinator.transition = view
        
        viewModel.content = [
            .init(title: .res.onboardingPage1Title(),
                  text: .res.onboardingPage1Text(),
                  image: .res.onboardingPage1()),
            
            .init(title: .res.onboardingPage2Title(),
                  text: .res.onboardingPage2Text(),
                  image: .res.onboardingPage2()),
            
            .init(title: .res.onboardingPage3Title(),
                  text: .res.onboardingPage3Text(),
                  image: .res.onboardingPage3())
        ]

        if let configuration = configuration {
            configuration(viewModel)
        }

        return view
    }
}

// MARK: - Interface for view
extension OnboardingCoordinator: OnboardingCoordinatorProtocol {

}
