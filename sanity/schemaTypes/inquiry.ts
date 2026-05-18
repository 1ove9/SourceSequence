import {defineField, defineType} from "sanity"

/**
 * Inquiry schema — 询价 / 联系表单提交记录
 * 由前端 /contact server action 写入。不在主站公开渲染（隐私）。
 * 仅供 Studio 后台 sales / ops 查看与跟进。
 */
export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry / 询价记录",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required().min(1).max(120),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (R) =>
        R.required()
          .email()
          .max(254),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (R) => R.max(200),
    }),
    defineField({
      name: "service",
      title: "Service of Interest",
      type: "string",
      options: {
        list: [
          {title: "Generative RF Design", value: "generative-rf"},
          {title: "Research Collaboration", value: "research"},
          {title: "Press / Media", value: "press"},
          {title: "Careers", value: "careers"},
          {title: "General Inquiry", value: "general"},
        ],
      },
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 6,
      validation: (R) => R.required().min(10).max(4000),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Referring page / locale / UTM",
      readOnly: true,
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          {title: "New", value: "new"},
          {title: "Contacted", value: "contacted"},
          {title: "Qualified", value: "qualified"},
          {title: "Won", value: "won"},
          {title: "Lost / Closed", value: "lost"},
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: {
      title: "name",
      company: "company",
      service: "service",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare({title, company, service, submittedAt, status}) {
      const date = submittedAt
        ? new Date(submittedAt).toISOString().slice(0, 10)
        : "—"
      const parts = [
        title,
        company ? `· ${company}` : null,
        service ? `· ${service}` : null,
      ].filter(Boolean)
      return {
        title: parts.join(" "),
        subtitle: `${date} · ${status ?? "new"}`,
      }
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{field: "submittedAt", direction: "desc"}],
    },
  ],
})
