//
//  AboutUsViewController.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class AboutUsViewController: UIViewController {

    var viewModel: AboutUsViewModelProtocol!
    var coordinator: AboutUsCoordinatorProtocol!
    
    private var _view: AboutUsView {
        return view as! AboutUsView
    }

    override func loadView() {
        self.view = AboutUsView()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        
    }
}