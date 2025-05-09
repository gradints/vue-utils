import { reactive, watch } from "vue"
import { useRoute } from 'vue-router'

export const resetableReactive = <T extends object>(data: T) => {
  type Form = T & { reset: () => void, set: (newValue: Partial<T>) => void }
  const initialValue: T = { ...data }
  const form = reactive(data)

  Object.defineProperty(form, 'reset', {
    value: () => {
      Object.assign(form, initialValue)
    },
    enumerable: false, // <== this hides it from JSON.stringify and Object.keys
  })
  Object.defineProperty(form, 'set', {
    value: (newValue: Partial<T>) => {
      for (const key in initialValue) {
        if (key in newValue) {
          (form as T)[key] = newValue[key] as T[typeof key]
        }
      }
    },
    enumerable: false, // <== this hides it from JSON.stringify and Object.keys
  })

  return form as unknown as Form
}

export const gReactive = resetableReactive // alias

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