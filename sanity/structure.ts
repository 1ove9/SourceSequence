import type {StructureBuilder} from "sanity/structure"

/**
 * Custom Studio sidebar layout — 后台导航分组
 * 顺序：Research → Lab → Applications → Publications → Careers
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content / 内容")
    .items([
      S.listItem()
        .title("Research Topics / 研究方向")
        .child(S.documentTypeList("researchTopic").title("Research Topics")),
      S.listItem()
        .title("Lab Capabilities / 实验室能力")
        .child(S.documentTypeList("labCapability").title("Lab Capabilities")),
      S.listItem()
        .title("Applications / 应用场景")
        .child(S.documentTypeList("application").title("Applications")),
      S.divider(),
      S.listItem()
        .title("Publications / 论文")
        .child(S.documentTypeList("publication").title("Publications")),
      S.listItem()
        .title("Job Postings / 招聘岗位")
        .child(S.documentTypeList("jobPosting").title("Job Postings")),
    ])
