//
//  SegmentedControl.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

protocol SegmentedControlDelegate: AnyObject {
    
    func selectionDidChange(_ control: SegmentedControl, oldSelectedIndex: Int, newSelectedIndex: Int)
}

class SegmentedControl: UIControl {
    
    weak var delegate: SegmentedControlDelegate?
    
    var selectionDidChange: ((_ oldSelectedIndex: Int, _ newSelectedIndex: Int) -> Void)?

    private (set) var selectedSegmentIndex = 0 {
        didSet {
            if oldValue != selectedSegmentIndex {
                selectionDidChange?(oldValue, selectedSegmentIndex)
                delegate?.selectionDidChange(self, oldSelectedIndex: oldValue, newSelectedIndex: selectedSegmentIndex)
                sendActions(for: .valueChanged)
            }
        }
    }
    var duration: TimeInterval = 0.3
    
    let stack = UIStackView()
    let selectionView = UIView()
    
    var orientation: NSLayoutConstraint.Axis {
        get { stack.axis }
        set { stack.axis = newValue }
    }
    
    private var selectionViewConstraints = [NSLayoutConstraint]()
    
    override init(frame: CGRect) {
        super.init(frame: frame)

        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        refreshSegmentSelection(animated: false)
    }
    
    // MARK: - Public methods
    
    func getSegmentWithIndex(_ index: Int) -> UIView? {
        if index >= 0 && index <= stack.arrangedSubviews.count {
            return stack.arrangedSubviews[index]
        }
        return nil
    }
    
    func addSegment(_ segment: UIView) {
        stack.addArrangedSubview(segment)
    }
    
    func setSelectedSegmentIndex(_ index: Int, animated: Bool = true) {
        if index >= 0 && index < stack.arrangedSubviews.count {
            selectedSegmentIndex = index
            refreshSegmentSelection(animated: animated)
        } else {
            print("Segment with index \(index) does not exist!")
        }
    }
    
    // MARK: - Private methods
    
    private func refreshSegmentSelection(animated: Bool = true) {
        selectionView.isHidden = false
        let index = selectedSegmentIndex

        if index >= 0 && index < stack.arrangedSubviews.count {
            NSLayoutConstraint.deactivate(selectionViewConstraints)
            
            let selectedSegment = stack.arrangedSubviews[index]
            if stack.axis == .horizontal {
                selectionViewConstraints = [
                    selectionView.centerXAnchor.constraint(equalTo: selectedSegment.centerXAnchor),
                    selectionView.widthAnchor.constraint(equalToConstant: (frame.width + 6) / CGFloat(stack.arrangedSubviews.count)),
                    selectionView.topAnchor.constraint(equalTo: topAnchor),
                    selectionView.bottomAnchor.constraint(equalTo: bottomAnchor)
                ]
            } else {
                selectionViewConstraints = [
                    selectionView.centerYAnchor.constraint(equalTo: selectedSegment.centerYAnchor),
                    selectionView.heightAnchor.constraint(equalToConstant: (frame.height + 6) / CGFloat(stack.arrangedSubviews.count)),
                    selectionView.leftAnchor.constraint(equalTo: leftAnchor),
                    selectionView.rightAnchor.constraint(equalTo: rightAnchor)
                ]
            }
            
            NSLayoutConstraint.activate(selectionViewConstraints)
        }
        
        if animated {
            UIView.animate(withDuration: duration, animations: { [ weak self ] in
                self?.layoutIfNeeded()
            })
        } else {
            layoutIfNeeded()
        }
    }
    
    // MARK: - UI elements actions

    @objc func handleTapGesture(recognizer: UITapGestureRecognizer) {
        let point = recognizer.location(in: self)
        if stack.axis == .horizontal {
            let segmentWidth = frame.width / CGFloat(stack.arrangedSubviews.count)
            setSelectedSegmentIndex(Int(point.x / segmentWidth))
        } else {
            let segmentHeight = frame.height / CGFloat(stack.arrangedSubviews.count)
            setSelectedSegmentIndex(Int(point.y / segmentHeight))
        }
    }
    
    // MARK: - Setup methods
    
    private func setupView() {
        backgroundColor = R.color.background()
        isUserInteractionEnabled = true
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(handleTapGesture(recognizer:)))
        self.addGestureRecognizer(tap)
        
        setupSelectionView()
        setupStack()
        
        makeConstraints()
    }
    
    private func setupStack() {
        addSubview(stack)
        stack.translatesAutoresizingMaskIntoConstraints = false
        stack.axis = .horizontal
        stack.distribution = .fillEqually
        stack.alignment = .center
        stack.spacing = 13
    }
    
    private func setupSelectionView() {
        addSubview(selectionView)
        selectionView.translatesAutoresizingMaskIntoConstraints = false
        selectionView.backgroundColor = R.color.tintMain()
        selectionView.isHidden = true
    }
    
    private func makeConstraints() {
        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor, constant: 5),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -5),
            stack.leftAnchor.constraint(equalTo: leftAnchor, constant: 5),
            stack.rightAnchor.constraint(equalTo: rightAnchor, constant: -5)
        ])
    }
}
