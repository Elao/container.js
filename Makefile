.SILENT:
.PHONY: test

# Install dependencies
install:
	npm install

# Launch watcher
watch:
	npm run watch

# Build lib
build:
	npm run build

# Lint and code style fix
lint:
	npm run fix

lint@integration:
	npm run lint

# Run tests
test: build
	npm run test
