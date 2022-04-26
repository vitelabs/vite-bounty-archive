//___FILEHEADER___

import UIKit

final class ___VARIABLE_productName:identifier___Coordinator: DefaultCoordinator {
    
    static func createModule(_ configuration: ((Customizable___VARIABLE_productName:identifier___ViewModel) -> Void)? = nil) -> UIViewController {
        guard let view = <#Create vc here#> as? ___VARIABLE_productName:identifier___ViewController
        else { 
            assertionFailure("VC should exist")
            return UIViewController()
        }
        let viewModel = ___VARIABLE_productName:identifier___ViewModel()
        let coordinator = ___VARIABLE_productName:identifier___Coordinator()

        coordinator.transition = view

        view.viewModel = viewModel
        view.coordinator = coordinator

        if let configuration = configuration {
            configuration(viewModel)
        }

        return view
    }
}

// MARK: - Interface for view
extension ___VARIABLE_productName:identifier___Coordinator: ___VARIABLE_productName:identifier___CoordinatorProtocol {

}
