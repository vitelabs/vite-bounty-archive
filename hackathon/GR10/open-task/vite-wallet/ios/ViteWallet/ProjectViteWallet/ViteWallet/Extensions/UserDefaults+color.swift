//
//  UserDefaults+color.swift
//  ClubhouseAvatarMaker
//
//  Created by Anton Tekutov on 07.07.21.
//

import UIKit

extension UserDefaults {
    func set(_ color: UIColor?, forKey defaultName: String) {
        guard let data = color?.data else {
            removeObject(forKey: defaultName)
            return
        }
        set(data, forKey: defaultName)
    }
    func color(forKey defaultName: String) -> UIColor? {
        data(forKey: defaultName)?.color
    }
}

extension UIColor {
    convenience init(data: Data) {
        let size = MemoryLayout<CGFloat>.size
        self.init(red: data.subdata(in: size * 0 ..< size * 1).object(),
                  green: data.subdata(in: size * 1 ..< size * 2).object(),
                  blue: data.subdata(in: size * 2 ..< size * 3).object(),
                  alpha: data.subdata(in: size * 3 ..< size * 4).object())
    }
    
    var data: Data? {
        return rgba.red.data + rgba.green.data + rgba.blue.data + rgba.alpha.data
    }
}

extension Data {
    var color: UIColor { UIColor(data: self) }
    
    func object<T>() -> T {
        return withUnsafeBytes { $0.load(as: T.self) }
    }
}

extension Numeric {
    var data: Data {
        var bytes = self
        return Data(bytes: &bytes, count: MemoryLayout<Self>.size)
    }
}
