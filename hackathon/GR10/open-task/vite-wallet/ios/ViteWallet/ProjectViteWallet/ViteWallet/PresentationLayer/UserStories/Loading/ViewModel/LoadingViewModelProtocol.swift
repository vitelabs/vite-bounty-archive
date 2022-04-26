//
//  LoadingViewModelProtocol.swift
//  ViteWallet
//
//  Created by Anton Tekutov on 07.07.21.
//

protocol LoadingViewModelProtocol: AnyObject {
    
    func startConfiguration()
    func checkActiveUser(_ completion: @escaping(Bool) -> Void)
}
