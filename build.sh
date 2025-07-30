#!/bin/bash

# Firefox拡張機能のビルドスクリプト

# スクリプトが存在するディレクトリに移動
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "Building Firefox extension..."

# npmビルドを実行
npm run build

# ビルドが成功したかチェック
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# buildディレクトリが存在するかチェック
if [ ! -d "build" ]; then
    echo "Build directory not found!"
    exit 1
fi

# 既存のzipファイルを削除
rm -f mini-bookmarks-firefox.zip

# buildディレクトリの内容をzipに圧縮
cd build
zip -r ../mini-bookmarks-firefox.zip ./*
cd ..

echo "Firefox extension created: mini-bookmarks-firefox.zip"
echo "You can now install this in Firefox by going to about:debugging > This Firefox > Load Temporary Add-on"