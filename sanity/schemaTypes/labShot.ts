import {defineField, defineType} from "sanity"

/**
 * Lab Shot schema — 实验室 / 设备 / 工作现场实景图
 * 用于首页 "Inside the Lab" gallery。提供"看见才相信"的证据层。
 */
export const labShot = defineType({
  name: "labShot",
  title: "Lab Shot / 实景图",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {hotspot: true},
      validation: (R) => R.required(),
    }),
    defineField({
      name: "subjectEn",
      title: "Subject (EN)",
      type: "string",
      description: '例如 "Anechoic Chamber" / "VNA Test Bench"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "subjectZh",
      title: "Subject (ZH) / 主题",
      type: "string",
      description: '例如 "微波暗室" / "VNA 测试台"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "captionEn",
      title: "Caption (EN)",
      type: "text",
      rows: 2,
      description: "可选，hover 时展示的一两句说明",
    }),
    defineField({
      name: "captionZh",
      title: "Caption (ZH) / 描述",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "数字越小越靠前",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured? / 重点展示",
      type: "boolean",
      description: "勾选后在 gallery 中以更大尺寸显示",
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: "subjectEn", subtitle: "subjectZh", media: "image"},
  },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{field: "order", direction: "asc"}],
    },
  ],
})
