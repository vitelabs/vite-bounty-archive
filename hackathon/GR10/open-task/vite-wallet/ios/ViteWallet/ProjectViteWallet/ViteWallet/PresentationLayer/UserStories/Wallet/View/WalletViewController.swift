//
//  WalletViewController.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class WalletViewController: UIViewController {

    var viewModel: WalletViewModelProtocol!
    var coordinator: WalletCoordinatorProtocol!
    
    private var _view: WalletView {
        return view as! WalletView
    }

    override func loadView() {
        self.view = WalletView()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        
    }
}