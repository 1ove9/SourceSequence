import {defineField, defineType} from "sanity"

/**
 * Industry Solution schema — 行业解决方案方向
 * 八个工业方向，归入三大主题组（见 solutionGroup）。
 * 复用卡片样式，无详情页。
 */
export const solution = defineType({
  name: "solution",
  title: "Industry Solution / 行业解决方案",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Key / 稳定键",
      type: "slug",
      description: "用作 React key，例如 rotating-equipment-phm",
      options: {source: "tagline", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: "order", title: "Display Order / 显示顺序", type: "number"}),
    defineField({
      name: "group",
      title: "Theme Group / 所属主题组",
      type: "string",
      options: {
        list: [
          {title: "Equipment Reliability / 设备可靠性", value: "reliability"},
          {title: "Assets & Efficiency / 资产与能效", value: "efficiency"},
          {title: "Process & Quality / 工艺与质量", value: "process"},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "English Tagline / 英文短名",
      type: "string",
      description: '例如 "Rotating Equipment PHM"',
    }),
    defineField({name: "titleEn", title: "Title (EN)", type: "string", validation: (R) => R.required()}),
    defineField({name: "titleZh", title: "Title (ZH) / 标题", type: "string", validation: (R) => R.required()}),
    defineField({name: "descriptionEn", title: "Description (EN)", type: "text", rows: 2}),
    defineField({name: "descriptionZh", title: "Description (ZH) / 一句话能力", type: "text", rows: 2}),
    defineField({name: "highlightEn", title: "Highlight (EN) / 价值亮点", type: "text", rows: 2}),
    defineField({name: "highlightZh", title: "Highlight (ZH) / 价值亮点", type: "text", rows: 2}),
    defineField({name: "cardIcon", title: "Card Icon Name (lucide-react)", type: "string"}),
    defineField({
      name: "isFeatured",
      title: "Featured on Homepage / 首页精选",
      type: "boolean",
      description: "勾选后出现在首页「行业解决方案」精选入口区块",
    }),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "group"},
  },
})
