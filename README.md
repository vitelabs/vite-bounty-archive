# Vite Bounty Archive

Run `find . -name .git -exec rm -rf {} \;` to remove `.git` folders starting at the working directory. So do not run this command at the root of `vite-bounty-archive`, run it after `cd`ing into a child directory. Removing `.git` ensures there are no "[gitlinks](https://stackoverflow.com/questions/62056294/github-folders-have-a-white-arrow-on-them)" in this repo.