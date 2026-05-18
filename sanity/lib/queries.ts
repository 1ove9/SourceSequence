import {groq} from "next-sanity"

// ---------- Research ----------

export const RESEARCH_TOPICS_QUERY = groq`
  *[_type == "researchTopic"] | order(order asc) {
    _id,
    "slug": slug.current,
    order,
    code,
    isLongHorizon,
    isService,
    titleEn,
    titleZh,
    cardDescriptionEn,
    cardDescriptionZh,
    cardIcon,
    heroImage
  }
`

export const RESEARCH_TOPIC_BY_SLUG_QUERY = groq`
  *[_type == "researchTopic" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    code,
    isLongHorizon,
    titleEn,
    titleZh,
    subtitleEn,
    subtitleZh,
    heroImage,
    abstractEn,
    abstractZh,
    sections[] {
      titleEn,
      titleZh,
      contentEn,
      contentZh
    },
    keyConcepts[] {
      termEn,
      termZh,
      definitionEn,
      definitionZh
    },
    references
  }
`

export const RESEARCH_TOPIC_SLUGS_QUERY = groq`
  *[_type == "researchTopic" && defined(slug.current)][].slug.current
`

// ---------- Lab ----------

export const LAB_CAPABILITIES_QUERY = groq`
  *[_type == "labCapability"] | order(order asc) {
    _id,
    "slug": slug.current,
    order,
    code,
    locationTag,
    titleEn,
    titleZh,
    cardDescriptionEn,
    cardDescriptionZh,
    cardIcon,
    heroImage
  }
`

export const LAB_CAPABILITY_BY_SLUG_QUERY = groq`
  *[_type == "labCapability" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    code,
    locationTag,
    titleEn,
    titleZh,
    subtitleEn,
    subtitleZh,
    heroImage,
    abstractEn,
    abstractZh,
    sections[] {
      titleEn,
      titleZh,
      contentEn,
      contentZh
    },
    keyConcepts[] {
      termEn,
      termZh,
      definitionEn,
      definitionZh
    },
    references
  }
`

export const LAB_CAPABILITY_SLUGS_QUERY = groq`
  *[_type == "labCapability" && defined(slug.current)][].slug.current
`

// ---------- Application ----------

export const APPLICATIONS_QUERY = groq`
  *[_type == "application"] | order(order asc) {
    _id,
    "slug": slug.current,
    order,
    code,
    figureNumber,
    figureLabelEn,
    figureLabelZh,
    titleEn,
    titleZh,
    cardDescriptionEn,
    cardDescriptionZh,
    cardIcon,
    heroImage
  }
`

export const APPLICATION_BY_SLUG_QUERY = groq`
  *[_type == "application" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    code,
    figureNumber,
    figureLabelEn,
    figureLabelZh,
    titleEn,
    titleZh,
    subtitleEn,
    subtitleZh,
    heroImage,
    abstractEn,
    abstractZh,
    sections[] {
      titleEn,
      titleZh,
      contentEn,
      contentZh
    },
    keyConcepts[] {
      termEn,
      termZh,
      definitionEn,
      definitionZh
    },
    references
  }
`

export const APPLICATION_SLUGS_QUERY = groq`
  *[_type == "application" && defined(slug.current)][].slug.current
`

// ---------- Publications ----------

export const PUBLICATIONS_QUERY = groq`
  *[_type == "publication"] | order(order asc) {
    _id,
    "slug": slug.current,
    order,
    date,
    titleEn,
    titleZh,
    type,
    isFeatured,
    summaryEn,
    summaryZh,
    externalUrl
  }
`

// ---------- Job postings ----------

export const JOB_POSTINGS_QUERY = groq`
  *[_type == "jobPosting" && isOpen == true] | order(order asc) {
    _id,
    "slug": slug.current,
    order,
    isOpen,
    titleEn,
    titleZh,
    locationEn,
    locationZh,
    descriptionEn,
    descriptionZh,
    applyEmail
  }
`

// ---------- Model Showcases ----------

export const MODEL_SHOWCASES_QUERY = groq`
  *[_type == "modelShowcase"] | order(order asc) {
    _id,
    "slug": slug.current,
    order,
    code,
    sceneKey,
    titleEn,
    titleZh,
    cardDescriptionEn,
    cardDescriptionZh,
    tagsEn,
    tagsZh,
    isFeatured
  }
`

export const MODEL_SHOWCASE_BY_SLUG_QUERY = groq`
  *[_type == "modelShowcase" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    code,
    sceneKey,
    titleEn,
    titleZh,
    subtitleEn,
    subtitleZh,
    cardDescriptionEn,
    cardDescriptionZh,
    descriptionEn,
    descriptionZh,
    tagsEn,
    tagsZh,
    isFeatured
  }
`

export const MODEL_SHOWCASE_SLUGS_QUERY = groq`
  *[_type == "modelShowcase" && defined(slug.current)][].slug.current
`
