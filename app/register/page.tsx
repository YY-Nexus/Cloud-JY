"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Users, GraduationCap, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand/brand-logo"
import { BrandSlogan } from "@/components/brand/brand-slogan"

const gradeOptions = [
  { value: "grade_7", label: "初一" },
  { value: "grade_8", label: "初二" },
  { value: "grade_9", label: "初三" },
  { value: "grade_10", label: "高一" },
  { value: "grade_11", label: "高二" },
  { value: "grade_12", label: "高三" },
]

const subjectOptions = [
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
  "音乐",
]

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { signUp } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile()

  // 通用字段
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [realName, setRealName] = useState("")
  const [phone, setPhone] = useState("")

  // 学生特有字段
  const [studentId, setStudentId] = useState("")
  const [grade, setGrade] = useState("")
  const [className, setClassName] = useState("")
  const [schoolName, setSchoolName] = useState("")

  // 教师特有字段
  const [teacherId, setTeacherId] = useState("")
  const [subjects, setSubjects] = useState<string[]>([])
  const [teachingGrades, setTeachingGrades] = useState<string[]>([])

  // 家长特有字段
  const [occupation, setOccupation] = useState("")
  const [relationshipToStudent, setRelationshipToStudent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("密码长度至少6位")
      setLoading(false)
      return
    }

    let userData: any = {
      role: activeTab,
      real_name: realName,
      phone: phone,
    }

    // 根据角色添加特定数据
    if (activeTab === "student") {
      userData = {
        ...userData,
        student_id: studentId,
        grade: grade,
        class_name: className,
        school_name: schoolName,
      }
    } else if (activeTab === "teacher") {
      userData = {
        ...userData,
        teacher_id: teacherId,
        subjects: subjects,
        grades: teachingGrades,
        school_name: schoolName,
      }
    } else if (activeTab === "parent") {
      userData = {
        ...userData,
        occupation: occupation,
        relationship_to_student: relationshipToStudent,
      }
    }

    const { error } = await signUp(email, password, userData)

    if (error) {
      setError("注册失败：" + error.message)
    } else {
      setSuccess("注册成功！请查看邮箱验证链接")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }

    setLoading(false)
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSubjects([...subjects, subject])
    } else {
      setSubjects(subjects.filter((s) => s !== subject))
    }
  }

  const handleGradeChange = (gradeValue: string, checked: boolean) => {
    if (checked) {
      setTeachingGrades([...teachingGrades, gradeValue])
    } else {
      setTeachingGrades(teachingGrades.filter((g) => g !== gradeValue))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className={`w-full ${isMobile ? "max-w-sm" : "max-w-2xl"}`}>
        {/* 顶部标题 */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <BrandLogo size="xl" textPosition="bottom" />
          </div>
          <h1 className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-gray-900 mb-2`}>加入言语云³平台</h1>
          <BrandSlogan language="chinese" size={isMobile ? "sm" : "md"} />
        </div>

        <Card className={isMobile ? "shadow-lg" : ""}>
          <CardHeader className={isMobile ? "pb-4" : ""}>
            <CardTitle className={isMobile ? "text-lg" : "text-xl"}>用户注册</CardTitle>
            <CardDescription className={isMobile ? "text-sm" : ""}>请选择您的身份并填写相关信息</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" className={`flex items-center gap-1 ${isMobile ? "text-xs" : ""}`}>
                  <BookOpen className="h-4 w-4" />
                  {!isMobile && "学生"}
                </TabsTrigger>
                <TabsTrigger value="teacher" className={`flex items-center gap-1 ${isMobile ? "text-xs" : ""}`}>
                  <GraduationCap className="h-4 w-4" />
                  {!isMobile && "教师"}
                </TabsTrigger>
                <TabsTrigger value="parent" className={`flex items-center gap-1 ${isMobile ? "text-xs" : ""}`}>
                  <Users className="h-4 w-4" />
                  {!isMobile && "家长"}
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="mt-6">
                {/* 通用字段 */}
                <div className="space-y-4 mb-6">
                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                      <Label htmlFor="realName" className={isMobile ? "text-sm" : ""}>
                        真实姓名 *
                      </Label>
                      <Input
                        id="realName"
                        value={realName}
                        onChange={(e) => setRealName(e.target.value)}
                        placeholder="请输入真实姓名"
                        className={isMobile ? "h-12" : ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className={isMobile ? "text-sm" : ""}>
                        手机号码
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="请输入手机号码"
                        className={isMobile ? "h-12" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className={isMobile ? "text-sm" : ""}>
                      邮箱地址 *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="请输入邮箱地址"
                      className={isMobile ? "h-12" : ""}
                      required
                    />
                  </div>

                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                      <Label htmlFor="password" className={isMobile ? "text-sm" : ""}>
                        密码 *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="至少6位密码"
                        className={isMobile ? "h-12" : ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className={isMobile ? "text-sm" : ""}>
                        确认密码 *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="再次输入密码"
                        className={isMobile ? "h-12" : ""}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 学生特有字段 */}
                <TabsContent value="student" className="space-y-4">
                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                      <Label htmlFor="studentId" className={isMobile ? "text-sm" : ""}>
                        学号 *
                      </Label>
                      <Input
                        id="studentId"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="请输入学号"
                        className={isMobile ? "h-12" : ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade" className={isMobile ? "text-sm" : ""}>
                        年级 *
                      </Label>
                      <Select value={grade} onValueChange={setGrade} required>
                        <SelectTrigger className={isMobile ? "h-12" : ""}>
                          <SelectValue placeholder="选择年级" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                      <Label htmlFor="className" className={isMobile ? "text-sm" : ""}>
                        班级
                      </Label>
                      <Input
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="如：1班"
                        className={isMobile ? "h-12" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolName" className={isMobile ? "text-sm" : ""}>
                        学校名称
                      </Label>
                      <Input
                        id="schoolName"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="请输入学校名称"
                        className={isMobile ? "h-12" : ""}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* 教师特有字段 */}
                <TabsContent value="teacher" className="space-y-4">
                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                      <Label htmlFor="teacherId" className={isMobile ? "text-sm" : ""}>
                        教师编号 *
                      </Label>
                      <Input
                        id="teacherId"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        placeholder="请输入教师编号"
                        className={isMobile ? "h-12" : ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacherSchoolName" className={isMobile ? "text-sm" : ""}>
                        学校名称
                      </Label>
                      <Input
                        id="teacherSchoolName"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="请输入学校名称"
                        className={isMobile ? "h-12" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={isMobile ? "text-sm" : ""}>任教学科 *</Label>
                    <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-2`}>
                      {subjectOptions.slice(0, isMobile ? 8 : 12).map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={subjects.includes(subject)}
                            onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={isMobile ? "text-sm" : ""}>任教年级 *</Label>
                    <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} gap-2`}>
                      {gradeOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`grade-${option.value}`}
                            checked={teachingGrades.includes(option.value)}
                            onCheckedChange={(checked) => handleGradeChange(option.value, checked as boolean)}
                          />
                          <Label htmlFor={`grade-${option.value}`} className="text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* 家长特有字段 */}
                <TabsContent value="parent" className="space-y-4">
                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                      <Label htmlFor="occupation" className={isMobile ? "text-sm" : ""}>
                        职业
                      </Label>
                      <Input
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        placeholder="请输入职业"
                        className={isMobile ? "h-12" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationshipToStudent" className={isMobile ? "text-sm" : ""}>
                        与学生关系
                      </Label>
                      <Select value={relationshipToStudent} onValueChange={setRelationshipToStudent}>
                        <SelectTrigger className={isMobile ? "h-12" : ""}>
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

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className={isMobile ? "text-sm" : ""}>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className={`text-green-600 ${isMobile ? "text-sm" : ""}`}>
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className={`w-full ${isMobile ? "h-12" : ""}`} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      注册中...
                    </>
                  ) : (
                    "立即注册"
                  )}
                </Button>
              </form>
            </Tabs>

            {/* 登录链接 */}
            <div className={`mt-6 text-center ${isMobile ? "text-sm" : ""}`}>
              <p className="text-gray-600">
                已有账号？{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  立即登录
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 底部标语 */}
        <div className={`mt-6 text-center ${isMobile ? "text-xs" : "text-sm"}`}>
          <p className="text-gray-500">注册即表示您同意我们的服务条款和隐私政策</p>
          <BrandSlogan language="english" size="sm" className="mt-1" />
        </div>
      </div>
    </div>
  )
}
