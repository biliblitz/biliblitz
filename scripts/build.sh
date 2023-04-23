#!/usr/bin/bash

set -ex

yarn workspace @biliblitz/icons run build
yarn workspace @biliblitz/player run build
yarn workspace biliblitz run build
yarn workspace @biliblitz/cli run build
