# 实现记录 · 2026-10-19

## 设计与实现

依据 `cloverta-blog_project_structure.md` 和用户提供的七张设计图实现。在 1366px 桌面宽度下，统一外框 992px，正文 682px，左侧导航 110px；所有页面复用同一页眉、页脚和导航。手机端改为顶部头像与横向导航，避免缩小桌面内容。

使用 Astro 静态页面、Content Collections 和 Tailwind CSS 4。按用户最新指定，页眉站点标题使用本地思源宋体超粗体（Adobe Source Han Serif CN Heavy，900，保留斜体），正文使用思源宋体细体（Adobe Source Han Serif CN Light，300），两处背景装饰字使用 ZCOOL QingKe HuangYou（站酷庆科黄油体，400）；移除了旧字体及模拟字形的压缩变换。HP BEN-TO 背景字上移，保留与下方矩形条的间距。RSS、月亮、评论、GitHub、邮箱图标沿用用户提供的资源。浅色/深色配色、蓝红蓝装饰、背景大字、导航悬浮动画、友链浮起阴影已实现。

页面切换采用 Astro `ClientRouter`，正文以 240ms 淡入淡出切换，页眉、导航与背景装饰保持稳定。博文列表、归档与阅读页的标题/图片共享过渡；栏目入口与栏目详情标题/图片共享过渡。遵循系统减少动态效果设置，RSS 链接继续完整加载。主题按钮、评论计数、最近评论、阅读进度、代码复制按 `astro:page-load` 重新初始化，离页时清理请求、监听器和评论观察器。

本次验证：类型检查与构建通过；浏览器连续完成 9 次站内动画导航（包含博文、栏目、语言切换和历史返回），共享标题/图片过渡正常，无脚本错误。切页后的主题、最近评论展开、评论计数、代码复制、阅读进度均正常。另行验证了系统减少动态效果、无原生 View Transitions 时的回退导航，以及原站真实评论框跨文章切换、换主题后仍可加载。浏览器确认页眉实际使用 Source Han Serif CN Heavy，320–1366px 宽度无横向溢出。

已完成：双语首页、关于、栏目列表及栏目详情、普通博文与栏目阅读页、按年份归档、标签及标签文章列表、友链、404、站点地图、双语博文 RSS、双语栏目 RSS。`/` 跳转 `/zh/`，原 `/rss.xml` 和 `/{lang}/timeline/` 保留兼容入口。

## 内容编辑

所有创作内容统一存放在 `src/content/`。中文和英文使用相同相对文件名，可以在阅读页切换对应语言；若另一语言不存在，会返回另一语言的归档或栏目列表。

```text
src/content/
  zh/                         # en/ 与此结构相同
    pages/
      home.md                 # 首页介绍
      about.md                # 关于页完整内容
      columns.md              # 栏目页介绍
      archive.md              # 归档页介绍
      tags.md                 # 标签页介绍
      friends.md              # 友链介绍、交换格式
    posts/*.md                # 普通博文，保留来源项目原有文件名
    friends/*.md              # 每位朋友一个文件
    columns/
      bento/
        index.ts              # 栏目标识、标题、说明、图片
        post-1.md             # 每条短帖单独保存
        post-2.md
```

非创作界面文案存放于 `src/i18n/zh.ts` 和 `en.ts`。普通博文已从来源项目迁移，中英文关于页保留来源文字并改为 Markdown。便当栏目包含两条标注 `sample: true` 的示例和一张便当示意图，便于替换为实际内容。设计稿中的其他占位栏目和空友链框不作为真实内容写入。

博文/栏目贴文 frontmatter：

```yaml
title: 文章标题
pubDate: 2026-09-18
description: 文章摘要
author: 三叶
tags: [学习笔记, 数据结构]
image:                        # 可选
  url: /images/example.jpg
  alt: 图片描述
draft: false                  # true 时不生成页面、不进入列表或 RSS
sample: false                 # true 显示示例标记
```

新增栏目时，在两种语言对应的 `columns/<id>/index.ts` 中导出 `id`、`title`、`description`、`image`，同目录放入 Markdown 贴文。页面和路由自动生成；归档和标签仅收录普通博文；栏目 RSS 与博文 RSS 完全分开。

## 评论兼容

沿用 `PUBLIC_REMARK42_HOST`、`PUBLIC_REMARK42_SITE_ID` 两个公开配置变量，见 `.env.example`。本地已复用原站公开配置到被 Git 忽略的 `.env`，没有修改原站服务。部署时需设置同样的变量。

- 普通博文保留原来的 `/posts/<slug>/` 讨论标识，中英文共享讨论。
- 栏目使用独立的 `/columns/<column>/<slug>/` 标识，避免与博文冲突。
- 最近评论初始显示 3 条，每次“展开更多”增加 4 条；支持空状态、加载失败及重试。
- 原站评论对应的博文若不在当前源码中，其链接指向正式站，避免在本地模板打开不存在的文章。
- 主题切换同步更新评论框，计数通过 API 获取，不覆盖评论框配置。

## 运行与验证

```sh
npm run check
npm run build
npm run dev -- --background --host 127.0.0.1
```

本机当前 Astro CLI 的帮助未提供原生 `--background` / `dev status` / `dev stop` / `dev logs` 管理功能。本次按仓库约定传入 `--background`，并由执行环境保持后台会话；停止该会话使用 Ctrl+C。没有修改 `AGENTS.md` 或 `README.md`。

检查结果：类型检查零错误、零警告、零提示，39 页静态构建成功。浏览器验证了 20 个页面路由及 320、390、700、768、1024、1366px 六种宽度，没有横向溢出或页面脚本错误。评论按 3 → 7 → 11 条展开，主题在刷新和语言切换后保留；博文与栏目 RSS 内容范围检查通过。评论交互验证使用拦截的测试响应，另行确认原站真实最近评论及评论框成功加载。799 个本地链接和资源路径检查无缺失。截图保存在被 Git 忽略的 `.qa/` 目录。字体授权文本随站点保存在 `public/licenses/`。
