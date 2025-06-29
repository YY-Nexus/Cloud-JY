-- 启用行级安全策略
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_parent_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_teacher_relations ENABLE ROW LEVEL SECURITY;

-- 用户档案策略：用户只能查看和修改自己的档案
CREATE POLICY "用户可以查看自己的档案" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "用户可以更新自己的档案" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "用户可以插入自己的档案" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 学生信息策略
CREATE POLICY "学生可以查看自己的信息" ON students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "学生可以更新自己的信息" ON students FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "学生可以插入自己的信息" ON students FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 教师信息策略
CREATE POLICY "教师可以查看自己的信息" ON teachers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "教师可以更新自己的信息" ON teachers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "教师可以插入自己的信息" ON teachers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 家长信息策略
CREATE POLICY "家长可以查看自己的信息" ON parents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "家长可以更新自己的信息" ON parents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "家长可以插入自己的信息" ON parents FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 学生-家长关系策略
CREATE POLICY "查看学生家长关系" ON student_parent_relations FOR SELECT USING (
    auth.uid() = student_user_id OR auth.uid() = parent_user_id
);

-- 学生-教师关系策略
CREATE POLICY "查看学生教师关系" ON student_teacher_relations FOR SELECT USING (
    auth.uid() = student_user_id OR auth.uid() = teacher_user_id
);
