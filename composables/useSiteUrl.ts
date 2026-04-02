export function useSiteUrl() {
  const config = useRuntimeConfig()
  const requestURL = useRequestURL()
  return (config.public.siteUrl as string) || requestURL.origin
}
