import {defineField, defineType} from "sanity"

/**
 * Case Study schema — 实证案例（首页第 4 层）
 * 旗舰开源案例 YAF + 能力层抽象的工业案例。复用卡片样式。
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study / 实证案例",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Key / 稳定键",
      type: "slug",
      options: {source: "titleEn", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: "order", title: "Display Order / 显示顺序", type: "number"}),
    defineField({name: "tagEn", title: "Tag (EN) / 标签", type: "string"}),
    defineField({name: "tagZh", title: "Tag (ZH) / 标签", type: "string"}),
    defineField({name: "titleEn", title: "Title (EN)", type: "string", validation: (R) => R.required()}),
    defineField({name: "titleZh", title: "Title (ZH) / 标题", type: "string", validation: (R) => R.required()}),
    defineField({name: "descriptionEn", title: "Description (EN)", type: "text", rows: 3}),
    defineField({name: "descriptionZh", title: "Description (ZH) / 一句话介绍", type: "text", rows: 3}),
    defineField({name: "cardIcon", title: "Card Icon Name (lucide-react)", type: "string"}),
    defineField({
      name: "href",
      title: "Internal Link / 站内链接",
      type: "string",
      description: '站内路由，例如 /antenna；留空则卡片不可点击',
    }),
    defineField({
      name: "externalUrl",
      title: "External URL / 外部链接",
      type: "url",
      description: "GitHub 或线上平台地址（可选）",
    }),
    defineField({
      name: "isFlagship",
      title: "Flagship / 旗舰案例",
      type: "boolean",
      description: "旗舰案例（YAF）以更大篇幅展示",
    }),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "tagEn"},
  },
})
