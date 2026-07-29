# SourceSequence 设计交接清单

> 给 UI 设计师：站点现有的全部子页面、3D 内容与动画清单。
> 技术栈：Next.js (App Router) + Sanity CMS + Three.js / React-Three-Fiber + Framer Motion + GSAP + Lenis（平滑滚动）。
> 全站双语：英文 `/en/...` 与中文 `/zh/...`（路由前缀 `[locale]`）。

> **视觉皮肤更新（2026-06-17）** — 全站换肤为 Noomo 风格的**冷蓝灰雾面浅色**体系，以下旧描述中的「深空蓝暗底 / 电光蓝 #4d7cff / Aurora WebGL 极光背景 / Instrument Serif 衬线大标题」均已被取代：
> - **配色**：浅雾底 `--bg-base #ccd5e2` + 冷暖径向光晕（左上冷蓝紫 / 右中暖桃），强调以中性墨 `#15171c` 为主，唯一暖点缀为桃陶 `--accent #e0a89a`（极少量）。
> - **背景**：`AuroraBackground` 已从 OGL/WebGL 极光改为**纯 CSS 浅雾光晕**（零依赖，OGL 已卸载）。
> - **招牌可视化**：`WavefieldCanvas`（纯 Canvas 缓慢干涉波场/等高线）放首页 hero，体现「物理场」。
> - **字体**：大标题改用几何无衬线 **Geist**（CJK 回退思源黑体）；衬线 display 已移除。
> - **按钮**：深色墨胶囊（`.btn-electric`，`border-radius:980px`）。
> - **滚动**：Lenis 平滑滚动 + 揭示曲线统一 `cubic-bezier(.2,.8,.2,1)`，均尊重 `prefers-reduced-motion`。
> - **深色节奏点**：首页 CaseStudies 整段（`.section-dark`）与全站 3D 展示「暗箱」（`.showcase-inner`）保持深色，3D 场景内电光蓝材质保留不动；浅雾为主、深色穿插，形成明暗呼吸。
> - **玻璃**：`.glass*` 改为 token 驱动浅色玻璃，`.section-dark` 子树内自动反转回白叠暗。

---

## 一、子页面（Pages / Routes）

| # | 路由 | 名称 | 内容来源 | 区块构成 |
|---|------|------|----------|----------|
| 1 | `/` | **首页 / Manifesto** | 静态 + Sanity | HomeHero → Marquee 跑马灯 → Capabilities 核心能力 → Solutions(teaser) → CaseStudies 案例 → Vision 愿景 → TrustedBy 合作伙伴 → About → Careers → Contact → Footer |
| 2 | `/antenna` | **YAF — AI 原生天线设计**（开源旗舰页）| 静态 + Sanity | AntennaIntro → Hero(含 3D) → Marquee → Vision → Research → Lab → InsideTheLab → Applications → Publications → Footer |
| 3 | `/solutions` | **行业解决方案** | Sanity | 页头 manifesto → Solutions(full 完整列表) → Contact → Footer |
| 4 | `/models` | **3D 模型展示库** | Sanity | ModelsView 卡片网格，每张卡片进入一个 3D 场景 |
| 5 | `/models/[slug]` | **模型详情页** | Sanity | ModelDetailView：全屏可交互 3D 场景 + 参数说明 |
| 6 | `/research/[slug]` | **研究文章详情** | Sanity | 富文本正文 + **GenerativeRF 3D 模型**（AI 进化天线）|
| 7 | `/lab/[slug]` | **实验室详情** | Sanity | DetailPageLayout 富文本详情 |
| 8 | `/applications/[slug]` | **应用案例详情** | Sanity | DetailPageLayout 富文本详情 |
| 9 | `/studio` | **Sanity CMS 后台** | — | 内容管理后台（非前台页面，可不设计）|

> 说明：`teaser` / `full` 是同一组件的两种展示模式（首页用精简版，独立页用完整版）。

---

## 二、3D 内容（全部为程序化实时生成，**无外部模型文件**）

