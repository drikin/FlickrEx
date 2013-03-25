#!/usr/bin/env bash

# 1. cleanup old js files
find . -name "*.js" -exec rm {} \;

# 2. compile ts files
find src -name "*.ts" -exec tsc {} \;

# 3. move js files to top dir
find src -name "*.js" -exec mv {} . \;

# 4. closure compile to generate min.js files
find . -name "*.js" -print0 | perl -pe s/\.js//g | xargs -0 -I% java -jar bin/compiler-latest/compiler.jar --js=%.js --js_output_file=%.min.js

