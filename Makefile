develop:
	npx webpack serve

install:
	npm install

publish:
	npm publish --dry-run

build:
	NODE_ENV=production npx webpack

test:
	npm test

lint:
	npx eslint .

.PHONY: test
