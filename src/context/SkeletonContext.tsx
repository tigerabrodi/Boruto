import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type SkeletonContextType = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const SkeletonContext = createContext<SkeletonContextType>({
  isLoading: true,
  setIsLoading: () => undefined,
})

export const SkeletonContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <SkeletonContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </SkeletonContext.Provider>
  )
}

export const useSkeletonContext = () => {
  return useContext(SkeletonContext)
}
