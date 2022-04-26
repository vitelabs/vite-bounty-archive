//
//  AlertPresentationViewController.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class AlertPresentationViewController: UIViewController {
    
    private var currentTranslationValue: CGFloat = 0
    private var currentFraction: Float = 0
    
    private var _view: AlertPresentationView {
        return view as! AlertPresentationView
    }

    override func loadView() {
        self.view = AlertPresentationView()
    }

    override func viewDidLoad() {
        modalPresentationStyle = .custom
        modalTransitionStyle = .crossDissolve
        transitioningDelegate = self
        
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(tapToDismissHandler))
        _view.backgroundView.addGestureRecognizer(tap)
        
        configureGestures(view: _view.backgroundView)
        configureGestures(view: _view.contentView)
        
        _view.setTransitionViewState(fractionCompletionState: -1, animated: false)
        DispatchQueue.main.async { [ weak self ] in
            self?._view.setTransitionViewState(fractionCompletionState: 0, animated: true)
        }
    }
    
    private func configureGestures(view: UIView) {
        view.isUserInteractionEnabled = true
        
        let pan = UIPanGestureRecognizer(target: self, action: #selector(dragView(_:)))
        view.addGestureRecognizer(pan)
    }
    
    // MARK: - UI elements actions
    
    @objc private func tapToDismissHandler(recognizer: UITapGestureRecognizer) {
        dismissThisController()
    }
    
    @objc private func dragView(_ sender: UIPanGestureRecognizer) {
        
        let velocityVertical = abs(sender.velocity(in: _view).y)
        
        let dragMaxValue = UIConstants.screenBounds.width * 0.5
        if sender.state == .began {
            currentTranslationValue = 0
            currentFraction = 0
        }
        switch sender.state {
        case .ended:
            guard (currentFraction < 0.4 && currentFraction > -0.4),
                  velocityVertical < 2000
            else {
                dismissThisController()
                return
            }
            _view.setTransitionViewState(fractionCompletionState: 0, animated: true)
            
        default:
            let translation = sender.translation(in: _view)
            currentTranslationValue += translation.y
            sender.setTranslation(CGPoint.zero, in: _view)
            
            let fraction = min(max(currentTranslationValue, -dragMaxValue), dragMaxValue) / dragMaxValue
            currentFraction = Float(fraction)
            _view.setTransitionViewState(fractionCompletionState: currentFraction,
                                         animated: true,
                                         duration: 0.1)
        }
    }
    
    @objc private func handleSwipe(gesture: UISwipeGestureRecognizer) {
        switch gesture.direction {
        case .down:
            currentFraction = -1
            dismissThisController()
        case .up:
            currentFraction = 1
            dismissThisController()
        default:
            break
        }
    }
    
    // MARK: - Public methods
    
    func dismissThisController() {
        if currentFraction > 0 {
            _view.setTransitionViewState(fractionCompletionState: 1, animated: true)
        } else {
            _view.setTransitionViewState(fractionCompletionState: -1, animated: true)
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + _view.duration) { [ weak self ] in
            self?.dismissSelf()
        }
    }
}

// MARK: - UIViewControllerTransitioningDelegate

extension AlertPresentationViewController: UIViewControllerTransitioningDelegate {
    
    func presentationController(forPresented presented: UIViewController, presenting: UIViewController?, source: UIViewController) -> UIPresentationController? {
        return UIPresentationController(presentedViewController: presented, presenting: presentingViewController)
    }
}
