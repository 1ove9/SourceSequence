import {defineField, defineType} from "sanity"

/**
 * Core Capability schema — 核心能力（首页三大能力）
 * 复用首页卡片样式，无详情页。
 */
export const capability = defineType({
  name: "capability",
  title: "Core Capability / 核心能力",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Key / 稳定键",
      type: "slug",
      description: "用作 React key / 锚点，例如 physics-informed-modeling",
      options: {source: "tagline", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: "order", title: "Display Order / 显示顺序", type: "number"}),
    defineField({
      name: "tagline",
      title: "English Tagline / 英文标签",
      type: "string",
      description: '卡片上的英文小标签，例如 "Physics-Informed Modeling"',
    }),
    defineField({name: "titleEn", title: "Title (EN)", type: "string", validation: (R) => R.required()}),
    defineField({name: "titleZh", title: "Title (ZH) / 标题", type: "string", validation: (R) => R.required()}),
    defineField({name: "descriptionEn", title: "Description (EN)", type: "text", rows: 3}),
    defineField({name: "descriptionZh", title: "Description (ZH) / 描述", type: "text", rows: 3}),
    defineField({name: "cardIcon", title: "Card Icon Name (lucide-react)", type: "string"}),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "tagline"},
  },
})
