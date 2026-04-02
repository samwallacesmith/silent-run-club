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
}

const siteUrl = useSiteUrl()

const { data: events } = await useAsyncData('events-list', () =>
  queryContent<EventDoc>('events').sort({ start: 1 }).find(),
)

useSeoMeta({
  title: 'Runs · Silent Runners Club',
  description:
    'Upcoming Silent Runners Club meetups with QR listen links and featured DJs.',
  ogTitle: 'Runs · Silent Runners Club',
  ogDescription: 'Upcoming meetups—same listen link in everyone’s headphones.',
  ogImage: `${siteUrl}/og-default.svg`,
  ogUrl: `${siteUrl}/events`,
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/events` }],
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
    <h1 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
      Runs
    </h1>
    <p class="mt-3 max-w-2xl text-zinc-400">
      Same route, same listen URL—scan on the day or save the link from the event page.
    </p>

    <ul class="mt-12 space-y-6">
      <li
        v-for="ev in events"
        :key="ev._path"
        class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-sm text-violet-400/90">
              {{ ev.start ? formatEventDate(ev.start) : '' }}
            </p>
            <h2 class="mt-1 text-xl font-semibold text-white">
              <NuxtLink
                :to="`/events/${ev.slug}`"
                class="hover:text-violet-300"
              >
                {{ ev.title }}
              </NuxtLink>
            </h2>
            <p class="mt-2 text-sm text-zinc-400">{{ ev.location }}</p>
            <p class="mt-3 line-clamp-2 text-sm text-zinc-500">
              {{ ev.description }}
            </p>
          </div>
          <NuxtLink
            :to="`/events/${ev.slug}`"
            class="inline-flex shrink-0 items-center justify-center self-start rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Details
          </NuxtLink>
        </div>
      </li>
    </ul>

    <p v-if="!events?.length" class="mt-8 text-zinc-500">
      No events yet.
    </p>
  </div>
</template>
