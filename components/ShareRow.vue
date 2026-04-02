<script setup lang="ts">
const props = defineProps<{
  url: string
  title: string
}>()

const copied = ref(false)
const canNativeShare = ref(false)

onMounted(() => {
  canNativeShare.value =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'
})

async function copyLink() {
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    /* ignore */
  }
}

async function shareNative() {
  if (typeof navigator === 'undefined' || !navigator.share) {
    await copyLink()
    return
  }
  try {
    await navigator.share({
      title: props.title,
      url: props.url,
    })
  } catch {
    /* user cancelled or error */
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-violet-400"
    >
      Open link
    </a>
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
      @click="copyLink"
    >
      {{ copied ? 'Copied' : 'Copy link' }}
    </button>
    <button
      v-if="canNativeShare"
      type="button"
      class="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
      @click="shareNative"
    >
      Share…
    </button>
  </div>
</template>
