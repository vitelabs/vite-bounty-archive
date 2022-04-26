//
//  MainMenuViewController.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class MainMenuViewController: UITabBarController, TabBarModuleTransitionHandler {

    var viewModel: MainMenuViewModelProtocol!
    var coordinator: MainMenuCoordinatorProtocol!
    
    private var appearFirstTime = true
    
    private let bar = CustomTabBar(frame: .zero)
    private let tabBarItemInsets = UIEdgeInsets(top: 6, left: 0, bottom: -6, right: 0)
    private let defaultSelecttedIndex = 1
    private let duration: TimeInterval = 0.7
    override var selectedIndex: Int {
        didSet {
            bar.setSelectedIndex(index: selectedIndex, animated: false)
        }
    }
    
    //viewDidLoad called just in time with init - feature of UITabBarController
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        if appearFirstTime {
            appearFirstTime = false
            DispatchQueue.main.async { [ weak self ] in
                self?.configureSelf()
            }
        }
        
        navigationController?.navigationBar.barStyle = .black
        navigationController?.navigationBar.tintColor = R.color.tintMain()
        navigationController?.navigationBar.topItem?.backButtonTitle = ""
//        self.navigationController?.setNavigationBarHidden(true, animated: true)
    }
    // navigation bar hide/show
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.setNavigationBarHidden(false, animated: true)
    }
    
    // MARK: - Private setup methods
    
    func configureSelf() {
        
        setupCustomTabBar()
        
        let historyVc = coordinator.generateHistoryModule()
        let walletVc = coordinator.generateWalletModule()
        let settingsVc = coordinator.generateSettingsModule()

        setViewControllers([historyVc, walletVc, settingsVc], animated: false)
        selectedIndex = defaultSelecttedIndex
        bar.refreshSelection(animated: false)
    }
    
    private func setupCustomTabBar() {
        tabBar.isHidden = true
        
        view.addSubview(bar)
        bar.translatesAutoresizingMaskIntoConstraints = false
        bar.selectionDelegate = self
        
        NSLayoutConstraint.activate([
            bar.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 5),
            bar.leftAnchor.constraint(equalTo: view.leftAnchor, constant: -5),
            bar.rightAnchor.constraint(equalTo: view.rightAnchor, constant: 5),
            bar.topAnchor.constraint(equalTo: view.bottomAnchor, constant: -UIConstants.customTabBarHeight)
        ])
    }
}

// MARK: - CustomTabBarSelectionDelegate

extension MainMenuViewController: CustomTabBarSelectionDelegate {
    
    func selectionDidChange(oldSelectedIndex: Int, newSelectedIndex: Int) {
        selectedIndex = newSelectedIndex
    }
}
