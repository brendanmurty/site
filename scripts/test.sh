#!/bin/bash

# Run all of the tests in the "tests" directory and allow these
# test scripts to also run other Deno scripts as needed.

deno test --allow-run tests
