// 优先级矩阵分析
export interface FeatureImpact {
  feature: string
  userValue: number // 1-10
  businessValue: number // 1-10
  technicalComplexity: number // 1-10
  resourceRequired: number // 1-10
  riskLevel: number // 1-10
}

export class PriorityMatrix {
  // 计算优先级分数
  calculatePriorityScore(impact: FeatureImpact): number {
    const valueScore = (impact.userValue + impact.businessValue) / 2
    const costScore = (impact.technicalComplexity + impact.resourceRequired + impact.riskLevel) / 3

    // 价值/成本比，越高优先级越高
    return (valueScore / costScore) * 10
  }

  // 第一阶段功能优先级分析
  getPhase1Priorities(): FeatureImpact[] {
    const features: FeatureImpact[] = [
      {
        feature: "用户注册流程验证",
        userValue: 9,
        businessValue: 8,
        technicalComplexity: 4,
        resourceRequired: 3,
        riskLevel: 2,
      },
      {
        feature: "登录状态管理优化",
        userValue: 8,
        businessValue: 7,
        technicalComplexity: 5,
        resourceRequired: 3,
        riskLevel: 3,
      },
      {
        feature: "数据库CRUD操作",
        userValue: 7,
        businessValue: 9,
        technicalComplexity: 6,
        resourceRequired: 5,
        riskLevel: 4,
      },
      {
        feature: "错误处理优化",
        userValue: 8,
        businessValue: 6,
        technicalComplexity: 3,
        resourceRequired: 2,
        riskLevel: 2,
      },
      {
        feature: "内容管理系统",
        userValue: 6,
        businessValue: 8,
        technicalComplexity: 7,
        resourceRequired: 6,
        riskLevel: 5,
      },
      {
        feature: "多语言内容录入",
        userValue: 7,
        businessValue: 7,
        technicalComplexity: 8,
        resourceRequired: 7,
        riskLevel: 6,
      },
    ]

    return features
      .map((f) => ({ ...f, priorityScore: this.calculatePriorityScore(f) }))
      .sort((a, b) => b.priorityScore - a.priorityScore)
  }

  // 生成开发建议
  generateDevelopmentRecommendations(): string[] {
    const priorities = this.getPhase1Priorities()

    return [
      `🚀 立即开始：${priorities[0].feature}（优先级分数：${priorities[0].priorityScore.toFixed(2)}）`,
      `⚡ 紧接着：${priorities[1].feature}（优先级分数：${priorities[1].priorityScore.toFixed(2)}）`,
      `📋 第三优先：${priorities[2].feature}（优先级分数：${priorities[2].priorityScore.toFixed(2)}）`,
      "",
      "💡 建议策略：",
      "- 先完成高价值、低复杂度的功能",
      "- 并行开发独立性强的模块",
      "- 预留20%时间处理意外问题",
      "- 每周进行一次优先级评估调整",
    ]
  }
}
