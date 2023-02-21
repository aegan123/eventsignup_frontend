import { useTranslation } from 'react-i18next'

// if this causes performance issues then just fallback using { t } in components
const translate = (key: string) => {
  const { t } = useTranslation()
  return t(key)
}

export { translate }
