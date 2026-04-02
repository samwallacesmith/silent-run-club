<script setup lang="ts">
const props = defineProps<{
  url: string
  alt: string
}>()

const dataUrl = ref<string | null>(null)
const error = ref<string | null>(null)

async function render() {
  if (!import.meta.client || !props.url) {
    dataUrl.value = null
    return
  }
  try {
    const QRCode = (await import('qrcode')).default
    dataUrl.value = await QRCode.toDataURL(props.url, {
      width: 280,
      margin: 2,
      color: { dark: '#0a0a0a', light: '#fafafa' },
    })
    error.value = null
  } catch {
    error.value = 'Could not generate QR code.'
    dataUrl.value = null
  }
}

watch(
  () => props.url,
  () => {
    render()
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="flex flex-col items-center rounded-2xl border border-zinc-700 bg-zinc-900/50 p-6"
  >
    <img
      v-if="dataUrl"
      :src="dataUrl"
      :alt="alt"
      width="280"
      height="280"
      class="rounded-lg"
      decoding="async"
    />
    <p v-else-if="error" class="text-sm text-red-400">{{ error }}</p>
    <p v-else class="text-sm text-zinc-500">Loading QR…</p>
  </div>
</template>
