//
//  SettingsViewController.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

struct MenuRow {
    let image: UIImage?
    let title: String
    let action: () -> Void
}
struct MenuModule {
    let title: String
    var rows = [MenuRow]()
}

final class SettingsViewController: UIViewController {

    var viewModel: SettingsViewModelProtocol!
    var coordinator: SettingsCoordinatorProtocol!
    
    var menu = [MenuModule]()
        
    private var _view: SettingsView {
        return view as! SettingsView
    }

    override func loadView() {
        self.view = SettingsView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        navigationController?.navigationBar.barStyle = .black
        navigationController?.navigationBar.tintColor = R.color.tintMain()
        navigationController?.navigationBar.topItem?.backButtonTitle = ""
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        //needs to make arrows white
        DispatchQueue.main.async { [ weak self ] in
            self?._view.tableView.reloadData()
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        generateMenuModules()
        
        _view.tableView.dataSource = self
        _view.tableView.delegate = self
        _view.tableView.register(SettingsTableViewCell.self, forCellReuseIdentifier: SettingsTableViewCell.identifier)
    }
    
    private func generateMenuModules() {
        var module = MenuModule(title: "")
        module.rows.append(contentsOf: [
            .init(image: R.image.settingsSupport(),
                  title: R.string.localizable.settingsSupport(),
                  action: { UIApplication.shared.open(self.viewModel.supportUrl!) }),
            
            .init(image: R.image.settingsRateApp(),
                  title: R.string.localizable.settingsRateApp(),
                  action: { self.viewModel.rateApp() })
        ])
        menu.append(module)
        
        module = MenuModule(title: "")
        module.rows.append(contentsOf: [
            .init(image: R.image.settingsAboutUs(),
                  title: R.string.localizable.settingsAboutUs(),
                  action: { self.coordinator.openModule(.aboutUs) })
        ])
        menu.append(module)
        
        module = MenuModule(title: "")
        module.rows.append(contentsOf: [
            .init(image: R.image.settingsDefault(),
                  title: R.string.localizable.settingsUserAgreement(),
                  action: { UIApplication.shared.open(self.viewModel.termsOfUsageUrl!) }),
            .init(image: R.image.settingsDefault(),
                  title: R.string.localizable.settingsPrivacyPolicy(),
                  action: { UIApplication.shared.open(self.viewModel.privacyPolicyUrl!) })
        ])
        menu.append(module)
        
        module = MenuModule(title: "")
        module.rows.append(contentsOf: [
            .init(image: R.image.settingsWallet(),
                  title: R.string.localizable.settingsLogOutFromWallet(),
                  action: { [ weak self ] in
                    self?.viewModel.logOut()
                    self?.coordinator.openModule(.loading, openingMode: .showInNewRootNavigationStack)
                  })
        ])
        menu.append(module)
    }
    
    // MARK: - UI elements actions

    @objc private func backButtonTapped() {
        coordinator.dismiss()
    }
}

// MARK: - UITableViewDataSource

extension SettingsViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return menu.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return menu[section].rows.count
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return menu[section].title
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let view = UIView()
        view.backgroundColor = .clear
        
        return view
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: SettingsTableViewCell.identifier, for: indexPath) as! SettingsTableViewCell
        let menuRow = menu[indexPath.section].rows[indexPath.row]
        
        cell.setContent(menuRow)
        cell.setDisclosure(toColour: .res.tintLight()!)
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return menu[section].title.isNotEmpty ? 75 : 18
    }
}

// MARK: - UITableViewDelegate

extension SettingsViewController: UITableViewDelegate {

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let cell = tableView.cellForRow(at: indexPath) as? SettingsTableViewCell {
            cell.tapAnimation()
        }
        menu[indexPath.section].rows[indexPath.row].action()
    }
}
