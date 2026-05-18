import type {SchemaTypeDefinition} from "sanity"
import {researchTopic} from "./researchTopic"
import {labCapability} from "./labCapability"
import {application} from "./application"
import {publication} from "./publication"
import {jobPosting} from "./jobPosting"
import {modelShowcase} from "./modelShowcase"

export const schemaTypes: SchemaTypeDefinition[] = [
  researchTopic,
  labCapability,
  application,
  publication,
  jobPosting,
  modelShowcase,
]
