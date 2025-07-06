#!/bin/bash

echo "🚀 启动 DID-Fi DApp 前端开发服务器..."
echo "📍 项目位置: $(pwd)"
echo "🌐 访问地址: http://localhost:3000"
echo "👤 演示用户: http://localhost:3000/user/0x1234567890123456789012345678901234567890"
echo ""

cd frontend && pnpm run dev
