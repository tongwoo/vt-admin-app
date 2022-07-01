#!/usr/bin/env bash

echo -n "请输入要构建镜像的名称(默认为myapp)："
read -r name
if [ -z "$name" ]
then
    name="myapp"
fi
echo "=============================="
echo "开始构建 $name"
echo "=============================="
docker build -t "$name" .
echo "=============================="
echo "构建完成"
echo "=============================="
