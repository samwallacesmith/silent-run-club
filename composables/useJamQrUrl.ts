export function resolveJamQrUrl(
  eventJamUrl: string | undefined | null,
  opts: { defaultJamQrUrl: string; siteUrl: string },
) {
  const configuredDefault = opts.defaultJamQrUrl?.trim()
  const fallback = configuredDefault || opts.siteUrl
  const qrUrl = (eventJamUrl && String(eventJamUrl).trim()) || fallback
  const isRunSpecificJam = Boolean(eventJamUrl?.trim())

  return { qrUrl, isRunSpecificJam, fallback }
}

/**
 * Resolves the URL encoded in run QR codes: event-specific `jamUrl` when set,
 * otherwise `defaultJamQrUrl` from runtime config, otherwise the public site URL.
 */
export function useJamQrUrl(eventJamUrl: string | undefined | null) {
  const config = useRuntimeConfig()
  const siteUrl = useSiteUrl()
  return resolveJamQrUrl(eventJamUrl, {
    defaultJamQrUrl: config.public.defaultJamQrUrl as string,
    siteUrl,
  })
}
