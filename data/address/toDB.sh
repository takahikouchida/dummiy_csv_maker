#!/bin/bash
for file in `find . -name '*.csv'`; do
php toDB.php $file
done