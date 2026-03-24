export const currentYear = new Date().getFullYear()

export const releaseYear = Number((import.meta as unknown as { env: { VITE_APP_RELEASE_YEAR?: string } }).env.VITE_APP_RELEASE_YEAR ?? 0) || currentYear

export const footerYear = releaseYear === currentYear ? `${currentYear}` : `${releaseYear}-${currentYear}`

export const yearsSinceRelease = currentYear - releaseYear > 0
  ? Array.from({ length: currentYear - releaseYear + 1 }, (_, i) => currentYear - i)
  : [currentYear]
