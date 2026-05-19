"use client"

import Image from "next/image"
import {motion} from "framer-motion"
import {urlFor} from "@/sanity/lib/image"
import {pick} from "@/sanity/lib/locale"
import type {LabShot, Locale} from "@/sanity/lib/types"
import SectionHeader from "./SectionHeader"

interface Props {
  items: LabShot[]
  locale: Locale
  label: string
  heading: string
  intro: string
}

const APPLE_EASE = [0.4, 0, 0.2, 1] as const

export default function InsideTheLabView({
  items,
  locale,
  label,
  heading,
  intro,
}: Props) {
  return (
    <section id="inside-the-lab" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} intro={intro} />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((shot, i) => (
            <ShotCard key={shot._id} shot={shot} idx={i} locale={locale} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ShotCard({
  shot,
  idx,
  locale,
}: {
  shot: LabShot
  idx: number
  locale: Locale
}) {
  const subject = pick(shot.subjectEn, shot.subjectZh, locale) ?? ""
  const caption = pick(shot.captionEn, shot.captionZh, locale)
  const fullWidth = shot.isFeatured

  return (
    <motion.li
      initial={{opacity: 0, y: 20, scale: 0.97}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, margin: "-60px"}}
      transition={{
        duration: 0.6,
        delay: 0.04 + idx * 0.04,
        ease: APPLE_EASE,
      }}
      className={fullWidth ? "sm:col-span-2 lg:col-span-2" : ""}
    >
      <figure className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={urlFor(shot.image).width(1200).height(900).fit("crop").url()}
            alt={subject}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Bottom-fade gradient for caption legibility */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "linear-gradient(to top, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0) 100%)",
            }}
            aria-hidden
          />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {subject}
          </div>
          {caption && (
            <div className="mt-1.5 max-h-0 overflow-hidden text-[13px] leading-[1.5] text-foreground/85 opacity-0 transition-[max-height,opacity,margin] duration-300 group-hover:mt-1.5 group-hover:max-h-32 group-hover:opacity-100">
              {caption}
            </div>
          )}
        </figcaption>
      </figure>
    </motion.li>
  )
}
