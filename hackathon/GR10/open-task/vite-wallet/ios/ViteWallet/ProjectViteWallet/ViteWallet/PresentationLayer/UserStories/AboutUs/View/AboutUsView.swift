//
//  AboutUsView.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

final class AboutUsView: TitledView {
    
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
        title.text = .res.aboutUsTitle()
        title.textAlignment = .center
        
        makeConstraints()
    }

    private func makeConstraints() {
        NSLayoutConstraint.activate([
            
        ])
    }
}
