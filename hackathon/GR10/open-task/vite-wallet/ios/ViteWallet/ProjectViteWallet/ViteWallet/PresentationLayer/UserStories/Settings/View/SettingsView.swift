//
//  SettingsView.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class SettingsView: TitledView {
    
    let titleBackground = UIView()

    let tableView = UITableView()
    let footer = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 60))
    let footerLabel = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        setupView()
    }

    // MARK: - Private methods
    
    private func setupView() {
        title.text = .res.settingsTitle()
        
        addSubview(tableView)
        tableView.separatorColor = .clear
        tableView.backgroundColor = .res.background()
        tableView.translatesAutoresizingMaskIntoConstraints = false
        tableView.tableFooterView = footer
        tableView.showsVerticalScrollIndicator = false
        tableView.rowHeight = 64
        
        setupFooter()
        
        makeConstraints()
    }
    
    private func setupFooter() {
        footer.addSubview(footerLabel)
        footerLabel.translatesAutoresizingMaskIntoConstraints = false
        footerLabel.font = R.font.avertaCYRegular(size: 14)
        footerLabel.textAlignment = .center
        footerLabel.numberOfLines = 0
        footerLabel.textColor = .res.tintGray()
        footerLabel.text = "\(R.string.localizable.settingsVersion()): \(Bundle.main.versionNumber)"
    }

    private func makeConstraints() {
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: safeAreaLayoutGuide.topAnchor),
            tableView.bottomAnchor.constraint(equalTo: safeAreaLayoutGuide.bottomAnchor),
            tableView.rightAnchor.constraint(equalTo: safeAreaLayoutGuide.rightAnchor),
            tableView.leftAnchor.constraint(equalTo: safeAreaLayoutGuide.leftAnchor),
            
            footerLabel.topAnchor.constraint(equalTo: footer.topAnchor, constant: 20),
            footerLabel.centerXAnchor.constraint(equalTo: footer.centerXAnchor),
            footerLabel.widthAnchor.constraint(equalTo: tableView.widthAnchor, multiplier: 0.9)
        ])
    }
}
