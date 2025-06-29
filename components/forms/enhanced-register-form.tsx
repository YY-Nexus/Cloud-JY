"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToastHelpers } from "@/components/ui/toast-system"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  FormValidator,
  StudentRegisterSchema,
  TeacherRegisterSchema,
  ParentRegisterSchema,
} from "@/lib/validation/form-validator"
import {
  BookOpen,
  Users,
  GraduationCap,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  Mail,
  Phone,
  User,
} from "lucide-react"

interface FormData {
  email: string
  password: string
  confirmPassword: string
  realName: string
  phone: string
  role: "student" | "teacher" | "parent"
  // 学生特有字段
  studentId?: string
  grade?: string
  className?: string
  schoolName?: string
  // 教师特有字段
  teacherId?: string
  subjects?: string[]
  grades?: string[]
  // 家长特有字段
  occupation?: string
  relationshipToStudent?: string
}

export default function EnhancedRegisterForm() {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "parent">("student")
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    realName: "",
    phone: "",
    role: "student",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [step, setStep] = useState(1)
  const [emailVerified, setEmailVerified] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()
  const toast = useToastHelpers()

  // 密码强度计算
  useEffect(() => {
    const calculatePasswordStrength = (password: string) => {
      let strength = 0
      if (password.length >= 6) strength += 20
      if (password.length >= 8) strength += 20
      if (/[a-z]/.test(password)) strength += 20
      if (/[A-Z]/.test(password)) strength += 20
      if (/\d/.test(password)) strength += 20
      if (/[^a-zA-Z0-9]/.test(password)) strength += 20
      return Math.min(strength, 100)
    }

    setPasswordStrength(calculatePasswordStrength(formData.password))
  }, [formData.password])

  // 实时字段验证
  const validateField = (fieldName: string, value: any) => {
    const schema = getValidationSchema()
    const error = FormValidator.validateField(schema, fieldName, value)

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error || "",
    }))
  }

  // 获取对应的验证模式
  const getValidationSchema = () => {
    switch (activeTab) {
      case "student":
        return StudentRegisterSchema
      case "teacher":
        return TeacherRegisterSchema
      case "parent":
        return ParentRegisterSchema
      default:
        return StudentRegisterSchema
    }
  }

  // 处理输入变化
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value, role: activeTab }))

    // 实时验证
    setTimeout(() => validateField(field, value), 300)
  }

  // 处理数组字段变化（如科目、年级）
  const handleArrayFieldChange = (field: "subjects" | "grades", value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentArray = prev[field] || []
      const newArray = checked ? [...currentArray, value] : currentArray.filter((item) => item !== value)

      return { ...prev, [field]: newArray }
    })
  }

  // 邮箱验证
  const handleEmailVerification = async () => {
    if (!formData.email) {
      toast.error("请先输入邮箱地址")
      return
    }

    setLoading(true)
    try {
      // 模拟发送验证邮件
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEmailVerified(true)
      toast.success("验证邮件已发送，请查收")
    } catch (error) {
      toast.error("发送验证邮件失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 验证表单
    const schema = getValidationSchema()
    const validation = FormValidator.validate(schema, formData)

    if (!validation.success) {
      setErrors(validation.errors || {})
      toast.error("请检查表单中的错误信息")
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const { error } = await signUp(formData.email, formData.password, formData)

      if (error) {
        toast.error("注册失败：" + error.message)
      } else {
        toast.success("注册成功！欢迎加入言语云³")
        setTimeout(() => router.push("/dashboard"), 1500)
      }
    } catch (error) {
      toast.error("注册过程中出现错误，请重试")
    } finally {
      setLoading(false)
    }
  }

  // 下一步
  const handleNextStep = () => {
    const basicFields = ["email", "password", "confirmPassword", "realName"]
    const hasBasicErrors = basicFields.some((field) => errors[field])
    const hasBasicValues = basicFields.every((field) => formData[field as keyof FormData])

    if (!hasBasicValues || hasBasicErrors) {
      toast.warning("请完善基本信息")
      return
    }

    setStep(2)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500"
    if (passwordStrength < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "弱"
    if (passwordStrength < 70) return "中等"
    return "强"
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">加入言语云³平台</CardTitle>
          <CardDescription>选择您的身份，开启智慧学习之旅</CardDescription>

          {/* 进度指示器 */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="text-sm">基本信息</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="text-sm">详细信息</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value as "student" | "teacher" | "parent")
              setFormData((prev) => ({ ...prev, role: value as "student" | "teacher" | "parent" }))
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                学生
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                教师
              </TabsTrigger>
              <TabsTrigger value="parent" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                家长
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="mt-6">
              {step === 1 && (
                <div className="space-y-6">
                  {/* 基本信息 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="h-5 w-5" />
                      基本信息
                    </h3>

                    {/* 姓名 */}
                    <div className="space-y-2">
                      <Label htmlFor="realName">真实姓名 *</Label>
                      <Input
                        id="realName"
                        value={formData.realName}
                        onChange={(e) => handleInputChange("realName", e.target.value)}
                        placeholder="请输入您的真实姓名"
                        className={errors.realName ? "border-red-500" : ""}
                      />
                      {errors.realName && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.realName}
                        </p>
                      )}
                    </div>

                    {/* 邮箱 */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        邮箱地址 *
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="请输入邮箱地址"
                          className={`flex-1 ${errors.email ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleEmailVerification}
                          disabled={loading || emailVerified || !formData.email}
                        >
                          {emailVerified ? <CheckCircle className="h-4 w-4 text-green-600" /> : "验证"}
                        </Button>
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                      {emailVerified && (
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          邮箱已验证
                        </p>
                      )}
                    </div>

                    {/* 手机号 */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        手机号码
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="请输入手机号码（可选）"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* 密码 */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        密码 *
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="请输入密码"
                          className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>

                      {/* 密码强度指示器 */}
                      {formData.password && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>密码强度</span>
                            <span
                              className={`font-medium ${passwordStrength < 40 ? "text-red-600" : passwordStrength < 70 ? "text-yellow-600" : "text-green-600"}`}
                            >
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <Progress value={passwordStrength} className="h-1" />
                        </div>
                      )}

                      {errors.password && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* 确认密码 */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">确认密码 *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="请再次输入密码"
                          className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="button" onClick={handleNextStep} className="w-full" disabled={loading}>
                    下一步：完善详细信息
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* 角色特定信息 */}
                  <TabsContent value="student" className="space-y-4 mt-0">
                    <h3 className="text-lg font-semibold">学生信息</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">学号 *</Label>
                        <Input
                          id="studentId"
                          value={formData.studentId || ""}
                          onChange={(e) => handleInputChange("studentId", e.target.value)}
                          placeholder="请输入学号"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="grade">年级 *</Label>
                        <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="选择年级" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grade_7">初一</SelectItem>
                            <SelectItem value="grade_8">初二</SelectItem>
                            <SelectItem value="grade_9">初三</SelectItem>
                            <SelectItem value="grade_10">高一</SelectItem>
                            <SelectItem value="grade_11">高二</SelectItem>
                            <SelectItem value="grade_12">高三</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="className">班级</Label>
                        <Input
                          id="className"
                          value={formData.className || ""}
                          onChange={(e) => handleInputChange("className", e.target.value)}
                          placeholder="如：1班"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schoolName">学校名称</Label>
                        <Input
                          id="schoolName"
                          value={formData.schoolName || ""}
                          onChange={(e) => handleInputChange("schoolName", e.target.value)}
                          placeholder="请输入学校名称"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="teacher" className="space-y-4 mt-0">
                    <h3 className="text-lg font-semibold">教师信息</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="teacherId">教师编号 *</Label>
                        <Input
                          id="teacherId"
                          value={formData.teacherId || ""}
                          onChange={(e) => handleInputChange("teacherId", e.target.value)}
                          placeholder="请输入教师编号"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="teacherSchoolName">学校名称</Label>
                        <Input
                          id="teacherSchoolName"
                          value={formData.schoolName || ""}
                          onChange={(e) => handleInputChange("schoolName", e.target.value)}
                          placeholder="请输入学校名称"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>任教学科 *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          "语文",
                          "数学",
                          "英语",
                          "物理",
                          "化学",
                          "生物",
                          "历史",
                          "地理",
                          "政治",
                          "信息技术",
                          "体育",
                          "美术",
                        ].map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={formData.subjects?.includes(subject) || false}
                              onCheckedChange={(checked) =>
                                handleArrayFieldChange("subjects", subject, checked as boolean)
                              }
                            />
                            <Label htmlFor={`subject-${subject}`} className="text-sm">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="parent" className="space-y-4 mt-0">
                    <h3 className="text-lg font-semibold">家长信息</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupation">职业</Label>
                        <Input
                          id="occupation"
                          value={formData.occupation || ""}
                          onChange={(e) => handleInputChange("occupation", e.target.value)}
                          placeholder="请输入职业"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="relationshipToStudent">与学生关系</Label>
                        <Select
                          value={formData.relationshipToStudent}
                          onValueChange={(value) => handleInputChange("relationshipToStudent", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择关系" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="father">父亲</SelectItem>
                            <SelectItem value="mother">母亲</SelectItem>
                            <SelectItem value="guardian">监护人</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      上一步
                    </Button>

                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          注册中...
                        </>
                      ) : (
                        "完成注册"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
