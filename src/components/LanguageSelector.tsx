import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSelector = (): React.ReactElement => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'fi'

  const langToIcon = {
    en: 'us',
    fi: 'fi',
  }

  return (
    <Wrapper>
      <span className={`fi fi-${langToIcon[currentLanguage]} fis`}></span>
      <Dropdown>
        <p onClick={() => void i18n.changeLanguage('fi')}>
          <span className={`fi fi-fi fis`}></span>
        </p>
        <p onClick={() => void i18n.changeLanguage('en')}>
          <span className={`fi fi-us fis`}></span>
        </p>
      </Dropdown>
    </Wrapper>
  )
}

const Dropdown = styled.div`
  display: none;
  position: absolute;
  width: 200px;
`

const Wrapper = styled.div`
  &:hover ${Dropdown} {
    display: block;
  }
`

export { LanguageSelector }
