import { reactive } from "vue"

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