import {defineField, defineType} from "sanity"

/**
 * Model Showcase schema — 3D 模型展示
 * 用于 /models 列表 + /models/[slug] 详情页。
 *
 * `sceneKey` 与 components/showcase/scenes/ 下注册的 React 组件 ID 对应。
 * 加新模型的流程：
 *   1. 写一个 R3F 场景组件放到 components/showcase/scenes/
 *   2. 在 components/showcase/registry.ts 里注册一个 key
 *   3. Studio 后台建一个 modelShowcase doc，sceneKey 填那个 key
 */
export const modelShowcase = defineType({
  name: "modelShowcase",
  title: "Model Showcase / 3D 模型展示",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "URL 路径，例如 pinching-antenna",
      options: {source: "titleEn", maxLength: 96},
      validation: (R) => R.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order / 显示顺序",
      type: "number",
    }),
    defineField({
      name: "code",
      title: "Code Label / 代号标签",
      type: "string",
      description: '例如 "01 / Model"',
    }),
    defineField({
      name: "sceneKey",
      title: "Scene Key / 场景代号",
      type: "string",
      description:
        "对应 components/showcase/registry.ts 中注册的组件 key（如 pinching-antenna、beamforming-array）。未知 key 会渲染占位。",
      validation: (R) => R.required(),
    }),
    defineField({name: "titleEn", title: "Title (EN)", type: "string", validation: (R) => R.required()}),
    defineField({name: "titleZh", title: "Title (ZH) / 标题", type: "string", validation: (R) => R.required()}),
    defineField({name: "subtitleEn", title: "Subtitle (EN)", type: "text", rows: 2}),
    defineField({name: "subtitleZh", title: "Subtitle (ZH) / 副标题", type: "text", rows: 2}),
    defineField({
      name: "cardDescriptionEn",
      title: "Card Description (EN)",
      type: "text",
      rows: 3,
      description: "Gallery 卡片上的短描述",
    }),
    defineField({
      name: "cardDescriptionZh",
      title: "Card Description (ZH) / 卡片描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionEn",
      title: "Detail Description (EN)",
      type: "text",
      rows: 8,
      description: "详情页正文",
    }),
    defineField({
      name: "descriptionZh",
      title: "Detail Description (ZH) / 详情说明",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "tagsEn",
      title: "Tags (EN)",
      type: "array",
      of: [{type: "string"}],
      options: {layout: "tags"},
      description: '示例: ["Wireless", "PASS", "6G"]',
    }),
    defineField({
      name: "tagsZh",
      title: "Tags (ZH) / 标签",
      type: "array",
      of: [{type: "string"}],
      options: {layout: "tags"},
    }),
    defineField({
      name: "isFeatured",
      title: "Featured? / 是否精选",
      type: "boolean",
      description: "可作为首页 hero 的备选",
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "sceneKey"},
  },
})
