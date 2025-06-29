// 表单验证系统
import { z } from "zod"

// 基础验证规则
export const ValidationRules = {
  email: z.string().min(1, "邮箱地址不能为空").email("请输入有效的邮箱地址").max(100, "邮箱地址过长"),

  password: z
    .string()
    .min(6, "密码至少需要6位字符")
    .max(50, "密码不能超过50位字符")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "密码必须包含字母和数字"),

  strongPassword: z
    .string()
    .min(8, "密码至少需要8位字符")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "密码必须包含大小写字母、数字和特殊字符"),

  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码")
    .optional(),

  realName: z
    .string()
    .min(2, "姓名至少需要2个字符")
    .max(20, "姓名不能超过20个字符")
    .regex(/^[\u4e00-\u9fa5a-zA-Z\s]+$/, "姓名只能包含中文、英文和空格"),

  studentId: z
    .string()
    .min(6, "学号至少需要6位")
    .max(20, "学号不能超过20位")
    .regex(/^[a-zA-Z0-9]+$/, "学号只能包含字母和数字"),

  grade: z.enum(["grade_7", "grade_8", "grade_9", "grade_10", "grade_11", "grade_12"], {
    errorMap: () => ({ message: "请选择有效的年级" }),
  }),

  role: z.enum(["student", "teacher", "parent", "admin"], {
    errorMap: () => ({ message: "请选择有效的用户角色" }),
  }),
}

// 注册表单验证
export const RegisterFormSchema = z
  .object({
    email: ValidationRules.email,
    password: ValidationRules.password,
    confirmPassword: z.string(),
    realName: ValidationRules.realName,
    phone: ValidationRules.phone,
    role: ValidationRules.role,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  })

// 学生注册扩展验证
export const StudentRegisterSchema = RegisterFormSchema.extend({
  studentId: ValidationRules.studentId,
  grade: ValidationRules.grade,
  className: z.string().max(20, "班级名称不能超过20个字符").optional(),
  schoolName: z.string().max(100, "学校名称不能超过100个字符").optional(),
})

// 教师注册扩展验证
export const TeacherRegisterSchema = RegisterFormSchema.extend({
  teacherId: z.string().min(4, "教师编号至少需要4位").max(20, "教师编号不能超过20位"),
  subjects: z.array(z.string()).min(1, "请至少选择一个任教学科"),
  grades: z.array(ValidationRules.grade).min(1, "请至少选择一个任教年级"),
  schoolName: z.string().max(100, "学校名称不能超过100个字符").optional(),
})

// 家长注册扩展验证
export const ParentRegisterSchema = RegisterFormSchema.extend({
  occupation: z.string().max(50, "职业描述不能超过50个字符").optional(),
  relationshipToStudent: z
    .enum(["father", "mother", "guardian"], {
      errorMap: () => ({ message: "请选择与学生的关系" }),
    })
    .optional(),
})

// 登录表单验证
export const LoginFormSchema = z.object({
  email: ValidationRules.email,
  password: z.string().min(1, "密码不能为空"),
})

// 密码重置验证
export const PasswordResetSchema = z.object({
  email: ValidationRules.email,
})

export const NewPasswordSchema = z
  .object({
    password: ValidationRules.strongPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  })

// 个人资料更新验证
export const ProfileUpdateSchema = z.object({
  realName: ValidationRules.realName,
  phone: ValidationRules.phone,
  avatar_url: z.string().url("请输入有效的头像URL").optional(),
})

// 验证工具函数
export class FormValidator {
  static validate<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
  ): {
    success: boolean
    data?: T
    errors?: Record<string, string>
  } {
    try {
      const result = schema.parse(data)
      return { success: true, data: result }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          errors[path] = err.message
        })
        return { success: false, errors }
      }
      return { success: false, errors: { general: "验证失败" } }
    }
  }

  static async validateAsync<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
  ): Promise<{
    success: boolean
    data?: T
    errors?: Record<string, string>
  }> {
    try {
      const result = await schema.parseAsync(data)
      return { success: true, data: result }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          errors[path] = err.message
        })
        return { success: false, errors }
      }
      return { success: false, errors: { general: "验证失败" } }
    }
  }

  // 实时验证单个字段
  static validateField<T>(schema: z.ZodSchema<T>, fieldName: string, value: any): string | null {
    try {
      const fieldSchema = (schema as any).shape[fieldName]
      if (fieldSchema) {
        fieldSchema.parse(value)
        return null
      }
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || "验证失败"
      }
      return "验证失败"
    }
  }
}
