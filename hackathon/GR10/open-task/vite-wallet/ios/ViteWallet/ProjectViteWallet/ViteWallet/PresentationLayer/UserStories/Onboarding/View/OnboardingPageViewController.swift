//
//  OnboardingPageViewController.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import Foundation

import UIKit

final class OnboardingPageViewController: UIViewController {
    
    var contentCache: OnboardingPageContent?
    
    let titleLabel = UILabel()
    let textLabel = UILabel()
    let image = UIImageView()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        view.backgroundColor = .res.background()
        
        view.addSubview(image)
        image.translatesAutoresizingMaskIntoConstraints = false
        image.contentMode = .scaleAspectFill
        
        view.addSubview(titleLabel)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        titleLabel.font = .res.avertaCYBold(size: 32)
        titleLabel.textColor = .res.tintLight()
        
        view.addSubview(textLabel)
        textLabel.translatesAutoresizingMaskIntoConstraints = false
        textLabel.font = .res.avertaCYSemibold(size: 14)
        textLabel.textColor = .res.tintGray()
        
        setContent(contentCache)
        
        makeConstraints()
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 24),
            titleLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 24),
            titleLabel.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -24),
            
            textLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 12),
            textLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 24),
            textLabel.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -24),
            
            image.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            image.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 24),
            image.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -24),
            image.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
    
    // MARK: - Public methods
    
    func setContent(_ content: OnboardingPageContent?) {
        contentCache = content
        titleLabel.text = content?.title
        textLabel.text = content?.text
        image.image = content?.image
    }
}
