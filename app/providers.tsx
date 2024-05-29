'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const lemrTheme = extendTheme({
  colors: {
    primary: '#074fb5',
    secondary: '#0962ea',
    light: '#0aa0f6',
    highlight: '#faf15d',
    warning: '#c3195d',
  },
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