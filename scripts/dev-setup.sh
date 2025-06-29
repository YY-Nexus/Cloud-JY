#!/bin/bash

# 开发环境设置脚本
echo "🛠️  设置开发环境..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 创建开发环境变量文件
if [ ! -f .env.local ]; then
    echo "📝 创建开发环境变量文件..."
    cat > .env.local << EOF
# 开发环境配置
NODE_ENV=development

# Supabase 配置（演示模式）
NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=demo-anon-key

# 微信登录配置（演示模式）
NEXT_PUBLIC_WECHAT_APP_ID=demo_app_id
WECHAT_APP_SECRET=demo_app_secret
NEXT_PUBLIC_WECHAT_REDIRECT_URI=http://localhost:3000/auth/wechat/callback

# AI 配置（演示模式）
XAI_API_KEY=demo_xai_key
EOF
    echo "✅ 开发环境变量文件已创建"
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo "📱 访问地址: http://localhost:3000"
echo "🔧 开发模式支持热重载和演示数据"
echo ""

npm run dev
