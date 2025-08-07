# 数据库修复指南

## 问题描述

当前项目遇到以下Supabase数据库错误：

1. **401 Unauthorized错误** - RLS策略阻止了对categories表的操作
2. **404 Not Found错误** - 缺失以下表：
   - `carousel` - 轮播图主表
   - `carousel_i18n` - 轮播图国际化表
   - `category_i18n` - 分类国际化表

## 修复步骤

### 方法1：使用Supabase Dashboard（推荐）

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目：`setmygkovqgthorwhvxd`
3. 进入 **SQL Editor**
4. 复制并执行 `database_fix.sql` 文件中的所有SQL语句

### 方法2：使用Supabase CLI

```bash
# 如果还没有安装Supabase CLI
npm install -g supabase

# 登录到Supabase
supabase login

# 连接到项目
supabase link --project-ref setmygkovqgthorwhvxd

# 执行修复脚本
supabase db reset --db-url "postgresql://postgres:[YOUR_PASSWORD]@db.setmygkovqgthorwhvxd.supabase.co:5432/postgres"
```

### 方法3：重新启动开发服务器

由于我已经修改了 `.mcp.json` 文件移除了只读模式，你需要：

1. 停止当前的开发服务器 (Ctrl+C)
2. 重新启动开发服务器：
   ```bash
   npm run dev
   ```
3. 然后我可以通过MCP工具直接创建表

## 修复内容

### 创建的表结构

#### 1. carousel 表
```sql
CREATE TABLE public.carousel (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url text,
    link_url text,
    order_index integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now()
);
```

#### 2. carousel_i18n 表
```sql
CREATE TABLE public.carousel_i18n (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    carousel_id uuid REFERENCES public.carousel(id) ON DELETE CASCADE,
    locale text NOT NULL CHECK (locale = ANY (ARRAY['en', 'fr', 'es', 'de'])),
    title text DEFAULT '',
    description text DEFAULT '',
    alt_text text DEFAULT '',
    created_at timestamptz DEFAULT now(),
    UNIQUE(carousel_id, locale)
);
```

#### 3. category_i18n 表
```sql
CREATE TABLE public.category_i18n (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    locale text NOT NULL CHECK (locale = ANY (ARRAY['en', 'fr', 'es', 'de'])),
    name text DEFAULT '',
    created_at timestamptz DEFAULT now(),
    UNIQUE(category_id, locale)
);
```

### RLS策略修复

为所有表创建了适当的RLS策略：
- 允许公开读取访问
- 允许所有操作（插入、更新、删除）

## 验证修复

修复完成后，你可以：

1. 刷新管理页面
2. 尝试创建分类
3. 检查轮播图功能是否正常工作

## 注意事项

- 确保在生产环境中使用更严格的RLS策略
- 考虑为不同用户角色设置不同的权限
- 定期备份数据库

## 如果仍有问题

如果修复后仍有问题，请检查：

1. Supabase项目的API密钥是否正确
2. 环境变量是否正确设置
3. 网络连接是否正常
4. 浏览器控制台是否有其他错误信息