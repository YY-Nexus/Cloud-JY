"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  TrendingUp,
  Calendar,
  Code,
  Database,
  Smartphone,
  Shield,
} from "lucide-react"
import { developmentTracker, type DevelopmentTask } from "@/scripts/development-tracker"

export default function ProgressDashboard() {
  const [activePhase, setActivePhase] = useState("phase1")
  const [tasks, setTasks] = useState<DevelopmentTask[]>([])
  const [progressReport, setProgressReport] = useState<any>(null)

  useEffect(() => {
    // 初始化数据
    const report = developmentTracker.generateProgressReport()
    setProgressReport(report)
    setTasks(developmentTracker.getCurrentPhaseTasks(activePhase))
  }, [activePhase])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "blocked":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "testing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Smartphone className="h-4 w-4" />
      case "backend":
        return <Code className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "testing":
        return <Shield className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  if (!progressReport) {
    return <div>加载中...</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* 总体进度概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总任务数</p>
                <p className="text-3xl font-bold text-gray-900">{progressReport.overview.totalTasks}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">已完成</p>
                <p className="text-3xl font-bold text-green-600">{progressReport.overview.completedTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">进行中</p>
                <p className="text-3xl font-bold text-blue-600">{progressReport.overview.inProgressTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">阻塞中</p>
                <p className="text-3xl font-bold text-red-600">{progressReport.overview.blockedTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 阶段进度 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            各阶段进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(progressReport.phases).map(([phase, progress]) => (
              <div key={phase} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {phase === "phase1" && "第一阶段：基础功能完善"}
                    {phase === "phase2" && "第二阶段：核心功能开发"}
                    {phase === "phase3" && "第三阶段：高级功能开发"}
                    {phase === "phase4" && "第四阶段：系统优化与扩展"}
                    {phase === "phase5" && "第五阶段：高级特性与创新"}
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress as number} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细任务管理 */}
      <Tabs value={activePhase} onValueChange={setActivePhase}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="phase1">第一阶段</TabsTrigger>
          <TabsTrigger value="phase2">第二阶段</TabsTrigger>
          <TabsTrigger value="phase3">第三阶段</TabsTrigger>
          <TabsTrigger value="phase4">第四阶段</TabsTrigger>
          <TabsTrigger value="phase5">第五阶段</TabsTrigger>
        </TabsList>

        <TabsContent value={activePhase} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {activePhase === "phase1" && "第一阶段：基础功能完善"}
                {activePhase === "phase2" && "第二阶段：核心功能开发"}
                {activePhase === "phase3" && "第三阶段：高级功能开发"}
                {activePhase === "phase4" && "第四阶段：系统优化与扩展"}
                {activePhase === "phase5" && "第五阶段：高级特性与创新"}
              </CardTitle>
              <CardDescription>当前阶段进度：{progressReport.phases[activePhase]}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(task.status)}
                        <h4 className="font-semibold">{task.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(task.category)}
                          {task.category}
                        </Badge>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{task.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>预估时间：{task.estimatedHours}小时</span>
                      {task.dependencies.length > 0 && <span>依赖：{task.dependencies.length}个任务</span>}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 里程碑进度 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            关键里程碑
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressReport.milestones.map((milestone: any) => (
              <div key={milestone.title} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{milestone.title}</h4>
                  <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>进度</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                  <div className="text-xs text-gray-500">
                    目标日期：{new Date(milestone.targetDate).toLocaleDateString("zh-CN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 关键路径 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            关键路径任务
          </CardTitle>
          <CardDescription>这些高优先级任务直接影响项目进度</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressReport.criticalPath.map((task: DevelopmentTask, index: number) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{task.title}</h5>
                  <p className="text-xs text-gray-600">{task.description}</p>
                </div>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
