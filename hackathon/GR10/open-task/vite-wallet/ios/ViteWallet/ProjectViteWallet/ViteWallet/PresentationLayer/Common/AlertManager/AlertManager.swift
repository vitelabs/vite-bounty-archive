//
//  AlertManager.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit
import JGProgressHUD

final class AlertManager {
    
    static func showSuccessHUD(on view: UIView, withText text: String? = nil, detailText: String? = nil, delegate: JGProgressHUDDelegate? = nil) {
        let successHUD = JGProgressHUD(style: .light)
        successHUD.indicatorView = JGProgressHUDSuccessIndicatorView()
        
        UIStyleManager.hudDefault(hud: successHUD)

        successHUD.delegate = delegate
        
        successHUD.textLabel.text = text
        successHUD.detailTextLabel.text = detailText
        
        successHUD.show(in: view)
        successHUD.dismiss(afterDelay: 2.0)
        
        successHUD.tapOutsideBlock = { (hud) in
            hud.dismiss()
        }
    }
    
    static func showErrorHUD(on view: UIView, withText text: String? = nil, detailText: String? = nil, delegate: JGProgressHUDDelegate? = nil) {
        let successHUD = JGProgressHUD(style: .light)
        successHUD.indicatorView = JGProgressHUDErrorIndicatorView()
        
        UIStyleManager.hudDefault(hud: successHUD)

        successHUD.delegate = delegate
        
        successHUD.textLabel.text = text
        successHUD.detailTextLabel.text = detailText
        
        successHUD.show(in: view)
        successHUD.dismiss(afterDelay: 3.5)
        
        successHUD.tapOutsideBlock = { (hud) in
            hud.dismiss()
        }
    }
    
    static func getLoadingHUD(on view: UIView, withText text: String? = nil, detailText: String? = nil, delegate: JGProgressHUDDelegate? = nil) -> JGProgressHUD {
        let loadingHUD = JGProgressHUD(style: .dark)
        loadingHUD.delegate = delegate
        UIStyleManager.hudDefault(hud: loadingHUD)
        
        loadingHUD.textLabel.text = text
        loadingHUD.detailTextLabel.text = detailText
        loadingHUD.show(in: view)
        
        return loadingHUD
    }
    
    static func getProgressHUD(on view: UIView, withText text: String? = nil, detailText: String? = nil, delegate: JGProgressHUDDelegate? = nil) -> JGProgressHUD {
        let progressHUD = JGProgressHUD(style: .dark)
        let progressView = JGProgressHUDPieIndicatorView()
        progressHUD.indicatorView = progressView
        
        UIStyleManager.hudDefault(hud: progressHUD)
        
        progressHUD.delegate = delegate
        
        progressHUD.textLabel.text = text
        progressHUD.detailTextLabel.text = detailText
        
        progressHUD.show(in: view)
        
        return progressHUD
    }
}
