import { ref, computed, readonly } from 'vue'
import { ethers } from 'ethers'

// 扩展 Window 接口以包含 ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: any) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      isMetaMask?: boolean
    }
  }
}

// 钱包状态
const isConnected = ref(false)
const address = ref('')
const provider = ref<ethers.BrowserProvider | null>(null)
const signer = ref<ethers.JsonRpcSigner | null>(null)
const chainId = ref<number | null>(null)
const balance = ref('0')

// 支持的网络
const SUPPORTED_NETWORKS = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  1337: 'Localhost'
}

export const useWallet = () => {
  // 检查是否安装了 MetaMask
  const isMetaMaskInstalled = computed(() => {
    if (process.server) return false
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  })

  // 格式化地址显示
  const formatAddress = (addr: string | null | undefined) => {
    if (!addr || typeof addr !== 'string') return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // 格式化余额显示
  const formatBalance = (bal: string | null | undefined) => {
    if (!bal || typeof bal !== 'string') return '0.0000'
    return parseFloat(bal).toFixed(4)
  }

  // 连接钱包
  const connectWallet = async () => {
    if (process.server) {
      throw new Error('钱包连接只能在客户端执行')
    }
    
    try {
      if (!isMetaMaskInstalled.value || !window.ethereum) {
        throw new Error('请安装 MetaMask 钱包')
      }

      // 请求连接钱包
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length === 0) {
        throw new Error('未找到钱包账户')
      }

      // 创建 provider 和 signer
      const ethProvider = new ethers.BrowserProvider(window.ethereum as any)
      const ethSigner = await ethProvider.getSigner()
      const network = await ethProvider.getNetwork()

      // 更新状态
      provider.value = ethProvider
      signer.value = ethSigner
      address.value = accounts[0]
      chainId.value = Number(network.chainId)
      isConnected.value = true

      // 获取余额
      await updateBalance()

      console.log('钱包连接成功:', {
        address: address.value,
        chainId: chainId.value,
        network: SUPPORTED_NETWORKS[chainId.value as keyof typeof SUPPORTED_NETWORKS] || 'Unknown'
      })

      return true
    } catch (error) {
      console.error('连接钱包失败:', error)
      throw error
    }
  }

  // 断开钱包连接
  const disconnectWallet = () => {
    isConnected.value = false
    address.value = ''
    provider.value = null
    signer.value = null
    chainId.value = null
    balance.value = '0'
    
    console.log('钱包已断开连接')
  }

  // 更新余额
  const updateBalance = async () => {
    try {
      if (!provider.value || !address.value) return

      const bal = await provider.value.getBalance(address.value)
      balance.value = ethers.formatEther(bal)
    } catch (error) {
      console.error('获取余额失败:', error)
    }
  }

  // 发送交易
  const sendTransaction = async (to: string, amount: string) => {
    try {
      if (!signer.value) {
        throw new Error('钱包未连接')
      }

      const tx = {
        to,
        value: ethers.parseEther(amount)
      }

      const transaction = await signer.value.sendTransaction(tx)
      console.log('交易已发送:', transaction.hash)

      // 等待交易确认
      const receipt = await transaction.wait()
      console.log('交易已确认:', receipt)

      // 更新余额
      await updateBalance()

      return receipt
    } catch (error) {
      console.error('发送交易失败:', error)
      throw error
    }
  }

  // 切换网络
  const switchNetwork = async (targetChainId: number) => {
    if (process.server) {
      throw new Error('网络切换只能在客户端执行')
    }
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask 未安装')
      }

      const hexChainId = `0x${targetChainId.toString(16)}`
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }]
      })

      chainId.value = targetChainId
      console.log('网络切换成功:', SUPPORTED_NETWORKS[targetChainId as keyof typeof SUPPORTED_NETWORKS])
    } catch (error: any) {
      console.error('切换网络失败:', error)
      
      // 如果网络不存在，尝试添加网络
      if (error.code === 4902) {
        // 这里可以添加网络配置
        console.log('网络不存在，需要添加网络配置')
      }
      
      throw error
    }
  }

  // 监听账户变化
  const setupAccountListener = () => {
    if (process.server) return
    
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          address.value = accounts[0]
          updateBalance()
          console.log('账户已切换:', accounts[0])
        }
      })

      window.ethereum.on('chainChanged', (newChainId: string) => {
        chainId.value = parseInt(newChainId, 16)
        console.log('网络已切换:', chainId.value)
        // 重新连接以获取新网络的 provider
        if (isConnected.value) {
          connectWallet()
        }
      })

      window.ethereum.on('disconnect', () => {
        disconnectWallet()
        console.log('钱包已断开连接')
      })
    }
  }

  // 检查是否已连接
  const checkConnection = async () => {
    if (process.server) return false
    
    try {
      if (!isMetaMaskInstalled.value || !window.ethereum) return false

      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      })

      if (accounts.length > 0) {
        // 自动重连
        await connectWallet()
        return true
      }
      
      return false
    } catch (error) {
      console.error('检查连接状态失败:', error)
      return false
    }
  }

  return {
    // 状态
    isConnected: readonly(isConnected),
    address: readonly(address),
    provider: readonly(provider),
    signer: readonly(signer),
    chainId: readonly(chainId),
    balance: readonly(balance),
    
    // 计算属性
    isMetaMaskInstalled,
    
    // 方法
    formatAddress,
    formatBalance,
    connectWallet,
    disconnectWallet,
    updateBalance,
    sendTransaction,
    switchNetwork,
    setupAccountListener,
    checkConnection,
    
    // 常量
    SUPPORTED_NETWORKS
  }
}

// 全局钱包状态 (用于 Pinia store)
export const useWalletStore = () => {
  const wallet = useWallet()
  
  return {
    ...wallet
  }
}
