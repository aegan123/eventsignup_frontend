import React from 'react'
import { useTranslation } from 'react-i18next'
import Dropdown from 'react-bootstrap/Dropdown'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'
import Nav from 'react-bootstrap/Nav'

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
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>
        <span
          className={`fi fi-${langToIcon[currentLanguage] || 'fi'} fis`}
        ></span>
      </Dropdown.Toggle>
      <DropdownMenu variant="dark">
        <Dropdown.Item
          as={Nav.Item}
          onClick={() => void i18n.changeLanguage('fi')}
        >
          <span className={`fi fi-fi fis`}></span>
        </Dropdown.Item>
        <Dropdown.Item
          as={Nav.Item}
          onClick={() => void i18n.changeLanguage('en')}
        >
          <span className={`fi fi-us fis`}></span>
        </Dropdown.Item>
      </DropdownMenu>
    </Dropdown>
  )
}

const DropdownMenu = styled(Dropdown.Menu)`
  min-width: 0;
`
export { LanguageSelector }
