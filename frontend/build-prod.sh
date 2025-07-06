#!/bin/bash

# DID-Fi DApp 生产环境构建脚本

echo "🚀 开始构建 DID-Fi DApp 生产版本..."

# 检查是否在 frontend 目录
if [ ! -f "nuxt.config.ts" ]; then
  echo "❌ 请在 frontend 目录下运行此脚本"
  exit 1
fi

# 设置环境变量
export NODE_ENV=production

# 清理之前的构建
echo "🧹 清理之前的构建文件..."
rm -rf .output
rm -rf .nuxt
rm -rf dist

# 安装依赖
echo "📦 安装生产依赖..."
pnpm install --frozen-lockfile

# 类型检查
echo "🔍 执行 TypeScript 类型检查..."
pnpm run type-check

# 代码检查
echo "🔍 执行代码质量检查..."
pnpm run lint

# 构建应用
echo "🔨 构建应用..."
pnpm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
  echo "✅ 构建成功完成！"
  echo "📁 构建文件位于 .output/ 目录"
  echo "🚀 可以使用 'pnpm start' 启动生产服务器"
else
  echo "❌ 构建失败"
  exit 1
fi

# 显示构建信息
echo ""
echo "📊 构建信息:"
echo "- 输出目录: .output/"
echo "- 服务器文件: .output/server/index.mjs"
echo "- 静态文件: .output/public/"
echo ""
echo "🌍 部署说明:"
echo "1. 将 .output/ 目录复制到服务器"
echo "2. 运行 'node .output/server/index.mjs' 启动服务"
echo "3. 或使用 PM2: 'pm2 start .output/server/index.mjs --name did-fi-dapp'"
