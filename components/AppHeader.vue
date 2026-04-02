<template>
  <header
    class="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md"
  >
    <div
      class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
    >
      <NuxtLink to="/" class="group flex items-center gap-2">
        <span
          class="font-display text-lg font-semibold tracking-tight text-white transition group-hover:text-violet-400"
        >
          Silent Runners Club
        </span>
      </NuxtLink>
      <nav class="flex flex-wrap items-center gap-1 text-sm sm:gap-2">
        <NuxtLink
          to="/events"
          class="rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          active-class="!bg-zinc-800 !text-white"
        >
          Runs
        </NuxtLink>
        <NuxtLink
          to="/djs"
          class="rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          active-class="!bg-zinc-800 !text-white"
        >
          DJs
        </NuxtLink>
        <NuxtLink
          to="/how-it-works"
          class="rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          active-class="!bg-zinc-800 !text-white"
        >
          How it works
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
