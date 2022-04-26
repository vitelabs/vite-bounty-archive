//___FILEHEADER___

import UIKit

final class ___VARIABLE_productName:identifier___ViewController: UIViewController {

    var viewModel: ___VARIABLE_productName:identifier___ViewModelProtocol!
    var coordinator: ___VARIABLE_productName:identifier___CoordinatorProtocol!
    
    private var _view: ___VARIABLE_productName:identifier___View {
        return view as! ___VARIABLE_productName:identifier___View
    }

    override func loadView() {
        self.view = ___VARIABLE_productName:identifier___View()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        
    }
}