# データ入手元

    https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi

# 解凍

    unzip '*.zip'

# file copy

    cp.sh

# conver sql query

    sh toDB.sh > address.sql

# import postgresql

    psql < address.sql

