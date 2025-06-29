// 测试账号配置
export const TEST_ACCOUNTS = {
  admin: {
    email: "admin@yy.email",
    password: "admin123",
    profile: {
      role: "admin" as const,
      real_name: "系统管理员",
      phone: "138****0000",
      status: "active" as const,
    },
  },
  student: {
    email: "student@demo.com",
    password: "demo123",
    profile: {
      role: "student" as const,
      real_name: "演示学生",
      phone: "138****1111",
      status: "active" as const,
    },
  },
  teacher: {
    email: "teacher@demo.com",
    password: "demo123",
    profile: {
      role: "teacher" as const,
      real_name: "演示教师",
      phone: "138****2222",
      status: "active" as const,
    },
  },
  parent: {
    email: "parent@demo.com",
    password: "demo123",
    profile: {
      role: "parent" as const,
      real_name: "演示家长",
      phone: "138****3333",
      status: "active" as const,
    },
  },
} as const

// 验证测试账号
export function validateTestAccount(email: string, password: string) {
  const account = Object.values(TEST_ACCOUNTS).find((acc) => acc.email === email && acc.password === password)
  return account || null
}

// 获取账号类型
export function getAccountType(email: string) {
  const entry = Object.entries(TEST_ACCOUNTS).find(([_, account]) => account.email === email)
  return entry ? entry[0] : null
}
