#!/bin/bash

colorPrint() {
  text=$1
  printf "%b" "\e[1;34m${text}\e[0m"
}

errorColorPrint() {
  text=$1
  printf "%b" "\e[1;91m${text}\e[0m"
}

printToFile() {
    text=$1
    echo "$text" >&2
}

protocolName="DefaultCoordinator"
colorPrint "\n\t$protocolName search:"

kek=$(find . -name '*.swift' -exec awk '(/class/) && /'"$protocolName"'/' {} \;)

coordinatorsClassesNamesArray=()
nextClassName=false

for string in $(echo $kek | tr ":" "\n")
do
    if [ "$nextClassName" == true ]
    then
        if [ "$string" != "{" ] && [ "$string" != "$protocolName" ]
        then
            coordinatorsClassesNamesArray+=("$string")
            colorPrint "\nFound user stories module:   ${string%Coordinator*}"
        fi
        nextClassName=false
    else
        if [ "$string" == "class" ] || [ "$string" == "extension" ]
        then
            nextClassName=true
        fi
    fi
done



exec 2>UserStoriesModulesAccounting.swift
printToFile "//
// Auto generated file
//

import UIKit

protocol ModuleGenerator {
    func createModule() -> UIViewController
}

enum UserStoriesModulesDefault: ModuleGenerator {
"
len=${#coordinatorsClassesNamesArray[@]}
for (( i=0; i<$len; i++ ))
do
    moduleName=${coordinatorsClassesNamesArray[$i]%Coordinator*}
    caseModuleName=`echo ${moduleName:0:1} | tr '[A-Z]'  '[a-z]'`${moduleName:1}
    printToFile "    case $caseModuleName"
done
printToFile "
    func createModule() -> UIViewController {
        switch self {"

for (( i=0; i<$len; i++ ))
do
    moduleName=${coordinatorsClassesNamesArray[$i]%Coordinator*}
    caseModuleName=`echo ${moduleName:0:1} | tr '[A-Z]'  '[a-z]'`${moduleName:1}
    printToFile "        case .$caseModuleName: 
            return ${coordinatorsClassesNamesArray[$i]}.createModule()"
done

printToFile "        }
    }
}"

printToFile "
enum UserStoriesModulesWithOutput: ModuleGenerator {
"
len=${#coordinatorsClassesNamesArray[@]}
for (( i=0; i<$len; i++ ))
do
    moduleName=${coordinatorsClassesNamesArray[$i]%Coordinator*}
    caseModuleName=`echo ${moduleName:0:1} | tr '[A-Z]'  '[a-z]'`${moduleName:1}
    printToFile "    case $caseModuleName(output: ${moduleName}Output)"
done

printToFile "
    func createModule() -> UIViewController {
        switch self {"

for (( i=0; i<$len; i++ ))
do
    moduleName=${coordinatorsClassesNamesArray[$i]%Coordinator*}
    caseModuleName=`echo ${moduleName:0:1} | tr '[A-Z]'  '[a-z]'`${moduleName:1}
    printToFile "        case .$caseModuleName(let output): 
            return ${coordinatorsClassesNamesArray[$i]}.createModule { viewModel in 
                viewModel.output = output
            }
            "
done

printToFile "        }
    }
}"