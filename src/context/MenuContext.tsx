import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type HeaderMenuContextType = {
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderMenuContext = createContext<HeaderMenuContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => undefined,
})

export const HeaderMenuContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HeaderMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </HeaderMenuContext.Provider>
  )
}

export const useHeaderMenuContext = () => {
  return useContext(HeaderMenuContext)
}
