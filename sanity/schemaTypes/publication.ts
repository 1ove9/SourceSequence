import {defineField, defineType} from "sanity"

/**
 * Publication schema — 论文 / 白皮书
 * 用于 Publications section（含 Position Paper 大卡片 + 其他论文列表）
 */
export const publication = defineType({
  name: "publication",
  title: "Publication / 论文",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {source: "titleEn", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: "order", title: "Display Order / 显示顺序", type: "number"}),
    defineField({
      name: "date",
      title: "Date (YYYY.MM)",
      type: "string",
      description: '例如 "2026.03"',
    }),
    defineField({
      name: "titleEn",
      title: "Title (EN)",
      type: "string",
      description: "英文论文保留英文标题",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleZh",
      title: "Title (ZH) / 中文标题",
      type: "string",
      description: "可选，部分论文中文版本",
    }),
    defineField({
      name: "type",
      title: "Publication Type / 论文类型",
      type: "string",
      options: {
        list: [
          {title: "Whitepaper", value: "Whitepaper"},
          {title: "Preprint", value: "Preprint"},
          {title: "Working Paper", value: "Working Paper"},
          {title: "Technical Note", value: "Technical Note"},
          {title: "Essay", value: "Essay"},
          {title: "Position Paper", value: "Position Paper"},
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Position Paper? / 是否为重点 Position Paper",
      type: "boolean",
      description: "勾选后在 Publications section 顶部以大卡片展示",
      initialValue: false,
    }),
    defineField({
      name: "summaryEn",
      title: "Summary (EN, for featured papers)",
      type: "text",
      rows: 4,
    }),
    defineField({name: "summaryZh", title: "Summary (ZH) / 摘要", type: "text", rows: 4}),
    defineField({
      name: "externalUrl",
      title: "External URL (optional)",
      type: "url",
      description: "可选，外部论文链接 (arXiv / PDF)",
    }),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "date"},
  },
})
