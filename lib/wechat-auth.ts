interface WeChatConfig {
  appId: string
  redirectUri: string
}

interface WeChatUserInfo {
  openid: string
  nickname: string
  sex: number
  province: string
  city: string
  country: string
  headimgurl: string
  unionid?: string
}

export class WeChatAuthService {
  private config: WeChatConfig

  constructor(config: WeChatConfig) {
    this.config = config
  }

  // 生成微信扫码登录二维码
  generateQRCodeUrl(): string {
    const params = new URLSearchParams({
      appid: this.config.appId,
      redirect_uri: encodeURIComponent(this.config.redirectUri),
      response_type: "code",
      scope: "snsapi_login",
      state: this.generateState(),
    })

    return `https://open.weixin.qq.com/connect/qrconnect?${params.toString()}#wechat_redirect`
  }

  // 生成微信网页授权URL（用于微信内一键登录）
  generateWebAuthUrl(): string {
    const params = new URLSearchParams({
      appid: this.config.appId,
      redirect_uri: encodeURIComponent(this.config.redirectUri),
      response_type: "code",
      scope: "snsapi_userinfo",
      state: this.generateState(),
    })

    return `https://open.weixin.qq.com/connect/oauth2/authorize?${params.toString()}#wechat_redirect`
  }

  // 检查是否在微信环境中
  isWeChatBrowser(): boolean {
    if (typeof window === "undefined") return false
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes("micromessenger")
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}

// 微信登录配置（仅客户端安全的配置）
export const wechatConfig: WeChatConfig = {
  appId: process.env.NEXT_PUBLIC_WECHAT_APP_ID || "demo_app_id",
  redirectUri: process.env.NEXT_PUBLIC_WECHAT_REDIRECT_URI || "http://localhost:3000/auth/wechat/callback",
}

export const wechatAuth = new WeChatAuthService(wechatConfig)
