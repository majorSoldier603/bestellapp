#!/bin/bash
STRING=""
echo commit msg:
read STRING
git add .
git commit -m "${STRING}"
git push
