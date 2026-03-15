'use client'

import { createContext, useContext } from 'react'

export interface SocialLinks {
  email: string
  githubUrl: string
  linkedinUrl: string
}

const SocialContext = createContext<SocialLinks>({
  email: 'doganogut06@gmail.com',
  githubUrl: 'https://github.com/dastugo',
  linkedinUrl: 'https://www.linkedin.com/company/81340574',
})

export function SocialProvider({ children, value }: { children: React.ReactNode; value: SocialLinks }) {
  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
}

export function useSocial() {
  return useContext(SocialContext)
}
