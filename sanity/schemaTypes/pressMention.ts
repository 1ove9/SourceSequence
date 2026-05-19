import {defineField, defineType} from "sanity"

/**
 * Press Mention schema — 媒体 / 学术圈引用 / 业界提及
 * Schema 已就位但首页 UI 暂未启用——等积累 ≥3 条后，加一个 "As featured in"
 * section 引用此 doctype。
 */
export const pressMention = defineType({
  name: "pressMention",
  title: "Press Mention / 媒体提及",
  type: "document",
  fields: [
    defineField({
      name: "mediaName",
      title: "Media Outlet Name",
      type: "string",
      description: '例如 "MIT Technology Review", "IEEE Spectrum", "雷锋网"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "mediaLogo",
      title: "Media Logo",
      type: "image",
      options: {hotspot: false},
      description: "媒体方真实 logo，不能 AI 生成（涉及商标）",
    }),
    defineField({
      name: "headlineEn",
      title: "Headline (EN)",
      type: "string",
    }),
    defineField({
      name: "headlineZh",
      title: "Headline (ZH) / 标题",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Article URL",
      type: "url",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      options: {dateFormat: "YYYY-MM-DD"},
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {title: "mediaName", subtitle: "headlineEn", media: "mediaLogo"},
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{field: "publishedAt", direction: "desc"}],
    },
    {
      title: "Display order",
      name: "orderAsc",
      by: [{field: "order", direction: "asc"}],
    },
  ],
})
