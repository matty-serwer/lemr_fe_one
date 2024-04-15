'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const lemrTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.800',
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
})


export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={lemrTheme}>{children}</ChakraProvider>
}