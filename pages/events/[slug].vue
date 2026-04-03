<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

interface EventDoc extends ParsedContent {
  title?: string;
  slug?: string;
  start?: string;
  location?: string;
  description?: string;
  jamUrl?: string;
  djSlug?: string;
  coverImage?: string;
}

interface DjDoc extends ParsedContent {
  name?: string;
  slug?: string;
  bio?: string;
  instagram?: string;
  soundcloud?: string;
  photo?: string;
}

const route = useRoute();
const slug = computed(() => String(route.params.slug));

const siteUrl = useSiteUrl();
const config = useRuntimeConfig();

const { data: page } = await useAsyncData(
  () => `event-page-${slug.value}`,
  async () => {
    const event = await queryContent<EventDoc>("events")
      .where({ slug: slug.value })
      .findOne();
    if (!event) return null;
    let dj: DjDoc | null = null;
    if (event.djSlug) {
      dj = await queryContent<DjDoc>("djs")
        .where({ slug: event.djSlug })
        .findOne();
    }
    return { event, dj };
  },
  { watch: [slug] },
);

const event = computed(() => page.value?.event ?? null);
const dj = computed(() => page.value?.dj ?? null);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Run not found" });
}

const canonical = computed(() => `${siteUrl}/events/${slug.value}`);
const ogImage = computed(() => {
  const c = event.value?.coverImage;
  if (!c) return `${siteUrl}/og-default.svg`;
  if (c.startsWith("http")) return c;
  return `${siteUrl}${c}`;
});

useSeoMeta({
  title: event.value?.title
    ? `${event.value.title} · Silent Runners Club`
    : "Run · Silent Runners Club",
  description: event.value?.description,
  ogTitle: event.value?.title,
  ogDescription: event.value?.description,
  ogImage: ogImage.value,
  ogUrl: canonical.value,
  twitterCard: "summary_large_image",
});
useHead({
  link: [{ rel: "canonical", href: canonical }],
});

const shareUrl = canonical;
const shareTitle = computed(() => event.value?.title ?? "Run");

const jamQr = computed(() => {
  const ev = event.value;
  if (!ev) return null;
  return resolveJamQrUrl(ev.jamUrl, {
    persistentJamQrUrl: config.public.persistentJamQrUrl as string,
    defaultJamQrUrl: config.public.defaultJamQrUrl as string,
    siteUrl,
  });
});
</script>

<template>
  <article v-if="event" class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
    <NuxtLink
      to="/events"
      class="text-sm font-medium text-violet-500 hover:text-violet-400"
    >
      ← All runs
    </NuxtLink>

    <div class="mt-6 flex flex-col gap-12 lg:flex-row lg:items-start">
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-violet-400/90">
          {{ event.start ? formatEventDate(event.start) : "" }}
        </p>
        <h1
          class="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {{ event.title }}
        </h1>
        <p class="mt-4 text-lg text-zinc-300">{{ event.location }}</p>
        <p class="mt-6 leading-relaxed text-zinc-400">
          {{ event.description }}
        </p>

        <div
          v-if="event.body"
          class="prose prose-invert mt-8 max-w-none text-zinc-300 prose-p:leading-relaxed"
        >
          <ContentRenderer :value="event" />
        </div>

        <section
          v-if="dj"
          class="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <h2
            class="text-sm font-semibold uppercase tracking-wide text-zinc-500"
          >
            Featured DJ
          </h2>
          <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              v-if="dj.photo"
              :src="dj.photo"
              :alt="dj.name || 'DJ'"
              class="h-24 w-24 shrink-0 rounded-2xl object-cover"
              width="96"
              height="96"
            />
            <div>
              <NuxtLink
                :to="`/djs/${dj.slug}`"
                class="text-xl font-semibold text-white hover:text-violet-300"
              >
                {{ dj.name }}
              </NuxtLink>
              <p class="mt-2 text-sm leading-relaxed text-zinc-400">
                {{ dj.bio }}
              </p>
              <div class="mt-3 flex flex-wrap gap-4 text-sm">
                <a
                  v-if="dj.instagram"
                  :href="dj.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-violet-400 hover:text-violet-300"
                >
                  Instagram
                </a>
                <a
                  v-if="dj.soundcloud"
                  :href="dj.soundcloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-violet-400 hover:text-violet-300"
                >
                  SoundCloud
                </a>
              </div>
            </div>
          </div>
        </section>

        <div class="mt-10">
          <h2
            class="text-sm font-semibold uppercase tracking-wide text-zinc-500"
          >
            Share this run
          </h2>
          <ShareRow class="mt-3" :url="shareUrl" :title="shareTitle" />
        </div>
      </div>

      <aside class="w-full shrink-0 lg:max-w-sm">
        <div
          v-if="event.coverImage"
          class="mb-6 overflow-hidden rounded-2xl border border-zinc-800"
        >
          <img
            :src="event.coverImage"
            :alt="event.title || 'Run cover'"
            class="h-auto w-full object-cover"
            width="800"
            height="420"
          />
        </div>
        <template v-if="jamQr">
          <h2
            class="text-center text-sm font-semibold uppercase tracking-wide text-zinc-500"
          >
            {{ jamQr.isRunSpecificJam ? "Listen QR" : "Run QR" }}
          </h2>
          <p class="mt-2 text-center text-xs text-zinc-500">
            {{
              jamQr.isRunSpecificJam
                ? "Scan with your phone to open this run’s listen link in your music app."
                : "Scan for this run’s link (club default until a listen URL is set on the event)."
            }}
          </p>
          <JamQrCode
            class="mt-4"
            :url="jamQr.qrUrl"
            :alt="
              jamQr.isRunSpecificJam
                ? `QR code for the listen link — ${event.title}`
                : `QR code — ${event.title}`
            "
          />
          <a
            v-if="jamQr.isRunSpecificJam"
            :href="jamQr.qrUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 flex w-full items-center justify-center rounded-xl bg-violet-500 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-violet-400"
          >
            Open listen link
          </a>
          <a
            v-else
            :href="jamQr.qrUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 flex w-full items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900/80 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Open link
          </a>
        </template>
      </aside>
    </div>
  </article>
</template>
