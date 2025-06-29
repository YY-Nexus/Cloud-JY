#!/bin/bash

# 智慧教育平台部署脚本
echo "🎓 开始部署智慧教育平台..."

# 检查 Docker 和 Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 创建环境变量文件
if [ ! -f .env ]; then
    echo "📝 创建环境变量文件..."
    cat > .env << EOF
# 数据库配置
POSTGRES_PASSWORD=education_platform_2024

# Supabase 配置（可选，用于生产环境）
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# 微信登录配置
WECHAT_APP_ID=your_wechat_app_id
WECHAT_APP_SECRET=your_wechat_app_secret
WECHAT_REDIRECT_URI=https://yourdomain.com/auth/wechat/callback

# AI 配置
XAI_API_KEY=your_xai_api_key
EOF
    echo "✅ 环境变量文件已创建，请编辑 .env 文件配置您的参数"
fi

# 创建 SSL 目录
mkdir -p ssl

# 生成自签名证书（仅用于开发）
if [ ! -f ssl/cert.pem ]; then
    echo "🔐 生成自签名 SSL 证书..."
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
        -subj "/C=CN/ST=Beijing/L=Beijing/O=Education Platform/CN=localhost"
    echo "✅ SSL 证书已生成"
fi

# 构建和启动服务
echo "🚀 构建和启动服务..."
docker-compose up -d --build

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "📊 检查服务状态..."
docker-compose ps

# 显示访问信息
echo ""
echo "🎉 部署完成！"
echo "📱 访问地址："
echo "   HTTP:  http://localhost"
echo "   HTTPS: https://localhost"
echo ""
echo "📋 服务状态："
echo "   应用服务: http://localhost:3000"
echo "   数据库:   localhost:5432"
echo "   缓存:     localhost:6379"
echo ""
echo "🔧 管理命令："
echo "   查看日志: docker-compose logs -f"
echo "   停止服务: docker-compose down"
echo "   重启服务: docker-compose restart"
echo ""
echo "📚 更多信息请查看 README.md"
