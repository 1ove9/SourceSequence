import {defineField, defineType} from "sanity"

/**
 * Research Topic schema — 研究方向
 * 用于 Research section 卡片 + /research/[slug] 详情页
 */
export const researchTopic = defineType({
  name: "researchTopic",
  title: "Research Topic / 研究方向",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "URL 路径，例如 pinching-antenna-systems",
      options: {source: "titleEn", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order / 显示顺序",
      type: "number",
      description: "数字越小越靠前",
    }),
    defineField({
      name: "code",
      title: "Code Label / 代号标签",
      type: "string",
      description: '例如 "01 / Research Project · Flagship"',
    }),
    defineField({
      name: "isLongHorizon",
      title: "Long-Horizon Research? / 长程研究",
      type: "boolean",
      description: "勾选后在 Research section 卡片显示长程研究标记",
      initialValue: false,
    }),
    defineField({
      name: "isService",
      title: "Available as Service? / 可作为商业化设计服务",
      type: "boolean",
      description: '勾选后在 Research section 卡片右上角显示"可作为服务"徽章',
      initialValue: false,
    }),
    defineField({
      name: "titleEn",
      title: "Title (EN)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleZh",
      title: "Title (ZH) / 标题",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitleEn",
      title: "Subtitle (EN)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "subtitleZh",
      title: "Subtitle (ZH) / 副标题",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image / 详情页头图",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({
      name: "cardDescriptionEn",
      title: "Card Description (EN, for Research section)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cardDescriptionZh",
      title: "Card Description (ZH) / 卡片描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cardIcon",
      title: "Card Icon Name (lucide-react)",
      type: "string",
      description: '可选，lucide-react 图标名称，例如 "Radio", "Layers"',
    }),
    defineField({
      name: "abstractEn",
      title: "Abstract (EN)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "abstractZh",
      title: "Abstract (ZH) / 摘要",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "sections",
      title: "Body Sections / 正文段落",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {name: "titleEn", title: "Section Title (EN)", type: "string"},
            {name: "titleZh", title: "Section Title (ZH) / 章节标题", type: "string"},
            {name: "contentEn", title: "Content (EN)", type: "text", rows: 8},
            {name: "contentZh", title: "Content (ZH) / 内容", type: "text", rows: 8},
          ],
          preview: {select: {title: "titleEn", subtitle: "titleZh"}},
        },
      ],
    }),
    defineField({
      name: "keyConcepts",
      title: "Key Concepts / 关键概念",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {name: "termEn", title: "Term (EN)", type: "string"},
            {name: "termZh", title: "Term (ZH) / 术语", type: "string"},
            {name: "definitionEn", title: "Definition (EN)", type: "text", rows: 3},
            {name: "definitionZh", title: "Definition (ZH) / 释义", type: "text", rows: 3},
          ],
          preview: {select: {title: "termEn", subtitle: "termZh"}},
        },
      ],
    }),
    defineField({
      name: "references",
      title: "References / 参考文献",
      type: "array",
      of: [{type: "text", rows: 3}],
    }),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "code", media: "heroImage"},
  },
})
