// plugins/ethers.ts
import { ethers, type Eip1193Provider } from 'ethers'
import { defineNuxtPlugin } from '#app'

declare global {
  interface Window {
    ethereum?: Eip1193Provider
  }
}

export default defineNuxtPlugin(() => {
  const isClient = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'

  const provider = isClient
    ? new ethers.BrowserProvider(window.ethereum!)
    : null

  return {
    provide: {
      provider,
      ethers
    }
  }
})
