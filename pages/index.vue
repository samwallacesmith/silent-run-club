<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface EventDoc extends ParsedContent {
  title?: string
  slug?: string
  start?: string
  location?: string
  description?: string
  jamUrl?: string
  djSlug?: string
  coverImage?: string
}

const siteUrl = useSiteUrl()
const config = useRuntimeConfig()

const { data: events } = await useAsyncData('home-events', () =>
  queryContent<EventDoc>('events').sort({ start: 1 }).find(),
)

const nextEvent = computed(() => {
  const list = events.value ?? []
  if (!list.length) return null
  const now = Date.now()
  const upcoming = list.find((e) => e.start && new Date(e.start).getTime() >= now)
  return upcoming ?? list[list.length - 1] ?? null
})

const nextJamQr = computed(() => {
  const ev = nextEvent.value
  if (!ev) return null
  return resolveJamQrUrl(ev.jamUrl, {
    defaultJamQrUrl: config.public.defaultJamQrUrl as string,
    siteUrl,
  })
})

useSeoMeta({
  title: 'Silent Runners Club · tunes on the run, talk after',
  description:
    'For people who want the same tunes in their ears on the route and a real hangout after—QR listen link on the run, then drinks, chatter, and DJs.',
  ogTitle: 'Silent Runners Club',
  ogDescription:
    'Tunes on the run. Conversation and partying after. Same QR, same vibe.',
  ogImage: `${siteUrl}/og-default.svg`,
  ogUrl: siteUrl + '/',
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/' }],
})
</script>

<template>
  <div>
    <section
      class="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-violet-950/40 to-zinc-950"
    >
      <div class="pointer-events-none absolute inset-0 opacity-30">
        <div
          class="absolute -left-20 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
        />
        <div
          class="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl"
        />
      </div>
      <div class="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <p class="text-sm font-medium uppercase tracking-widest text-violet-400/90">
          Tunes on the run. Talk after.
        </p>
        <h1
          class="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          For people who want to listen together—then actually talk after the miles.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Same QR listen link in everyone’s headphones while we move—no speakers on the sidewalk.
          When the run’s done, we head to the after-spot to debrief, laugh, meet the DJ, and
          keep the night going out loud.
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <NuxtLink
            to="/events"
            class="inline-flex items-center justify-center rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
          >
            View runs
          </NuxtLink>
          <NuxtLink
            to="/how-it-works"
            class="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900/80 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            How it works
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="nextEvent" class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-semibold text-white">Next up</h2>
          <p class="mt-2 text-sm text-zinc-500">
            {{ nextEvent.start ? formatEventDate(nextEvent.start) : '' }}
          </p>
          <h3 class="mt-4 text-3xl font-semibold tracking-tight text-white">
            {{ nextEvent.title }}
          </h3>
          <p class="mt-3 text-zinc-400">{{ nextEvent.location }}</p>
          <p class="mt-4 leading-relaxed text-zinc-300">
            {{ nextEvent.description }}
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              :to="`/events/${nextEvent.slug}`"
              class="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white"
            >
              Run details &amp; QR
            </NuxtLink>
          </div>
        </div>
        <div v-if="nextJamQr" class="w-full max-w-sm shrink-0">
          <p class="mb-3 text-center text-xs font-medium uppercase tracking-wide text-zinc-500">
            {{
              nextJamQr.isRunSpecificJam
                ? 'Scan to open this run’s listen link'
                : 'Scan for Silent Runners'
            }}
          </p>
          <JamQrCode
            :url="nextJamQr.qrUrl"
            :alt="
              nextJamQr.isRunSpecificJam
                ? `QR code to open the listen link for ${nextEvent.title}`
                : `QR code — ${nextEvent.title}`
            "
          />
        </div>
      </div>
    </section>

    <section v-else class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p class="text-zinc-400">
        No runs published yet. Check back soon—or add events in
        <code class="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-violet-300">content/events/</code>.
      </p>
    </section>

    <section class="border-t border-zinc-800 bg-zinc-900/30">
      <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 class="font-display text-2xl font-semibold text-white">DJs &amp; community</h2>
        <p class="mt-3 max-w-2xl text-zinc-400">
          Each run can spotlight a DJ—bios, socials, and mixes live on the site so the
          crowd knows who shaped the set.
        </p>
        <NuxtLink
          to="/djs"
          class="mt-6 inline-flex text-sm font-semibold text-violet-400 hover:text-violet-300"
        >
          Meet the DJs →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
