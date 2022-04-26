run: node_modules
	@yarn dev

lint:
	@yarn $@

node_modules:
	@yarn

deploy:
	@rm -rf dist
	@yarn build
	@surge -d vite-nft-marketplace.surge.sh dist

.PHONY: \
	run \
	lint