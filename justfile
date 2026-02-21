build:
    bun build src/*.ts --outdir dist --target browser

dev:
    bun build src/*.ts --outdir dist --target browser --watch
