-- 多语言内容表
CREATE TABLE IF NOT EXISTS multilingual_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL, -- 'lesson', 'exercise', 'cultural', 'literature'
    subject VARCHAR(50) NOT NULL,
    grade_level grade_level NOT NULL,
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    
    -- 多语言标题和内容
    title_zh_classical TEXT,    -- 古文标题
    title_zh_modern TEXT,       -- 现代中文标题
    title_en TEXT,              -- 英文标题
    title_ja TEXT,              -- 日文标题
    title_ko TEXT,              -- 韩文标题
    title_ru TEXT,              -- 俄文标题
    
    content_zh_classical TEXT,  -- 古文内容
    content_zh_modern TEXT,     -- 现代中文内容
    content_en TEXT,            -- 英文内容
    content_ja TEXT,            -- 日文内容
    content_ko TEXT,            -- 韩文内容
    content_ru TEXT,            -- 俄文内容
    
    -- 多媒体资源
    audio_zh_classical TEXT,    -- 古文朗读音频URL
    audio_zh_modern TEXT,       -- 现代中文音频URL
    audio_en TEXT,              -- 英文音频URL
    audio_ja TEXT,              -- 日文音频URL
    audio_ko TEXT,              -- 韩文音频URL
    audio_ru TEXT,              -- 俄文音频URL
    
    video_url TEXT,             -- 教学视频URL
    interactive_elements JSONB, -- 互动元素配置
    
    -- 文化和学术信息
    cultural_context TEXT,      -- 文化背景
    historical_period VARCHAR(100), -- 历史时期
    literary_genre VARCHAR(50), -- 文学体裁
    learning_objectives TEXT[], -- 学习目标
    key_concepts TEXT[],        -- 核心概念
    
    -- 奥数专用字段
    math_competition_level VARCHAR(50), -- 竞赛等级：省级、国家级、国际级
    problem_solving_methods TEXT[],     -- 解题方法
    mathematical_thinking TEXT,         -- 数学思维训练
    
    -- 文艺素养字段
    artistic_elements JSONB,    -- 艺术元素
    aesthetic_appreciation TEXT, -- 美学鉴赏
    creative_expression TEXT,   -- 创意表达
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES user_profiles(user_id)
);

-- 学习路径表
CREATE TABLE IF NOT EXISTS learning_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    path_name VARCHAR(100) NOT NULL,
    target_level VARCHAR(50) NOT NULL, -- 目标等级
    languages TEXT[] NOT NULL,         -- 学习语言
    subjects TEXT[] NOT NULL,          -- 学习学科
    
    -- AI个性化配置
    ai_personality VARCHAR(50) DEFAULT 'encouraging',
    teaching_style VARCHAR(50) DEFAULT 'modern',
    cultural_emphasis BOOLEAN DEFAULT true,
    
    -- 进度追踪
    total_lessons INTEGER DEFAULT 0,
    completed_lessons INTEGER DEFAULT 0,
    current_difficulty INTEGER DEFAULT 1,
    
    -- 目标设定
    target_university VARCHAR(100),
    target_score INTEGER,
    expected_completion_date DATE,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 学习记录表
