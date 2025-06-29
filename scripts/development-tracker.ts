// 开发进度跟踪器
export interface DevelopmentTask {
  id: string
  title: string
  description: string
  phase: "phase1" | "phase2" | "phase3" | "phase4" | "phase5"
  category: "frontend" | "backend" | "ai" | "database" | "testing" | "deployment"
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "testing" | "completed" | "blocked"
  assignee?: string
  estimatedHours: number
  actualHours?: number
  startDate?: Date
  endDate?: Date
  dependencies: string[]
  tags: string[]
}

export interface DevelopmentMilestone {
  id: string
  title: string
  description: string
  targetDate: Date
  completionCriteria: string[]
  status: "planning" | "in-progress" | "completed" | "delayed"
  progress: number // 0-100
}

export class DevelopmentTracker {
  private tasks: DevelopmentTask[] = []
  private milestones: DevelopmentMilestone[] = []

  // 第一阶段任务定义
  initializePhase1Tasks() {
    const phase1Tasks: DevelopmentTask[] = [
      {
        id: "p1-auth-validation",
        title: "完善用户注册流程验证",
        description: "添加邮箱验证、手机验证、实名认证等功能",
        phase: "phase1",
        category: "backend",
        priority: "high",
        status: "todo",
        estimatedHours: 16,
        dependencies: [],
        tags: ["authentication", "validation", "security"],
      },
      {
        id: "p1-login-optimization",
        title: "优化登录状态管理",
        description: "改进登录状态持久化、自动登录、会话管理",
        phase: "phase1",
        category: "frontend",
        priority: "high",
        status: "todo",
        estimatedHours: 12,
        dependencies: ["p1-auth-validation"],
        tags: ["authentication", "state-management"],
      },
      {
        id: "p1-profile-edit",
        title: "用户个人资料编辑",
        description: "实现用户信息修改、头像上传、偏好设置",
        phase: "phase1",
        category: "frontend",
        priority: "medium",
        status: "todo",
        estimatedHours: 20,
        dependencies: ["p1-login-optimization"],
        tags: ["user-profile", "file-upload"],
      },
      {
        id: "p1-password-reset",
        title: "密码重置功能",
        description: "邮箱重置密码、安全问题验证、密码强度检查",
        phase: "phase1",
        category: "backend",
        priority: "medium",
        status: "todo",
        estimatedHours: 14,
        dependencies: ["p1-auth-validation"],
        tags: ["security", "password", "email"],
      },
      {
        id: "p1-error-handling",
        title: "错误处理和用户反馈",
        description: "统一错误处理、友好错误提示、操作反馈优化",
        phase: "phase1",
        category: "frontend",
        priority: "high",
        status: "todo",
        estimatedHours: 10,
        dependencies: [],
        tags: ["error-handling", "user-experience"],
      },
      {
        id: "p1-database-setup",
        title: "完善数据库连接和配置",
        description: "优化数据库连接池、环境配置、连接安全",
        phase: "phase1",
        category: "database",
        priority: "high",
        status: "todo",
        estimatedHours: 8,
        dependencies: [],
        tags: ["database", "configuration", "performance"],
      },
      {
        id: "p1-crud-operations",
        title: "实现数据CRUD操作",
        description: "完善增删改查操作、事务处理、数据一致性",
        phase: "phase1",
        category: "backend",
        priority: "high",
        status: "todo",
        estimatedHours: 24,
        dependencies: ["p1-database-setup"],
        tags: ["database", "crud", "transactions"],
      },
      {
        id: "p1-data-validation",
        title: "数据验证和安全检查",
        description: "输入验证、SQL注入防护、XSS防护",
        phase: "phase1",
        category: "backend",
        priority: "high",
        status: "todo",
        estimatedHours: 16,
        dependencies: ["p1-crud-operations"],
        tags: ["security", "validation", "sql-injection"],
      },
      {
        id: "p1-content-management",
        title: "内容管理界面",
        description: "创建内容管理后台、内容编辑器、预览功能",
        phase: "phase1",
        category: "frontend",
        priority: "medium",
        status: "todo",
        estimatedHours: 32,
        dependencies: ["p1-crud-operations"],
        tags: ["content-management", "admin", "editor"],
      },
      {
        id: "p1-multilingual-input",
        title: "多语言内容录入",
        description: "多语言编辑器、语言切换、内容同步",
        phase: "phase1",
        category: "frontend",
        priority: "medium",
        status: "todo",
        estimatedHours: 28,
        dependencies: ["p1-content-management"],
        tags: ["multilingual", "content", "editor"],
      },
    ]

    this.tasks.push(...phase1Tasks)
  }

