
colorPrint() {
  text=$1
  printf "%b" "\e[1;34m${text}\e[0m"
}

errorColorPrint() {
  text=$1
  printf "%b" "\e[1;91m${text}\e[0m"
}

remove() {
  rm -r "$HOME/Library/Developer/Xcode/Templates/ViewModulesPatterns/MVVM-Coordinator.xctemplate"
}

DIR="$HOME/Library/Developer/Xcode/Templates/ViewModulesPatterns/MVVM-Coordinator.xctemplate"
if [ -d "$DIR" ]
then
  colorPrint "\n\tTemplate with the same name is already installed!\n\t\tDo you wish to replace it?\n"
  colorPrint "\tAnswer yes or no (Y/N): "
  while true; do
    read yn
    case $yn in
        [Yy]* ) remove; break;;
        [Nn]* ) errorColorPrint "\tInstallation was aborted\n"; exit;;
        * ) errorColorPrint "\tAnswer yes or no (Y/N): ";;
    esac
  done
fi

cp -a "$(dirname "$0")/Templates/MVVM+Coordinator/MVVM-Coordinator.xctemplate" ~/Library/Developer/Xcode/Templates/ViewModulesPatterns
if [ $? -ne 0 ]
then
  errorColorPrint "\n\t\tError!\n"
  echo "there was an error" >> outputfile
else
  colorPrint "\n\t\tCompleted!\n\tTemplates was successfully installed!\n\tdir: ~/Library/Developer/Xcode/Templates/ViewModulesPatterns\n\n"
fi
