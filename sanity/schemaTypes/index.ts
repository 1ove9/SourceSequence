import type {SchemaTypeDefinition} from "sanity"
import {researchTopic} from "./researchTopic"
import {labCapability} from "./labCapability"
import {application} from "./application"
import {publication} from "./publication"
import {jobPosting} from "./jobPosting"
import {modelShowcase} from "./modelShowcase"
import {inquiry} from "./inquiry"
import {labShot} from "./labShot"
import {partner} from "./partner"
import {pressMention} from "./pressMention"

export const schemaTypes: SchemaTypeDefinition[] = [
  researchTopic,
  labCapability,
  application,
  publication,
  jobPosting,
  modelShowcase,
  inquiry,
  labShot,
  partner,
  pressMention,
]
