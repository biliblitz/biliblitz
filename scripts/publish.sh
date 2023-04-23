#!/usr/bin/bash

set -ex

yarn workspace @biliblitz/libass-wasm run publish
yarn workspace @biliblitz/player run publish
