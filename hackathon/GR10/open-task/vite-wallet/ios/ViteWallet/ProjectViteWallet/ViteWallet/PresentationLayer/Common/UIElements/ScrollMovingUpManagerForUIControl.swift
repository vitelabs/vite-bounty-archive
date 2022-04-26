//
//  ScrollMovingUpManagerForUIControl.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

class ScrollMovingUpManagerForUIControl {
    
    private weak var control: UIControl?
    private var superScrollView: UIScrollView? {
        var current = control?.superview
        while current != nil {
            if let scroll = current as? UIScrollView {
                return scroll
            }
            current = current?.superview
        }
        return nil
    }
    
    weak var targetScrollView: UIScrollView?
    
    var previousScrollContentOffset: CGPoint?
    var spacingBetweenScreenTop: CGFloat

    init(control: UIControl, spacingBetweenScreenTop: CGFloat = 220) {
        self.control = control
        self.spacingBetweenScreenTop = spacingBetweenScreenTop
        control.addTarget(self, action: #selector(makeFocused), for: .editingDidBegin)
        control.addTarget(self, action: #selector(makeUnfocused), for: .editingDidEnd)
    }
    
    @objc private func makeFocused() {
        guard let control = control,
            let scroll = targetScrollView ?? superScrollView
        else { return }
        scroll.isScrollEnabled = false
        scroll.contentInset.bottom += 1000
        previousScrollContentOffset = scroll.contentOffset
        let globalFrame = control.convert(control.frame, to: scroll)
        let offsetY = globalFrame.minY - scroll.frame.minY - spacingBetweenScreenTop
        let point = CGPoint(x: scroll.contentOffset.x, y: offsetY)
        DispatchQueue.main.async {
            UIView.animate(withDuration: 0.5) {
                scroll.setContentOffset(point, animated: false)
            }
        }
    }
    
    @objc private func makeUnfocused() {
        guard let scroll = targetScrollView ?? superScrollView,
              previousScrollContentOffset != nil
        else { return }
        previousScrollContentOffset = nil
        scroll.isScrollEnabled = true
        let bottomOffset = CGPoint(x: 0, y: scroll.contentSize.height - scroll.bounds.size.height)
        DispatchQueue.main.async {
            UIView.animate(withDuration: 0.5) {
                if scroll.contentOffset.y > bottomOffset.y {
                    scroll.setContentOffset(bottomOffset, animated: false)
                }
                scroll.contentInset.bottom -= 1000
            }
        }
    }
}
