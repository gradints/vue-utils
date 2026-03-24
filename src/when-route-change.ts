import { watch } from "vue"
import { useRoute } from 'vue-router'

/**
 * Watch the route full path, and trigger callback when query / params change
 * but don't trigger when route name change (move away to other page).
 * Optional watchSource to watch just specific part of the route (not fullPath).
 */
export const whenRouteChange = (callback: () => void, watchSource?: () => unknown) => {
  const route = useRoute()
  const routeName = route.name // cache route name
  const watchRouteParamsAndQuery = () => JSON.stringify([route.query, route.params])
  watch(
    watchSource ?? watchRouteParamsAndQuery,
    () => {
      if (route.name === routeName) {
        callback()
      }
    },
    { immediate: true },
  )
}