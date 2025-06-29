-- 创建用户角色枚举类型
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'parent', 'admin');

-- 创建用户状态枚举类型  
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending');

-- 创建年级枚举类型
CREATE TYPE grade_level AS ENUM ('grade_7', 'grade_8', 'grade_9', 'grade_10', 'grade_11', 'grade_12');

-- 扩展用户表
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    status user_status DEFAULT 'pending',
    real_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 学生详细信息表
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    student_id VARCHAR(20) UNIQUE NOT NULL, -- 学号
    grade grade_level NOT NULL,
    class_name VARCHAR(20),
    school_name VARCHAR(100),
    enrollment_date DATE,
    learning_style VARCHAR(20) DEFAULT 'balanced', -- 学习风格：visual, auditory, kinesthetic, balanced
    target_university VARCHAR(100), -- 目标大学
    strengths TEXT[], -- 优势学科
    weaknesses TEXT[], -- 薄弱学科
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 教师详细信息表
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    teacher_id VARCHAR(20) UNIQUE NOT NULL, -- 教师编号
    subjects TEXT[] NOT NULL, -- 任教学科
    grades grade_level[] NOT NULL, -- 任教年级
    school_name VARCHAR(100),
    title VARCHAR(50), -- 职称
    experience_years INTEGER DEFAULT 0,
    specialties TEXT[], -- 专业特长
    certification_level VARCHAR(20), -- 认证等级
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 家长详细信息表
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    occupation VARCHAR(100),
    education_level VARCHAR(50),
    relationship_to_student VARCHAR(20), -- 与学生关系：father, mother, guardian
    emergency_contact BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 学生-家长关系表
CREATE TABLE IF NOT EXISTS student_parent_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    parent_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    relationship_type VARCHAR(20) NOT NULL, -- father, mother, guardian
    is_primary BOOLEAN DEFAULT false, -- 是否为主要监护人
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_user_id, parent_user_id)
);

-- 学生-教师关系表
CREATE TABLE IF NOT EXISTS student_teacher_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    teacher_user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    subject VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    assigned_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_user_id, teacher_user_id, subject)
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为所有表添加更新时间触发器
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON parents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
