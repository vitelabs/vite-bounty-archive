//
//  LimitatableTextView.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

protocol SizeUpdateDelegate: AnyObject {
    
    func viewSizeWasUpdated(_ view: UIView)
}

class LimitatableTextView: UIControl {
    
    private var textViewHeightConstraint: NSLayoutConstraint!
    var textViewMaxHeight: CGFloat = UIConstants.screenBounds.height * 0.32
    var textViewMinHeight: CGFloat = 50
    
    weak var sizeUpdateDelegate: SizeUpdateDelegate?
    
    override var backgroundColor: UIColor? {
        get {
            textEditor.backgroundColor
        }
        set {
            textEditor.backgroundColor = newValue
        }
    }
    
    let titleLabel = UILabel()
    let textEditor = UITextView()
    let countLabel = UILabel()
    let placeholder = UILabel()
    
    var maxLength: Int?
    
    var text: String {
        get { textEditor.text }
        set {
            textEditor.text = newValue
            newValue.isEmpty ? showPlaceholder() : hidePlaceholder()
            refreshCount()
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [ weak self ] in
                guard let self = self
                else { return }
                self.textViewDidChange(self.textEditor)
            }
        }
    }
    
    var scrollMoveManager: ScrollMovingUpManagerForUIControl?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }
    
    // MARK: - Public methods
    
    func refreshCount() {
        refreshCount(textEditor.text.count)
    }
    
    // MARK: - Private methods
    
    private func refreshCount(_ count: Int) {
        guard let maxLength = maxLength
        else { return }
        let count = maxLength - count
        var text = "\(R.string.localizable.limit()) \(count) "
        let one = R.string.localizable.character()
        let less5 = R.string.localizable.characterLess5()
        let other = R.string.localizable.characters()
        switch count % 10 {
        case 1:
            text += count % 100 != 11 ? one : other
        case 2...4:
            text += less5
        default:
            text += other
        }
        
        countLabel.text = text
    }
    
    private func showPlaceholder() {
        placeholder.isHidden = false
        placeholder.isUserInteractionEnabled = false
        UIView.animate(withDuration: 0.5) { [ weak self ] in
            self?.placeholder.alpha = 1
        }
    }
    
    private func hidePlaceholder() {
        placeholder.isHidden = true
        placeholder.alpha = 0
    }
    
    // MARK: - Private setup methods
    
    private func setupView() {
        
        backgroundColor = .clear
        
        addSubview(titleLabel)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        titleLabel.font = .res.avertaCYRegular(size: 12)
        titleLabel.numberOfLines = 0
        titleLabel.textColor = .res.tintMain()
        
        addSubview(textEditor)
        textEditor.translatesAutoresizingMaskIntoConstraints = false
        textEditor.backgroundColor = R.color.backgroundInput()
        textEditor.layer.cornerRadius = 12
        textEditor.layer.borderWidth = 1
        textEditor.layer.borderColor = R.color.tintMain()?.cgColor
        textEditor.delegate = self
        textEditor.textContainerInset = UIEdgeInsets(top: 18, left: 18, bottom: 18, right: 18)
        textEditor.font = .res.avertaCYRegular(size: 14)
        textEditor.textColor = .res.tintGray()
        
        addSubview(countLabel)
        countLabel.translatesAutoresizingMaskIntoConstraints = false
        countLabel.font = .res.avertaCYRegular(size: 12)
        countLabel.numberOfLines = 0
        countLabel.textColor = .res.tintMain()
        countLabel.alpha = 0.5
        
        addSubview(placeholder)
        placeholder.translatesAutoresizingMaskIntoConstraints = false
        placeholder.textColor = R.color.tintGray()
        placeholder.font = .res.avertaCYRegular(size: 14)
        
        placeholder.text = ""
        
        scrollMoveManager = ScrollMovingUpManagerForUIControl(control: self)
        
        makeConstraints()
    }
    
    private func makeConstraints() {
        textViewHeightConstraint = textEditor.heightAnchor.constraint(equalToConstant: textViewMinHeight)
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor),
            titleLabel.leftAnchor.constraint(equalTo: leftAnchor),
            titleLabel.rightAnchor.constraint(equalTo: rightAnchor),
            
            textEditor.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 6),
            textEditor.leftAnchor.constraint(equalTo: leftAnchor),
            textEditor.rightAnchor.constraint(equalTo: rightAnchor),
            
            countLabel.topAnchor.constraint(equalTo: textEditor.bottomAnchor, constant: 6),
            countLabel.bottomAnchor.constraint(equalTo: bottomAnchor),
            countLabel.rightAnchor.constraint(equalTo: rightAnchor),
            
            placeholder.topAnchor.constraint(equalTo: topAnchor, constant: 20),
            placeholder.leftAnchor.constraint(equalTo: leftAnchor, constant: 26),
            placeholder.bottomAnchor.constraint(lessThanOrEqualTo: bottomAnchor, constant: -20),
            placeholder.rightAnchor.constraint(equalTo: rightAnchor, constant: -26),
            textViewHeightConstraint
        ])
    }
}

// MARK: - UITextViewDelegate

extension LimitatableTextView: UITextViewDelegate {
    
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let newText = (textView.text as NSString).replacingCharacters(in: range, with: text)
        newText.isEmpty ? showPlaceholder() : hidePlaceholder()
        guard let maxLength = maxLength
        else { return true }
        let result = newText.count <= maxLength
        if result {
            refreshCount(newText.count)
        }
        return result
    }
    
    func textViewDidChange(_ textView: UITextView) {
        var height = min(textView.contentSize.height, textViewMaxHeight)
        height = max(height, textViewMinHeight)
        textViewHeightConstraint.constant = height
        sizeUpdateDelegate?.viewSizeWasUpdated(self)
        textView.showsVerticalScrollIndicator = height == textViewMaxHeight
    }
    
    func textViewDidBeginEditing(_ textView: UITextView) {
        sendActions(for: .editingDidBegin)
    }

    func textViewDidEndEditing(_ textView: UITextView) {
        sendActions(for: .editingDidEnd)
    }
}
