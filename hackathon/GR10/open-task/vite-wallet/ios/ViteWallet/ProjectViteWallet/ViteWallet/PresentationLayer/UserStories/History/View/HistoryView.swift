//
//  HistoryView.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class HistoryView: TitledView {
    
    let mockUp = UIImageView(image: .res.historyMockUp())
    
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
        title.text = .res.historyTitle()
        
        addSubview(mockUp)
        mockUp.translatesAutoresizingMaskIntoConstraints = false
        
        makeConstraints()
    }

    private func makeConstraints() {
        NSLayoutConstraint.activate([
            mockUp.topAnchor.constraint(equalTo: safeAreaLayoutGuide.topAnchor),
            mockUp.leftAnchor.constraint(equalTo: leftAnchor, constant: 24),
            mockUp.rightAnchor.constraint(equalTo: rightAnchor, constant: -24),
            mockUp.heightAnchor.constraint(equalTo: mockUp.widthAnchor, multiplier: 518 / 327)
        ])
    }
}
