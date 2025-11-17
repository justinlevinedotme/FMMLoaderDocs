'use client'

import type { AllLocales, I18nLangKeys, LocaleKeys, PathValue } from '@/i18n'
import { useParams } from 'next/navigation' // Uses next/navigation params
import { useCallback } from 'react'
import { getNestedValue, i18nConfig, interpolateString } from '@/i18n'

// Derive localized value type for a given key
type LocalizedValue<T, K extends LocaleKeys> = PathValue<T, K> extends string
  ? string
  : PathValue<T, K>

export const useLocale = () => {
  const params = useParams()

  // Infer locale from the URL param
  const currentLocale = (
    (params?.lang as I18nLangKeys)
    || 'en'
  ) as I18nLangKeys

  const t = useCallback(
    <K extends LocaleKeys>(
      key: K,
      withData: Record<string, any> = {},
    ): LocalizedValue<AllLocales, K> => {
      const template = getNestedValue(i18nConfig[currentLocale], key)

      if (typeof template === 'string') {
        return interpolateString(template, withData) as LocalizedValue<AllLocales, K>
      }

      return template as LocalizedValue<AllLocales, K>
    },
    [currentLocale],
  )

  return {
    currentLocale,
    t,
  }
}
