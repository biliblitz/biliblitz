#!/usr/bin/bash

set -ex

yarn workspace @biliblitz/player run lint
yarn workspace biliblitz run lint
