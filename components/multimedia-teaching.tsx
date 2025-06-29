"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  BookOpen,
  Headphones,
  Video,
  Mic,
  Globe,
  Star,
  Award,
  Brain,
} from "lucide-react"

interface MultilingualContent {
  id: string
  title: Record<string, string>
  content: Record<string, string>
  audioUrls: Record<string, string>
  videoUrl?: string
  difficulty: number
  culturalContext?: string
  subject: string
}

interface MultimediaTeachingProps {
  content: MultilingualContent
  currentLanguage: string
  onLanguageChange: (language: string) => void
  onProgressUpdate: (progress: number) => void
}

const SUPPORTED_LANGUAGES = {
  classical_chinese: { name: "古文", flag: "🏛️", color: "bg-amber-100 text-amber-800" },
  modern_chinese: { name: "现代汉语", flag: "🇨🇳", color: "bg-red-100 text-red-800" },
  english: { name: "English", flag: "🇺🇸", color: "bg-blue-100 text-blue-800" },
  japanese: { name: "日本語", flag: "🇯🇵", color: "bg-pink-100 text-pink-800" },
  korean: { name: "한국어", flag: "🇰🇷", color: "bg-green-100 text-green-800" },
  russian: { name: "Русский", flag: "🇷🇺", color: "bg-purple-100 text-purple-800" },
}

export default function MultimediaTeaching({
  content,
  currentLanguage,
  onLanguageChange,
  onProgressUpdate,
}: MultimediaTeachingProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [showTranscript, setShowTranscript] = useState(true)

  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      onProgressUpdate(100)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [onProgressUpdate])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0] / 100
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.playbackRate = rate
    setPlaybackRate(rate)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return "bg-green-100 text-green-800"
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800"
    if (difficulty <= 8) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 3) return "基础"
    if (difficulty <= 6) return "进阶"
    if (difficulty <= 8) return "高级"
    return "竞赛"
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 课程标题和信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">
                {content.title[currentLanguage] || content.title["modern_chinese"]}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {content.subject}
                </Badge>
                <Badge className={getDifficultyColor(content.difficulty)}>
                  <Star className="h-3 w-3 mr-1" />
                  {getDifficultyLabel(content.difficulty)} ({content.difficulty}/10)
                </Badge>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                多语言教学
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                985/211标准
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 语言选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            选择学习语言
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
              <Button
                key={code}
                variant={currentLanguage === code ? "default" : "outline"}
                className={`h-16 flex-col gap-1 ${currentLanguage === code ? "" : "hover:bg-gray-50"}`}
                onClick={() => onLanguageChange(code)}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-xs">{lang.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 主要教学内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 音频播放器 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              语音教学
              <Badge className={SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES]?.color}>
                {SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES]?.name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 音频元素 */}
            <audio ref={audioRef} src={content.audioUrls[currentLanguage]} preload="metadata" />

            {/* 播放控制 */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm">
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button size="lg" onClick={togglePlayPause} className="w-16 h-16 rounded-full">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>

              <Button variant="outline" size="sm">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* 进度条 */}
            <div className="space-y-2">
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleSeek}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* 音量和播放速度控制 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">播放速度:</span>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <Button
                    key={rate}
                    variant={playbackRate === rate ? "default" : "ghost"}
                    size="sm"
                    onClick={() => changePlaybackRate(rate)}
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </div>

            {/* 录音练习 */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">跟读练习</span>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {isRecording ? "停止录音" : "开始录音"}
                </Button>
              </div>
              {isRecording && (
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-sm">正在录音...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 文本内容 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              课文内容
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={showTranscript ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? "隐藏" : "显示"}文本
              </Button>
            </div>
          </CardHeader>
          {showTranscript && (
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {content.content[currentLanguage] || content.content["modern_chinese"]}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* 视频教学（如果有） */}
      {content.videoUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              视频教学
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={content.videoUrl}
                controls
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=400&width=600"
              >
                您的浏览器不支持视频播放。
              </video>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 文化背景 */}
      {content.culturalContext && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              文化背景与深度解析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="text-gray-700 leading-relaxed">{content.culturalContext}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学习进度 */}
      <Card>
        <CardHeader>
          <CardTitle>学习进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>当前课程进度</span>
                <span>{Math.round((currentTime / duration) * 100) || 0}%</span>
              </div>
              <Progress value={(currentTime / duration) * 100 || 0} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((currentTime / duration) * 100) || 0}%
                </div>
                <div className="text-sm text-gray-600">完成度</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(currentTime)}</div>
                <div className="text-sm text-gray-600">学习时长</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Object.keys(SUPPORTED_LANGUAGES).length}</div>
                <div className="text-sm text-gray-600">支持语言</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{content.difficulty}/10</div>
                <div className="text-sm text-gray-600">难度等级</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
