#!/bin/bash
for file in `find . -name '*.csv'`; do
cp $file ./
done