所有 3D 都用代码实时构建几何体并渲染，没有 `.glb / .gltf / .obj` 资源文件，颜色/形状/动效均可由代码任意调整。
统一渲染增强：**Bloom 辉光 + SMAA 抗锯齿**后处理，性能优化（离屏 / 切后台 / 用户开启「减少动态」时自动暂停）。

| 3D 场景 | 出现位置 | 内容描述 | 组成零件 |
|---------|----------|----------|----------|
| **Pinching Antenna 捏合天线** | `/antenna` Hero、`/models` 展示 | 一根介质波导，上面 3 个可滑动的「捏合点」，向外辐射电磁波纹 | Waveguide 波导 + PinchElement×3 + Rail 导轨 + Connector 接头 + RadiationRipples 辐射波纹 |
| **Beamforming Array 波束成形阵列** | `/models` 展示 | 8×8 相控阵列单元 + 一个可视化的波束锥（±14°）| 64 个阵列单元 + 波束锥 + 接触阴影 |
| **Generative RF 生成式天线** | `/research/[slug]` | AI 在「设计空间」里进化出的天线：候选天线漂浮 + 中心进化天线 + 评估环 | EvolvedAntenna 进化天线 + CandidateAntennas 候选体(多面体/环面) + DesignSpaceGrid 设计空间网格 + EvaluationRing 评估环(8 标记点) |

**主色调**：电光蓝 `#4d7cff`（accent）、紫 `#a78bfa`（violet）、金属灰 `#d8dce5`。交互：桌面端可拖拽旋转 / 缩放，移动端锁定缩放。

---

## 三、动画清单（Animations）

| 动画 | 技术 | 出现位置 | 描述 |
|------|------|----------|------|
| **Aurora 极光背景** | WebGL / OGL shader | **全站所有页面**（AuroraBackground）| 全屏流动的极光渐变着色器背景 |
| **Hero 入场揭示** | CSS `hero-reveal` | 首页 / antenna 标题 | 服务端渲染文本，首屏使用轻量渐入并尊重 reduced motion |
| **TextPressure** | 自定义 | 全局 layout、FooterSignature | 鼠标位置驱动字重/字宽变化的可变字体文字 |
| **ShinyText** | Framer Motion | FooterSignature | 文字高光扫光效果 |
| **Marquee 跑马灯** | CSS/组件 | 首页、antenna | 横向无限滚动的术语条 |
| **SignalFlux 信号条** | React 定时器 | antenna Hero | 模拟实时信号强度跳动的小信号条 |
| **RevealOnScroll 滚动揭示** | Framer Motion | 多个区块 | 滚动进入视口时的淡入/上移 |
| **逐区块入场动画** | Framer Motion | About / Vision / Contact / Nav / Publications / TrustedBy / InsideTheLab 等 | 各区块独立的进场过渡 |
| **3D 模型加载态** | 自定义 | 3D 画布 | "Initializing antenna system…" 加载提示 |
| **移动端导航抽屉** | Framer Motion | Nav | 全屏汉堡菜单抽屉 |

> 全站尊重系统「减少动态效果（prefers-reduced-motion）」设置，开启时 3D 与动画自动降级/暂停。

---

## 四、给设计师的重点提示

- **3D 是核心差异点**：3 个程序化 3D 场景（捏合天线 / 波束阵列 / 生成式天线）是品牌视觉支柱，希望围绕它们做版式与配色。
- **可调性强**：3D 无固定贴图，形态/颜色/光效都能按设计稿调整，可大胆给方向。
- **背景统一**：所有页面底层都是 Aurora WebGL 背景 + 颗粒质感（`bg-grain`），前景内容需保证在动态背景上的可读性。
- **双语**：所有文案需中英双版，注意中英文排版差异（行高、字重）。
- **现有视觉语言**：玻璃拟态药丸（glass-pill）、电光蓝按钮、等宽字体小标签（uppercase + letter-spacing）。
