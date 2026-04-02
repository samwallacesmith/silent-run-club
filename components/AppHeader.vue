<script setup lang="ts">
const mobileOpen = ref(false)
const route = useRoute()

const navLinks = [
  { to: '/events', label: 'Runs' },
  { to: '/djs', label: 'DJs' },
  { to: '/how-it-works', label: 'How it works' },
] as const

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md"
  >
    <div
      class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4"
    >
      <NuxtLink
        to="/"
        class="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none"
        aria-label="Silent Runners Club home"
      >
        <img
          src="/logo-illuminati.svg"
          alt=""
          width="36"
          height="36"
          class="h-8 w-8 shrink-0 rounded-lg transition group-hover:opacity-90 sm:h-9 sm:w-9"
          aria-hidden="true"
        />
        <span
          class="truncate font-display text-base font-semibold tracking-tight text-white transition group-hover:text-violet-400 sm:text-lg"
        >
          <span class="sm:hidden">Silent Runners</span>
          <span class="hidden sm:inline">Silent Runners Club</span>
        </span>
      </NuxtLink>

      <button
        type="button"
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-zinc-800 hover:text-white md:hidden"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        @click="mobileOpen = !mobileOpen"
      >
        <svg
          v-if="!mobileOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <nav
        class="hidden items-center gap-1 text-sm md:flex md:gap-2"
        aria-label="Main"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          active-class="!bg-zinc-800 !text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div
        v-show="mobileOpen"
        id="mobile-nav"
        class="border-t border-zinc-800/80 md:hidden"
      >
        <nav
          class="mx-auto max-w-5xl px-4 py-2 sm:px-6"
          aria-label="Main"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block rounded-lg px-3 py-3 text-base text-zinc-300 transition hover:bg-zinc-800 hover:text-white active:bg-zinc-800"
            active-class="!bg-zinc-800 !text-white"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>
