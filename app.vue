<script setup lang="ts">
// Default meta lives here (not nuxt.config) so copy edits use HMR instead of a full Nuxt restart.
useHead({
  meta: [
    {
      name: 'description',
      content:
        'Silent Runners Club: same tunes in your ears on the run, then hang out and talk after—QR listen links, DJs, and after-parties.',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
