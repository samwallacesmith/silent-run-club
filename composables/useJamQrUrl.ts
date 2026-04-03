export function resolveJamQrUrl(
  eventJamUrl: string | undefined | null,
  opts: {
    persistentJamQrUrl: string
    defaultJamQrUrl: string
    siteUrl: string
  },
) {
  const persistent = opts.persistentJamQrUrl?.trim()
  if (persistent) {
    return {
      qrUrl: persistent,
      isRunSpecificJam: true,
      fallback: persistent,
    }
  }

  const configuredDefault = opts.defaultJamQrUrl?.trim()
  const fallback = configuredDefault || opts.siteUrl
  const qrUrl = (eventJamUrl && String(eventJamUrl).trim()) || fallback
  const isRunSpecificJam = Boolean(eventJamUrl?.trim())

  return { qrUrl, isRunSpecificJam, fallback }
}

/**
 * Resolves the URL encoded in run QR codes: `persistentJamQrUrl` when set,
 * else event `jamUrl`, else `defaultJamQrUrl`, else the public site URL.
 */
export function useJamQrUrl(eventJamUrl: string | undefined | null) {
  const config = useRuntimeConfig()
  const siteUrl = useSiteUrl()
  return resolveJamQrUrl(eventJamUrl, {
    persistentJamQrUrl: config.public.persistentJamQrUrl as string,
    defaultJamQrUrl: config.public.defaultJamQrUrl as string,
    siteUrl,
  })
}
