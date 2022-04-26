//
//  OnboardingViewModel.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

final class OnboardingViewModel {
    
	var output: OnboardingOutput?
    
    var content = [OnboardingPageContent]()

}

// MARK: - Configuration
extension OnboardingViewModel: CustomizableOnboardingViewModel {

}

// MARK: - Interface for view
extension OnboardingViewModel: OnboardingViewModelProtocol {

}

