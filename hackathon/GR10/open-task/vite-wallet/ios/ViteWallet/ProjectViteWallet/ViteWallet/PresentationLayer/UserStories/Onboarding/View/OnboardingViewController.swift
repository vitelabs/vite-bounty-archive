//
//  OnboardingViewController.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import UIKit

final class OnboardingViewController: UIViewController {

    var viewModel: OnboardingViewModelProtocol!
    var coordinator: OnboardingCoordinatorProtocol!
    
    var pageController: UIPageViewController!
    var currentIndex: Int = 0
    var pages = [
        OnboardingPageViewController()
    ]
    let pageControl = UIPageControl()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        configureSelf()
    }

    private func configureSelf() {
        let viewModelPages: [OnboardingPageViewController] = viewModel.content.compactMap {
            let page = OnboardingPageViewController()
            page.setContent($0)
            return page
        }
        if viewModelPages.isNotEmpty {
            pages = viewModelPages
        }
        
        pageController = UIPageViewController(transitionStyle: .scroll, navigationOrientation: .horizontal, options: nil)
        pageController?.dataSource = self
        pageController?.delegate = self
        pageController?.view.backgroundColor = .clear
        pageController?.view.frame = CGRect(x: 0,
                                            y: 0,
                                            width: view.frame.width,
                                            height: view.frame.height)
        addChild(pageController)
        view.addSubview(pageController.view)
        
        let initialVC = pages[0]
        pageController?.setViewControllers([initialVC], direction: .forward, animated: true, completion: nil)
        pageController?.didMove(toParent: self)
        
        view.addSubview(pageControl)
        pageControl.translatesAutoresizingMaskIntoConstraints = false
        pageControl.pageIndicatorTintColor = .res.tintMain()?.withAlphaComponent(0.5)
        pageControl.currentPageIndicatorTintColor = .res.tintMain()
        pageControl.numberOfPages = pages.count
        
        NSLayoutConstraint.activate([
            pageControl.topAnchor.constraint(equalTo: view.topAnchor),
            pageControl.leftAnchor.constraint(equalTo: view.leftAnchor, constant: -18)
        ])
    }
}

// MARK: - PageViewController

extension OnboardingViewController: UIPageViewControllerDataSource, UIPageViewControllerDelegate {
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        guard let currentVC = viewController as? OnboardingPageViewController,
              let index = pages.firstIndex(of: currentVC)
        else { return nil }

        return pages[exist: index - 1] ?? pages.last
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        guard let currentVC = viewController as? OnboardingPageViewController,
              let index = pages.firstIndex(of: currentVC)
        else { return nil }
        
        return pages[exist: index + 1] ?? pages.first
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
        guard let currentVC = pageViewController.viewControllers?.first as? OnboardingPageViewController,
              let index = pages.firstIndex(of: currentVC)
        else { return }

        pageControl.currentPage = index
    }
}

