#!/bin/bash
STRING=""
read STRING
git add .
git commit -m '${STRING}'
git push