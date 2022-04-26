//
//  PickerViewManager.swift
//  Albomika
//
//  Created by Anton Tekutov on 07.07.21.
//  Copyright © 2020 inostudio. All rights reserved.
//

import UIKit

class PickerViewManager: NSObject, UIPickerViewDelegate, UIPickerViewDataSource {
    
    let items: [String]
    let picker: UIPickerView
    var selectedValue: String
    
    init(pickerView: UIPickerView, itemsCollection: [String]) {
        items = itemsCollection
        picker = pickerView
        selectedValue = items[0]
        super.init()
        picker.dataSource = self
        picker.delegate = self
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return items.count
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        selectedValue = items[row]
    }
       
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return items[row]
    }
}

