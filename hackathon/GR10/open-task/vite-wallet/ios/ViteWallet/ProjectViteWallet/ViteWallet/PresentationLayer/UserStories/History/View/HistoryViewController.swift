//
//  HistoryViewController.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class HistoryViewController: UIViewController {

    var viewModel: HistoryViewModelProtocol!
    var coordinator: HistoryCoordinatorProtocol!
    
    private var _view: HistoryView {
        return view as! HistoryView
    }

    override func loadView() {
        self.view = HistoryView()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        
    }
}