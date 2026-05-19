import {defineField, defineType} from "sanity"

/**
 * Partner schema — 合作伙伴 / 客户 / 机构 logo
 * 用于首页 "Trusted by" section。需要真实 logo 文件，不能 AI 生成。
 */
export const partner = defineType({
  name: "partner",
  title: "Partner / 合作伙伴",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {hotspot: false},
      description: "SVG 或透明背景 PNG 最佳；浅色 / 白色版本最匹配深色背景",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "website",
      title: "Website (optional)",
      type: "url",
      description: "如果提供，logo 点击跳转到此",
    }),
    defineField({
      name: "category",
      title: "Category / 类别",
      type: "string",
      options: {
        list: [
          {title: "Customer / 客户", value: "customer"},
          {title: "Research Partner / 研究合作方", value: "research"},
          {title: "Industry Partner / 产业合作方", value: "industry"},
          {title: "Investor / 投资方", value: "investor"},
          {title: "Academic / 学术机构", value: "academic"},
        ],
      },
    }),
    defineField({
      name: "monochrome",
      title: "Display in monochrome? / 单色展示",
      type: "boolean",
      description: "勾选后 logo 灰度显示，hover 恢复彩色。多数 B2B 标杆站采用此风格",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {title: "name", subtitle: "category", media: "logo"},
  },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{field: "order", direction: "asc"}],
    },
  ],
})
