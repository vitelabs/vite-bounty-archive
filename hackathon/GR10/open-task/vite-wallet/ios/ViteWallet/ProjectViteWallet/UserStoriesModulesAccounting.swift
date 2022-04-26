//
// Auto generated file
//

import UIKit

protocol ModuleGenerator {
    func createModule() -> UIViewController
}

enum UserStoriesModulesDefault: ModuleGenerator {

    case settings
    case aboutUs
    case loading
    case history
    case wallet
    case mainMenu
    case authentication
    case onboarding

    func createModule() -> UIViewController {
        switch self {
        case .settings: 
            return SettingsCoordinator.createModule()
        case .aboutUs: 
            return AboutUsCoordinator.createModule()
        case .loading: 
            return LoadingCoordinator.createModule()
        case .history: 
            return HistoryCoordinator.createModule()
        case .wallet: 
            return WalletCoordinator.createModule()
        case .mainMenu: 
            return MainMenuCoordinator.createModule()
        case .authentication: 
            return AuthenticationCoordinator.createModule()
        case .onboarding: 
            return OnboardingCoordinator.createModule()
        }
    }
}

enum UserStoriesModulesWithOutput: ModuleGenerator {

    case settings(output: SettingsOutput)
    case aboutUs(output: AboutUsOutput)
    case loading(output: LoadingOutput)
    case history(output: HistoryOutput)
    case wallet(output: WalletOutput)
    case mainMenu(output: MainMenuOutput)
    case authentication(output: AuthenticationOutput)
    case onboarding(output: OnboardingOutput)

    func createModule() -> UIViewController {
        switch self {
        case .settings(let output): 
            return SettingsCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .aboutUs(let output): 
            return AboutUsCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .loading(let output): 
            return LoadingCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .history(let output): 
            return HistoryCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .wallet(let output): 
            return WalletCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .mainMenu(let output): 
            return MainMenuCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .authentication(let output): 
            return AuthenticationCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        case .onboarding(let output): 
            return OnboardingCoordinator.createModule { viewModel in 
                viewModel.output = output
            }
            
        }
    }
}
