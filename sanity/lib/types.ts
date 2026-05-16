/**
 * Shared content types for documents fetched from Sanity.
 * Field names mirror the schema; locale is resolved in components by picking
 * <field>En vs <field>Zh.
 */

export type Locale = "en" | "zh"

export interface SanityImageRef {
  _type?: "image"
  asset?: {_ref: string; _type: "reference"}
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
}

export interface DetailSection {
  titleEn?: string
  titleZh?: string
  contentEn?: string
  contentZh?: string
}

export interface DetailConcept {
  termEn?: string
  termZh?: string
  definitionEn?: string
  definitionZh?: string
}

interface CardBase {
  _id: string
  slug: string
  order?: number
  code?: string
  titleEn: string
  titleZh: string
  cardDescriptionEn?: string
  cardDescriptionZh?: string
  cardIcon?: string
  heroImage?: SanityImageRef
}

interface DetailBase extends CardBase {
  subtitleEn?: string
  subtitleZh?: string
  abstractEn?: string
  abstractZh?: string
  sections?: DetailSection[]
  keyConcepts?: DetailConcept[]
  references?: string[]
}

export type ResearchTopicCard = CardBase & {isLongHorizon?: boolean}
export type ResearchTopicDetail = DetailBase & {isLongHorizon?: boolean}

export type LabCapabilityCard = CardBase & {locationTag?: string}
export type LabCapabilityDetail = DetailBase & {locationTag?: string}

export type ApplicationCard = CardBase & {
  figureNumber?: string
  figureLabelEn?: string
  figureLabelZh?: string
}
export type ApplicationDetail = DetailBase & {
  figureNumber?: string
  figureLabelEn?: string
  figureLabelZh?: string
}

export interface Publication {
  _id: string
  slug: string
  order?: number
  date?: string
  titleEn: string
  titleZh?: string
  type?: string
  isFeatured?: boolean
  summaryEn?: string
  summaryZh?: string
  externalUrl?: string
}

export interface JobPosting {
  _id: string
  slug: string
  order?: number
  isOpen?: boolean
  titleEn: string
  titleZh: string
  locationEn?: string
  locationZh?: string
  descriptionEn?: string
  descriptionZh?: string
  applyEmail?: string
}
