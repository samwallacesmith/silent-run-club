<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface DjDoc extends ParsedContent {
  name?: string
  slug?: string
  bio?: string
  instagram?: string
  soundcloud?: string
  photo?: string
}

const siteUrl = useSiteUrl()

const { data: djs } = await useAsyncData('djs-list', () =>
  queryContent<DjDoc>('djs').sort({ name: 1 }).find(),
)

useSeoMeta({
  title: 'DJs · Silent Runners Club',
  description:
    'DJs who shape the shared mixes for Silent Runners Club—bios, links, and mixes.',
  ogTitle: 'DJs · Silent Runners Club',
  ogDescription: 'Meet the DJs behind each run’s mix.',
  ogImage: `${siteUrl}/og-default.svg`,
  ogUrl: `${siteUrl}/djs`,
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/djs` }],
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
    <h1 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
      DJs
    </h1>
    <p class="mt-3 max-w-2xl text-zinc-400">
      Each run can spotlight someone behind the mix—follow them, book them, share their
      work.
    </p>

    <ul class="mt-12 grid gap-6 sm:grid-cols-2">
      <li
        v-for="dj in djs"
        :key="dj._path"
        class="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
      >
        <img
          v-if="dj.photo"
          :src="dj.photo"
          :alt="dj.name"
          class="h-20 w-20 shrink-0 rounded-xl object-cover"
          width="80"
          height="80"
        />
        <div class="min-w-0">
          <h2 class="text-lg font-semibold text-white">
            <NuxtLink :to="`/djs/${dj.slug}`" class="hover:text-violet-300">
              {{ dj.name }}
            </NuxtLink>
          </h2>
          <p class="mt-1 line-clamp-2 text-sm text-zinc-500">
            {{ dj.bio }}
          </p>
        </div>
      </li>
    </ul>

    <p v-if="!djs?.length" class="mt-8 text-zinc-500">No DJs yet.</p>
  </div>
</template>
