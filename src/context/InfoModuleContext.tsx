import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type InfoModuleContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const InfoModuleContext = createContext<InfoModuleContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
})

export const InfoModuleContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <InfoModuleContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </InfoModuleContext.Provider>
  )
}

export const useInfoModuleContext = () => {
  return useContext(InfoModuleContext)
}
