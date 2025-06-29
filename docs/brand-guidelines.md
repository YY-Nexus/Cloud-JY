# 🎨 言语云³ 品牌使用指南

## 品牌标识

### Logo 使用规范

#### 主要Logo
- **文件路径**: `/public/images/yanyu-logo.png`
- **最小尺寸**: 24x24px
- **推荐尺寸**: 40x40px (标准), 48x48px (大尺寸)
- **格式**: PNG (支持透明背景)

#### Logo 变体
1. **完整版**: Logo + 中文名称 + 英文缩写
2. **图标版**: 仅Logo图标
3. **文字版**: 仅品牌名称

### 品牌名称

#### 中文名称
- **主要名称**: 言语云³
- **完整名称**: 言语云³ 智能教育平台
- **英文名称**: YanYu Intelligent Cloud³ DeepStack Education Platform
- **英文缩写**: YYC³-DeepStack

### 品牌标语

#### 中文标语
**主标语**: 万象归元于云枢；言语智启新纪元

#### 英文标语
**主标语**: All things converge to the Cloud Pivot; YanYu's wisdom ignites a new epoch.

#### 辅助标语
- 传承文化、携手智能、冲刺985
- Heritage Culture, AI-Powered, Elite Universities

## 色彩规范

### 主色调
- **主蓝色**: #3b82f6 (blue-500)
- **辅助蓝色**: #0ea5e9 (sky-500)
- **强调色**: #a855f7 (purple-500)

### 渐变色
- **主渐变**: from-blue-600 via-cyan-500 to-blue-700
- **辅助渐变**: from-cyan-400 via-blue-500 to-indigo-600
- **强调渐变**: from-blue-500 via-purple-500 to-cyan-500

### 使用场景
- **背景渐变**: 用于重要区域背景
- **文字渐变**: 用于标题和重要文字
- **按钮渐变**: 用于主要操作按钮

## 字体规范

### 中文字体
- **主字体**: Noto Sans SC
- **备用字体**: Microsoft YaHei, sans-serif

### 英文字体
- **主字体**: Inter
- **备用字体**: Helvetica, Arial, sans-serif

### 字体层级
- **主标题**: 2xl-3xl, font-bold
- **副标题**: lg-xl, font-semibold
- **正文**: base, font-normal
- **辅助文字**: sm, font-medium

## 组件使用

### BrandLogo 组件
\`\`\`tsx
// 完整Logo
<BrandLogo size="lg" showText={true} />

// 仅图标
<BrandLogo variant="icon" size="md" />

// 仅文字
<BrandLogo variant="text" size="lg" />
\`\`\`

### BrandSlogan 组件
\`\`\`tsx
// 中文标语
<BrandSlogan language="chinese" size="lg" />

// 英文标语
<BrandSlogan language="english" size="md" />

// 双语标语
<BrandSlogan showBoth size="lg" />
\`\`\`

## 应用场景

### 网页应用
- **导航栏**: 使用中等尺寸Logo + 品牌名称
- **登录页**: 使用大尺寸Logo + 完整标语
- **首页**: 使用特大尺寸Logo + 双语标语

### 移动应用
- **顶部栏**: 使用小尺寸Logo + 简化名称
- **启动页**: 使用大尺寸Logo + 主标语
- **关于页**: 使用完整品牌信息

### 文档资料
- **封面**: 使用完整Logo + 全称 + 标语
- **页眉**: 使用小尺寸Logo + 缩写
- **水印**: 使用透明度Logo

## 禁用规范

### 不当使用
❌ 不要改变Logo的颜色  
❌ 不要拉伸或压缩Logo  
❌ 不要在低对比度背景上使用  
❌ 不要添加阴影或特效  
❌ 不要与其他图形元素重叠  

### 最小间距
- Logo周围至少保持Logo高度1/2的空白区域
- 文字标语与Logo之间保持适当间距
- 不同品牌元素之间保持视觉平衡

## 更新记录

- **v1.0.0**: 初始品牌规范制定
- **v1.1.0**: 添加移动端适配规范
- **v1.2.0**: 完善组件使用指南
