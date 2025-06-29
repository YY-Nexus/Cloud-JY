import { xai } from "@ai-sdk/xai"
import { generateText, generateObject } from "ai"
import { z } from "zod"

// AI教学配置
export interface AITeachingSession {
  studentId: string
  subject: string
  language: string
  difficulty: number
  culturalContext: boolean
  teachingStyle: "traditional" | "modern" | "international"
}

// 学习分析结果
const LearningAnalysisSchema = z.object({
  comprehension_level: z.number().min(1).max(10),
  areas_of_strength: z.array(z.string()),
  areas_for_improvement: z.array(z.string()),
  recommended_next_topics: z.array(z.string()),
  cultural_insights: z.array(z.string()),
  motivational_message: z.string(),
  difficulty_adjustment: z.number().min(-2).max(2),
})

export class AITeachingEngine {
  private model = xai("grok-3")

  // 生成个性化教学内容
  async generateTeachingContent(session: AITeachingSession, topic: string): Promise<any> {
    const prompt = this.buildTeachingPrompt(session, topic)

    const { text } = await generateText({
      model: this.model,
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return this.parseTeachingContent(text)
  }

  // 分析学习表现
  async analyzeLearningPerformance(
    studentAnswers: any[],
    correctAnswers: any[],
    timeSpent: number,
    session: AITeachingSession,
  ) {
    const analysisPrompt = `
作为一位资深的中国教育专家和AI导师，请分析学生的学习表现：

学习会话信息：
- 学科：${session.subject}
- 语言：${session.language}
- 难度等级：${session.difficulty}
- 教学风格：${session.teachingStyle}

学生表现数据：
- 学生答案：${JSON.stringify(studentAnswers)}
- 正确答案：${JSON.stringify(correctAnswers)}
- 用时：${timeSpent}秒

请从以下维度进行分析：
1. 理解能力评估（1-10分）
2. 优势领域识别
3. 需要改进的方面
4. 推荐的下一步学习主题
5. 文化素养相关的洞察
6. 激励性的反馈信息
7. 难度调整建议（-2到+2）

请确保分析体现中华文化的教育智慧，既严格要求又充满关爱。
`

    const result = await generateObject({
      model: this.model,
      schema: LearningAnalysisSchema,
      prompt: analysisPrompt,
    })

    return result.object
  }

  // 生成多语言语音教学脚本
  async generateVoiceTeachingScript(
    content: string,
    targetLanguage: string,
    culturalContext: boolean,
  ): Promise<string> {
    const prompt = `
请为以下教学内容生成${targetLanguage}语音教学脚本：

原始内容：${content}
目标语言：${targetLanguage}
是否包含文化背景：${culturalContext}

要求：
1. 语音节奏适中，便于学习者跟读
2. 发音标准，语调自然
3. 适当添加停顿和重音标记
4. ${culturalContext ? "融入相关文化背景知识" : "专注于语言学习"}
5. 体现中华文化的教育理念

请生成适合语音合成的标准化脚本。
`

    const { text } = await generateText({
      model: this.model,
      prompt,
      temperature: 0.5,
    })

    return text
  }

  // 生成奥数解题思路
  async generateMathSolution(problem: string, difficulty: number, competitionLevel: string): Promise<any> {
    const prompt = `
作为国际数学竞赛金牌教练，请为以下奥数题目提供详细解答：

题目：${problem}
难度等级：${difficulty}/10
竞赛级别：${competitionLevel}

请提供：
1. 题目分析和关键信息提取
2. 多种解题方法（至少2种）
3. 详细的解题步骤
4. 数学思维训练要点
5. 常见错误和避免方法
6. 相关知识点拓展
7. 类似题型推荐

解答要体现中国数学教育的严谨性和国际竞赛的高标准。
`

    const { text } = await generateText({
      model: this.model,
      prompt,
      temperature: 0.3,
      maxTokens: 3000,
    })

    return this.parseMathSolution(text)
  }

  // 生成文艺素养评估
  async generateArtisticAssessment(studentWork: string, artForm: string, culturalBackground: string): Promise<any> {
    const prompt = `
作为文艺教育专家，请评估学生的${artForm}作品：

学生作品：${studentWork}
艺术形式：${artForm}
文化背景：${culturalBackground}

请从以下维度评估：
1. 技法掌握程度（1-10分）
2. 创意表达能力（1-10分）
3. 文化内涵体现（1-10分）
4. 情感表达深度（1-10分）
5. 整体艺术价值（1-10分）

并提供：
- 具体的优点分析
- 改进建议
- 推荐的学习方向
- 相关文化知识拓展

评估要体现中华文化的美学标准和现代艺术教育理念。
`

    const { text } = await generateText({
      model: this.model,
      prompt,
      temperature: 0.6,
    })

    return this.parseArtisticAssessment(text)
  }

  private buildTeachingPrompt(session: AITeachingSession, topic: string): string {
    const culturalContext = session.culturalContext
      ? "请融入深厚的中华文化底蕴，体现文化传承与现代教育的结合。"
      : "专注于知识点的清晰传授。"

    const styleGuide = {
      traditional: '采用传统的师者风范，严谨而富有威严，体现"师者，传道授业解惑也"的精神。',
      modern: "采用现代化的教学方式，亲切而富有启发性，注重互动和思维引导。",
      international: "融合国际先进教育理念，开放包容，培养全球视野和跨文化理解能力。",
    }

    return `
你是一位德高望重的教育大师，具备深厚的学术功底和丰富的教学经验。

教学任务：
- 学科：${session.subject}
- 主题：${topic}
- 教学语言：${session.language}
- 难度等级：${session.difficulty}/10
- 教学风格：${styleGuide[session.teachingStyle]}

${culturalContext}

请生成一份完整的教学内容，包括：
1. 引入部分（激发兴趣，建立联系）
2. 核心知识点讲解（清晰准确，层次分明）
3. 实例分析（生动具体，便于理解）
4. 练习题目（由浅入深，巩固知识）
5. 文化拓展（如适用）
6. 总结提升（升华主题，启发思考）

要求：
- 语言优美，逻辑清晰
- 体现中华文化的教育智慧
- 培养学生的品格和学识
- 激发学生的学习热情和远大志向
`
  }

  private parseTeachingContent(text: string): any {
    // 解析AI生成的教学内容
    const sections = text.split(/\d+\.\s+/).filter((section) => section.trim())

    return {
      introduction: sections[0] || "",
      coreContent: sections[1] || "",
      examples: sections[2] || "",
      exercises: sections[3] || "",
      culturalExtension: sections[4] || "",
      summary: sections[5] || "",
      generatedAt: new Date().toISOString(),
    }
  }

  private parseMathSolution(text: string): any {
    // 解析数学解题内容
    return {
      analysis: text.split("解题步骤：")[0] || "",
      solutions: text.split("解题步骤：")[1]?.split("数学思维：")[0] || "",
      thinking: text.split("数学思维：")[1]?.split("常见错误：")[0] || "",
      commonMistakes: text.split("常见错误：")[1]?.split("知识拓展：")[0] || "",
      extensions: text.split("知识拓展：")[1] || "",
      generatedAt: new Date().toISOString(),
    }
  }

  private parseArtisticAssessment(text: string): any {
    // 解析文艺评估内容
    return {
      scores: this.extractScores(text),
      strengths: this.extractSection(text, "优点"),
      improvements: this.extractSection(text, "改进建议"),
      recommendations: this.extractSection(text, "学习方向"),
      culturalInsights: this.extractSection(text, "文化知识"),
      generatedAt: new Date().toISOString(),
    }
  }

  private extractScores(text: string): Record<string, number> {
    const scorePattern = /(\d+)分/g
    const scores: Record<string, number> = {}
    let match
    let index = 0
    const categories = ["技法掌握", "创意表达", "文化内涵", "情感表达", "整体价值"]

    while ((match = scorePattern.exec(text)) !== null && index < categories.length) {
      scores[categories[index]] = Number.parseInt(match[1])
      index++
    }

    return scores
  }

  private extractSection(text: string, sectionName: string): string {
    const regex = new RegExp(`${sectionName}[：:]([^\\n]*(?:\\n(?!\\d+\\.|[一二三四五六七八九十])[^\\n]*)*)`, "i")
    const match = text.match(regex)
    return match ? match[1].trim() : ""
  }
}
