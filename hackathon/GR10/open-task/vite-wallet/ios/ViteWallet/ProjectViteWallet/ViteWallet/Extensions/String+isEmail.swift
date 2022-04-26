//
//  String+isEmail.swift
//  ViteWallet
//
//  Created by Антон Текутов on 07.07.2021.
//

import Foundation

fileprivate let __firstpart = "[A-Z0-9a-z]([A-Z0-9a-z._%+-]{0,30}[A-Z0-9a-z])?"
fileprivate let __serverpart = "([A-Z0-9a-z]([A-Z0-9a-z-]{0,30}[A-Z0-9a-z])?\\.){1,5}"
fileprivate let __emailRegex = __firstpart + "@" + __serverpart + "[A-Za-z]{2,8}"
fileprivate let __emailPredicate = NSPredicate(format: "SELF MATCHES %@", __emailRegex)

extension String {
    
    var isEmail: Bool {
        return __emailPredicate.evaluate(with: self)
    }
}
