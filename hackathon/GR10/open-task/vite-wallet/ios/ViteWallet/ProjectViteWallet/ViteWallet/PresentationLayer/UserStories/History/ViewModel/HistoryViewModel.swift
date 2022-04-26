//
//  HistoryViewModel.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

final class HistoryViewModel {
	var output: HistoryOutput?
}

// MARK: - Configuration
extension HistoryViewModel: CustomizableHistoryViewModel {

}

// MARK: - Interface for view
extension HistoryViewModel: HistoryViewModelProtocol {

}

