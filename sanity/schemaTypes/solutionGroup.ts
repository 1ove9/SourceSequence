import {defineField, defineType} from "sanity"

/**
 * Solution Theme Group schema — 解决方案主题组
 * 八个工业方向归入三大主题组（设备可靠性 / 资产与能效 / 工艺与质量）。
 */
export const solutionGroup = defineType({
  name: "solutionGroup",
  title: "Solution Group / 解决方案主题组",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Group Key / 组键",
      type: "string",
      description: "与 solution.group 对应",
      options: {
        list: [
          {title: "Equipment Reliability / 设备可靠性", value: "reliability"},
          {title: "Assets & Efficiency / 资产与能效", value: "efficiency"},
          {title: "Process & Quality / 工艺与质量", value: "process"},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: "order", title: "Display Order / 显示顺序", type: "number"}),
    defineField({name: "tagline", title: "English Tagline / 英文标签", type: "string"}),
    defineField({name: "titleEn", title: "Title (EN)", type: "string", validation: (R) => R.required()}),
    defineField({name: "titleZh", title: "Title (ZH) / 标题", type: "string", validation: (R) => R.required()}),
    defineField({name: "introEn", title: "Intro (EN) / 组导语", type: "text", rows: 2}),
    defineField({name: "introZh", title: "Intro (ZH) / 组导语", type: "text", rows: 2}),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "key"},
  },
})
