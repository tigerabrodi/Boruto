import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type HeaderMenuContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderMenuContext = createContext<HeaderMenuContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
})

export const HeaderMenuContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <HeaderMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HeaderMenuContext.Provider>
  )
}

export const useHeaderMenuContext = () => {
  return useContext(HeaderMenuContext)
}
