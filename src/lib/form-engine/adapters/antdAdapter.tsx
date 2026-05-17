'use client'

import React, { useCallback, useContext, useMemo, useState, createContext, useRef } from 'react'
import type {
  FormAdapter,
  FormAdapterProviderProps,
  FieldBinding,
} from '../types'
import { normalizeError } from '../utils/validation'

// ─── Context ───────────────────────────────────────────────────────────────────
interface AntDFormContext {
  values: Record<string, unknown>
  errors: Record<string, string | undefined>
  setFieldValue: (name: string, value: unknown) => void
  setFieldTouched: (name: string) => void
  touched: Record<string, boolean>
  schema: FormAdapterProviderProps['schema']
  onSubmitRef: React.MutableRefObject<(v: Record<string, unknown>) => void | Promise<void>>
}

const AntDFormCtx = createContext<AntDFormContext | null>(null)

function useAntDFormCtx(): AntDFormContext {
  const ctx = useContext(AntDFormCtx)
  if (!ctx) throw new Error('useAntDFormCtx must be used inside AntDAdapter.FormProvider')
  return ctx
}

// ─── Provider ─────────────────────────────────────────────────────────────────
const AntDFormProvider: React.FC<FormAdapterProviderProps> = ({
  schema,
  onSubmit,
  children,
  defaultValues = {},
}) => {
  const initial = useMemo(() => {
    const d: Record<string, unknown> = {}
    schema?.fields.forEach((f) => {
      if (f.defaultValue !== undefined) d[f.name] = f.defaultValue
    })
    return { ...d, ...defaultValues }
  }, [schema, defaultValues])

  const [values, setValues] = useState<Record<string, unknown>>(initial)
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  const setFieldValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // clear error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }, [])

  const setFieldTouched = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const validateAll = useCallback(async (): Promise<boolean> => {
    const newErrors: Record<string, string | undefined> = {}
    let valid = true
    for (const field of (schema?.fields ?? [])) {
      if (!field.validation) continue
      const v = values[field.name]
      const { required, min, max, minLength, maxLength, pattern, custom, asyncCustom } =
        field.validation

      if (required && !v) {
        newErrors[field.name] =
          typeof required === 'string' ? required : 'این فیلد الزامی است'
        valid = false
        continue
      }
      if (custom) {
        const err = custom(v, values)
        if (err) { newErrors[field.name] = err; valid = false; continue }
      }
      if (asyncCustom) {
        const err = await asyncCustom(v, values)
        if (err) { newErrors[field.name] = err; valid = false; continue }
      }
    }
    setErrors(newErrors)
    return valid
  }, [schema?.fields, values])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const valid = await validateAll()
      if (valid) {
        await onSubmitRef.current(values)
      }
    },
    [validateAll, values]
  )

  return (
    <AntDFormCtx.Provider
      value={{ values, errors, setFieldValue, setFieldTouched, touched, schema, onSubmitRef }}
    >
      <form onSubmit={handleSubmit} noValidate style={{ display: 'contents' }}>
        {children}
      </form>
    </AntDFormCtx.Provider>
  )
}

// ─── useField ──────────────────────────────────────────────────────────────────
function useAntDField(name: string): FieldBinding {
  const { values, errors, setFieldValue, setFieldTouched, touched } = useAntDFormCtx()
  return {
    value: values[name] ?? '',
    onChange: (v) => setFieldValue(name, v),
    onBlur: () => setFieldTouched(name),
    error: errors[name],
    isTouched: touched[name],
  }
}

// ─── useSubmit ─────────────────────────────────────────────────────────────────
function useAntDSubmit(): () => void {
  return useCallback(() => {
    const form = document.querySelector<HTMLFormElement>('form[data-smart-form]')
    form?.requestSubmit()
  }, [])
}

// ─── useWatch ──────────────────────────────────────────────────────────────────
function useAntDWatch(names?: string[]): Record<string, unknown> {
  const { values } = useAntDFormCtx()
  if (!names) return values
  const result: Record<string, unknown> = {}
  names.forEach((n) => { result[n] = values[n] })
  return result
}

// ─── Export ────────────────────────────────────────────────────────────────────
export const AntDAdapter: FormAdapter = {
  Provider: AntDFormProvider,
  useField: useAntDField,
  useSubmit: useAntDSubmit,
  useWatch: useAntDWatch,
}