CREATE TABLE IF NOT EXISTS learning_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    content_id UUID REFERENCES multilingual_contents(id) ON DELETE CASCADE,
    learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    
    -- 学习数据
    language_used VARCHAR(50) NOT NULL,
    time_spent INTEGER NOT NULL,       -- 学习时长（秒）
    completion_rate DECIMAL(5,2),      -- 完成率
    accuracy_rate DECIMAL(5,2),        -- 正确率
    
    -- 多维度评估
    comprehension_score INTEGER,       -- 理解能力评分
    expression_score INTEGER,          -- 表达能力评分
    cultural_awareness_score INTEGER,  -- 文化素养评分
    creativity_score INTEGER,          -- 创造力评分
    
    -- 学习反馈
    difficulty_feedback INTEGER,       -- 难度反馈 1-5
    interest_level INTEGER,            -- 兴趣程度 1-5
    learning_notes TEXT,               -- 学习笔记
    
    -- AI分析结果
    ai_analysis JSONB,                 -- AI学习分析
    recommended_next_content UUID[],    -- 推荐下一步内容
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文化知识图谱表
CREATE TABLE IF NOT EXISTS cultural_knowledge_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_name VARCHAR(100) NOT NULL,
    concept_type VARCHAR(50) NOT NULL, -- 'historical_figure', 'literary_work', 'cultural_tradition', 'philosophical_thought'
    
    -- 多语言描述
    description_zh_classical TEXT,
    description_zh_modern TEXT,
    description_en TEXT,
    description_ja TEXT,
    description_ko TEXT,
    description_ru TEXT,
    
    -- 关联信息
    time_period VARCHAR(100),
    geographical_origin VARCHAR(100),
    related_concepts UUID[],           -- 关联概念ID数组
    
    -- 多媒体资源
    image_urls TEXT[],
    audio_urls TEXT[],
    video_urls TEXT[],
    
    -- 教学应用
    applicable_grades grade_level[],
    learning_value INTEGER,            -- 学习价值评分
    cultural_significance INTEGER,     -- 文化意义评分
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 奥数竞赛题库表
CREATE TABLE IF NOT EXISTS math_competition_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_title VARCHAR(200) NOT NULL,
    problem_content TEXT NOT NULL,
    
    -- 竞赛信息
    competition_name VARCHAR(100),     -- 竞赛名称
    competition_year INTEGER,          -- 竞赛年份
    competition_level VARCHAR(50),     -- 竞赛级别
    problem_number VARCHAR(20),        -- 题目编号
    
    -- 难度和分类
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    math_topic VARCHAR(100),           -- 数学主题
    problem_type VARCHAR(50),          -- 题目类型
    
    -- 解答信息
    solution_steps TEXT[],             -- 解题步骤
    solution_methods TEXT[],           -- 解题方法
    key_insights TEXT[],               -- 关键洞察
    common_mistakes TEXT[],            -- 常见错误
    
    -- 多语言支持
    problem_content_en TEXT,
    solution_steps_en TEXT[],
    
    -- 教学价值
    mathematical_concepts TEXT[],      -- 涉及的数学概念
    thinking_skills TEXT[],           -- 培养的思维技能
    prerequisite_knowledge TEXT[],     -- 前置知识要求
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文艺素养评估表
CREATE TABLE IF NOT EXISTS artistic_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    
    -- 文艺领域
    literature_appreciation INTEGER,    -- 文学鉴赏能力
    poetry_creation INTEGER,           -- 诗词创作能力
    calligraphy_skill INTEGER,         -- 书法技能
    painting_ability INTEGER,          -- 绘画能力
    music_understanding INTEGER,       -- 音乐理解力
    cultural_knowledge INTEGER,        -- 文化知识储备
    
    -- 综合评估
    overall_artistic_score INTEGER,    -- 综合文艺素养评分
    creativity_index INTEGER,          -- 创造力指数
    cultural_identity_strength INTEGER, -- 文化认同强度
    
    -- 发展建议
    strength_areas TEXT[],             -- 优势领域
    improvement_areas TEXT[],          -- 待提升领域
    recommended_activities TEXT[],     -- 推荐活动
    
    assessment_date DATE DEFAULT CURRENT_DATE,
    assessor_id UUID REFERENCES user_profiles(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引优化查询性能
CREATE INDEX idx_multilingual_contents_subject_grade ON multilingual_contents(subject, grade_level);
CREATE INDEX idx_learning_records_student_date ON learning_records(student_user_id, created_at);
CREATE INDEX idx_cultural_knowledge_concept_type ON cultural_knowledge_graph(concept_type);
CREATE INDEX idx_math_problems_difficulty_topic ON math_competition_problems(difficulty_level, math_topic);
