//
//  AuthenticationView.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class AuthenticationView: UIView {

    let backgroundView = UIView()
        
    let stack = UIStackView()
    let emailTextField = UITextField()
    let passwordTextField = UITextField()
    let signInButton = ButtonWithTouchSize()
    let onboardingContainer = UIView()

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        setupView()
    }
    
    func manageViewVisibility(view: UIView, hidden: Bool) {
        UIView.animate(withDuration: 0.4) {
            view.alpha = hidden ? 0 : 1
        }
    }
    
    func manageStackYPosition(maxVisibleView: UIView) {
        switch maxVisibleView {
        case emailTextField:
            UIView.animate(withDuration: 0.3) { [ weak self ] in
                self?.stack.transform = .init(translationX: 0, y: 140)
            }
        case passwordTextField:
            UIView.animate(withDuration: 0.3) { [ weak self ] in
                self?.stack.transform = .init(translationX: 0, y: 70)
            }
        case signInButton:
            UIView.animate(withDuration: 0.3) { [ weak self ] in
                self?.stack.transform = .init(translationX: 0, y: 0)
            }
        default:
            break
        }
    }

    // MARK: - Private methods
    
    private func setupView() {
        backgroundColor = .res.background()
        
        addSubview(backgroundView)
        backgroundView.translatesAutoresizingMaskIntoConstraints = false
        backgroundView.backgroundColor = .res.background()
        
        backgroundView.addSubview(stack)
        stack.translatesAutoresizingMaskIntoConstraints = false
        stack.axis = .vertical
        stack.spacing = 32
        stack.transform = .init(translationX: 0, y: 140)
        
        backgroundView.addSubview(onboardingContainer)
        onboardingContainer.translatesAutoresizingMaskIntoConstraints = false
        
        stack.addArrangedSubview(emailTextField)
        UIStyleManager.textFieldDefault(textField: emailTextField,
                                        placeholderText: .res.authenticationEmailInputPlaceholder(),
                                        underText: .res.authenticationEmailInputTitle())
        emailTextField.keyboardType = .emailAddress
        emailTextField.autocorrectionType = .no

        stack.addArrangedSubview(passwordTextField)
        UIStyleManager.textFieldDefault(textField: passwordTextField,
                                        placeholderText: .res.authenticationPasswordInputPlaceholder(),
                                        underText: .res.authenticationPasswordInputTitle())
        passwordTextField.textContentType = .password
        passwordTextField.isSecureTextEntry = true
        passwordTextField.alpha = 0
        passwordTextField.autocorrectionType = .no

        stack.addArrangedSubview(signInButton)
        UIStyleManager.buttonPrimary(signInButton)
        signInButton.setTitle(.res.authenticationSignInButtonText())
        signInButton.alpha = 0
        
        makeConstraints()
    }

    private func makeConstraints() {
        stack.setCustomSpacing(12, after: passwordTextField)
        NSLayoutConstraint.activate([
            backgroundView.topAnchor.constraint(equalTo: topAnchor),
            backgroundView.bottomAnchor.constraint(equalTo: bottomAnchor),
            backgroundView.leftAnchor.constraint(equalTo: leftAnchor),
            backgroundView.rightAnchor.constraint(equalTo: rightAnchor),

            stack.bottomAnchor.constraint(equalTo: backgroundView.bottomAnchor, constant: -48),
            stack.centerXAnchor.constraint(equalTo: backgroundView.centerXAnchor),
            stack.widthAnchor.constraint(equalTo: backgroundView.widthAnchor, constant: -48),
            
            onboardingContainer.topAnchor.constraint(equalTo: topAnchor, constant: .res.navigationBarCenterY),
            onboardingContainer.bottomAnchor.constraint(equalTo: backgroundView.bottomAnchor, constant: -300),
            onboardingContainer.leftAnchor.constraint(equalTo: leftAnchor),
            onboardingContainer.rightAnchor.constraint(equalTo: rightAnchor)
        ])
    }
}
