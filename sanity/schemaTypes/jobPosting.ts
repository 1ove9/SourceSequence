import {defineField, defineType} from "sanity"

/**
 * Job Posting schema — 招聘岗位
 * 用于 Careers section
 */
export const jobPosting = defineType({
  name: "jobPosting",
  title: "Job Posting / 招聘岗位",
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
      name: "isOpen",
      title: "Currently Open? / 是否开放招聘",
      type: "boolean",
      description: "取消勾选后该岗位将从前端隐藏",
      initialValue: true,
    }),
    defineField({name: "titleEn", title: "Position Title (EN)", type: "string", validation: (R) => R.required()}),
    defineField({name: "titleZh", title: "Position Title (ZH) / 岗位名称", type: "string", validation: (R) => R.required()}),
    defineField({
      name: "locationEn",
      title: "Location (EN)",
      type: "string",
      description: '例如 "Hangzhou · Full-time"',
    }),
    defineField({name: "locationZh", title: "Location (ZH) / 工作地点", type: "string"}),
    defineField({name: "descriptionEn", title: "Description (EN)", type: "text", rows: 4}),
    defineField({name: "descriptionZh", title: "Description (ZH) / 岗位描述", type: "text", rows: 4}),
    defineField({
      name: "applyEmail",
      title: "Apply Email",
      type: "string",
      initialValue: "careers@yuanxu.tech",
    }),
  ],
  preview: {
    select: {title: "titleEn", subtitle: "locationEn"},
  },
})
