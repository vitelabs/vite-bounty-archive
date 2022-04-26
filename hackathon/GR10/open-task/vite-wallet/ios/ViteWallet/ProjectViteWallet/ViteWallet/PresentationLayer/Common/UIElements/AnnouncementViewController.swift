//
//  AnnouncementViewController.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class AnnouncementViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = R.color.background()
        
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)
        label.font = R.font.avertaCYBold(size: 24)
        label.numberOfLines = 0
        label.textAlignment = .center
        label.text = R.string.localizable.announcementText()
        label.textColor = .res.tintMain()
        
        NSLayoutConstraint.activate([
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8)
        ])
    }
}