  // 里程碑定义
  initializeMilestones() {
    const milestones: DevelopmentMilestone[] = [
      {
        id: "milestone-1",
        title: "基础平台稳定",
        description: "用户系统完全稳定，基础教学功能可用，AI功能初步集成",
        targetDate: new Date("2024-03-15"),
        completionCriteria: [
          "用户注册登录流程完善",
          "基础数据管理功能完成",
          "内容管理系统可用",
          "基础UI组件稳定",
          "演示数据完整",
        ],
        status: "planning",
        progress: 0,
      },
      {
        id: "milestone-2",
        title: "核心功能完善",
        description: "多语言教学系统完整，奥数训练体系建立，社交学习功能上线",
        targetDate: new Date("2024-05-01"),
        completionCriteria: [
          "AI智能教学系统上线",
          "多语言教学功能完整",
          "奥数竞赛系统建立",
          "社交学习功能可用",
          "学习分析系统基础版",
        ],
        status: "planning",
        progress: 0,
      },
      {
        id: "milestone-3",
        title: "平台生态成熟",
        description: "性能优化完成，安全性达标，国际化支持",
        targetDate: new Date("2024-07-01"),
        completionCriteria: ["系统性能优化完成", "安全性增强达标", "国际化支持完���", "移动端体验优化", "PWA功能上线"],
        status: "planning",
        progress: 0,
      },
    ]

    this.milestones.push(...milestones)
  }

  // 获取当前阶段任务
  getCurrentPhaseTasks(phase: string): DevelopmentTask[] {
    return this.tasks.filter((task) => task.phase === phase)
  }

  // 更新任务状态
  updateTaskStatus(taskId: string, status: DevelopmentTask["status"]) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (task) {
      task.status = status
      if (status === "in-progress" && !task.startDate) {
        task.startDate = new Date()
      }
      if (status === "completed" && !task.endDate) {
        task.endDate = new Date()
      }
    }
  }

  // 计算阶段进度
  calculatePhaseProgress(phase: string): number {
    const phaseTasks = this.getCurrentPhaseTasks(phase)
    if (phaseTasks.length === 0) return 0

    const completedTasks = phaseTasks.filter((task) => task.status === "completed")
    return Math.round((completedTasks.length / phaseTasks.length) * 100)
  }

  // 获取关键路径
  getCriticalPath(): DevelopmentTask[] {
    return this.tasks
      .filter((task) => task.priority === "high")
      .sort((a, b) => {
        if (a.phase !== b.phase) {
          return a.phase.localeCompare(b.phase)
        }
        return a.dependencies.length - b.dependencies.length
      })
  }

  // 生成进度报告
  generateProgressReport() {
    const report = {
      overview: {
        totalTasks: this.tasks.length,
        completedTasks: this.tasks.filter((t) => t.status === "completed").length,
        inProgressTasks: this.tasks.filter((t) => t.status === "in-progress").length,
        blockedTasks: this.tasks.filter((t) => t.status === "blocked").length,
      },
      phases: {
        phase1: this.calculatePhaseProgress("phase1"),
        phase2: this.calculatePhaseProgress("phase2"),
        phase3: this.calculatePhaseProgress("phase3"),
        phase4: this.calculatePhaseProgress("phase4"),
        phase5: this.calculatePhaseProgress("phase5"),
      },
      milestones: this.milestones.map((m) => ({
        title: m.title,
        progress: m.progress,
        status: m.status,
        targetDate: m.targetDate,
      })),
      criticalPath: this.getCriticalPath().slice(0, 5),
    }

    return report
  }
}

// 使用示例
export const developmentTracker = new DevelopmentTracker()
developmentTracker.initializePhase1Tasks()
developmentTracker.initializeMilestones()
