<script setup lang="ts">
const siteUrl = useSiteUrl();

useSeoMeta({
  title: "How it works · Silent Runners Club",
  description:
    "Bring your phone and headphones, scan the run’s QR to open its listen link (Spotify, Apple Music, or whatever the host chose), and run together—same audio, no street speakers.",
  ogTitle: "How it works · Silent Runners Club",
  ogDescription: "QR + your earphones + the run’s link. Step-by-step.",
  ogImage: `${siteUrl}/og-default.svg`,
  ogUrl: `${siteUrl}/how-it-works`,
  twitterCard: "summary_large_image",
});
useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/how-it-works` }],
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
    <h1
      class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
    >
      How it works
    </h1>
    <p class="mt-4 text-lg text-zinc-400">
      Each run publishes a QR that opens a shared listen link—everyone uses
      their own phone and headphones. No boomboxes on the route.
    </p>

    <ol class="mt-12 space-y-10">
      <li class="flex gap-4">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-400"
        >
          1
        </span>
        <div>
          <h2 class="text-xl font-semibold text-white">
            Install the app you need
          </h2>
          <p class="mt-2 leading-relaxed text-zinc-400">
            The QR points wherever the host set it—often Spotify or Apple Music,
            sometimes a playlist page or a landing link. Install whatever that
            URL expects before you arrive.
          </p>
        </div>
      </li>
      <li class="flex gap-4">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-400"
        >
          2
        </span>
        <div>
          <h2 class="text-xl font-semibold text-white">Scan or tap</h2>
          <p class="mt-2 leading-relaxed text-zinc-400">
            At the meetup, scan the run’s QR on a poster or use the
            <strong class="font-medium text-zinc-300">Open listen link</strong>
            button on the event page. You should land on the same session or
            playlist as the group.
          </p>
        </div>
      </li>
      <li class="flex gap-4">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-400"
        >
          3
        </span>
        <div>
          <h2 class="text-xl font-semibold text-white">Plug in and run</h2>
          <p class="mt-2 leading-relaxed text-zinc-400">
            Use your earphones or buds—Bluetooth or wired. Stay aware of traffic
            and other people; keep volume at a level where you can hear your
            surroundings.
          </p>
        </div>
      </li>
      <li class="flex gap-4">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-400"
        >
          4
        </span>
        <div>
          <h2 class="text-xl font-semibold text-white">Share the DJ</h2>
          <p class="mt-2 leading-relaxed text-zinc-400">
            Featured DJs are listed on each run. Follow them, share the event
            link, and help the community discover who curated the mix.
          </p>
        </div>
      </li>
    </ol>

    <p
      class="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-sm leading-relaxed text-zinc-500"
    >
      Premium accounts, group sessions, and “social listening” features depend
      on whichever app the link opens—check that service’s current rules before
      the run.
    </p>
  </div>
</template>
