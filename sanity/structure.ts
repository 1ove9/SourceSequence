import type {StructureBuilder} from "sanity/structure"

/**
 * Custom Studio sidebar layout — 后台导航分组
 *
 * Grouped semantically:
 *   Content        — public marketing content
 *   3D Showcase    — interactive R3F scenes
 *   Evidence       — visual proof: lab photos, partners, press
 *   Inbound        — form submissions, internal-only
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content / 内容")
    .items([
      // ---- Physics-Grounded AI (homepage + solutions) ----
      S.listItem()
        .title("Core Capabilities / 核心能力")
        .child(S.documentTypeList("capability").title("Core Capabilities")),
      S.listItem()
        .title("Solution Groups / 解决方案主题组")
        .child(S.documentTypeList("solutionGroup").title("Solution Groups")),
      S.listItem()
        .title("Industry Solutions / 行业解决方案")
        .child(S.documentTypeList("solution").title("Industry Solutions")),
      S.listItem()
        .title("Case Studies / 实证案例")
        .child(S.documentTypeList("caseStudy").title("Case Studies")),
      S.divider(),

      // ---- Antenna / YAF research content ----
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

      // ---- Publications & jobs ----
      S.listItem()
        .title("Publications / 论文")
        .child(S.documentTypeList("publication").title("Publications")),
      S.listItem()
        .title("Job Postings / 招聘岗位")
        .child(S.documentTypeList("jobPosting").title("Job Postings")),
      S.divider(),

      // ---- 3D scenes ----
      S.listItem()
        .title("Model Showcases / 3D 模型")
        .child(S.documentTypeList("modelShowcase").title("Model Showcases")),
      S.divider(),

      // ---- Evidence layer (Wave 3) ----
      S.listItem()
        .title("Lab Shots / 实景图")
        .child(S.documentTypeList("labShot").title("Lab Shots")),
      S.listItem()
        .title("Partners / 合作伙伴")
        .child(S.documentTypeList("partner").title("Partners")),
      S.listItem()
        .title("Press Mentions / 媒体提及")
        .child(S.documentTypeList("pressMention").title("Press Mentions")),
      S.divider(),

      // ---- Inbound (internal-only) ----
      S.listItem()
        .title("Inquiries / 询价记录")
        .child(
          S.documentTypeList("inquiry")
            .title("Inquiries")
            .defaultOrdering([{field: "submittedAt", direction: "desc"}]),
        ),
    ])
