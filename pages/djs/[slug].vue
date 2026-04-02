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

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const siteUrl = useSiteUrl()

const { data: dj } = await useAsyncData(
  () => `dj-${slug.value}`,
  () => queryContent<DjDoc>('djs').where({ slug: slug.value }).findOne(),
  { watch: [slug] },
)

if (!dj.value) {
  throw createError({ statusCode: 404, statusMessage: 'DJ not found' })
}

const canonical = computed(() => `${siteUrl}/djs/${slug.value}`)
const ogImage = computed(() => {
  const p = dj.value?.photo
  if (!p) return `${siteUrl}/og-default.svg`
  if (p.startsWith('http')) return p
  return `${siteUrl}${p}`
})

useSeoMeta({
  title: dj.value.name ? `${dj.value.name} · Silent Runners Club` : 'DJ · Silent Runners Club',
  description: dj.value.bio,
  ogTitle: dj.value.name,
  ogDescription: dj.value.bio,
  ogImage: ogImage.value,
  ogUrl: canonical.value,
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: canonical }],
})

const shareUrl = canonical
const shareTitle = computed(() => dj.value?.name ?? 'DJ')
</script>

<template>
  <article v-if="dj" class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
    <NuxtLink
      to="/djs"
      class="text-sm font-medium text-violet-500 hover:text-violet-400"
    >
      ← All DJs
    </NuxtLink>

    <div class="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
      <img
        v-if="dj.photo"
        :src="dj.photo"
        :alt="dj.name"
        class="h-40 w-40 shrink-0 rounded-2xl object-cover sm:h-48 sm:w-48"
        width="192"
        height="192"
      />
      <div class="min-w-0 flex-1">
        <h1 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ dj.name }}
        </h1>
        <p class="mt-4 max-w-2xl leading-relaxed text-zinc-300">
          {{ dj.bio }}
        </p>

        <div
          v-if="dj.body"
          class="prose prose-invert mt-8 max-w-none text-zinc-400 prose-p:leading-relaxed"
        >
          <ContentRenderer :value="dj" />
        </div>

        <div class="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            v-if="dj.instagram"
            :href="dj.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-violet-400 hover:text-violet-300"
          >
            Instagram
          </a>
          <a
            v-if="dj.soundcloud"
            :href="dj.soundcloud"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-violet-400 hover:text-violet-300"
          >
            SoundCloud
          </a>
        </div>

        <div class="mt-10">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Share
          </h2>
          <ShareRow class="mt-3" :url="shareUrl" :title="shareTitle" />
        </div>
      </div>
    </div>
  </article>
</template>
