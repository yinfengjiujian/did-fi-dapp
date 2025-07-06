<template>
  <ClientOnly>
    <div class="wallet-connector">
      <!-- 未连接状态 -->
      <div v-if="!walletStore.isConnected" class="flex items-center gap-3">
      <button
        @click="handleConnect"
        :disabled="connecting || !walletStore.isMetaMaskInstalled"
        class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center gap-2"
      >
        <svg v-if="connecting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {{ connecting ? '连接中...' : '连接钱包' }}
      </button>
      
      <!-- MetaMask 未安装提示 -->
      <div v-if="!walletStore.isMetaMaskInstalled" class="text-sm text-yellow-400">
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="underline hover:text-yellow-300"
        >
          安装 MetaMask
        </a>
      </div>
    </div>

    <!-- 已连接状态 -->
    <div v-else class="relative">
      <div class="flex items-center gap-3">
        <!-- 网络指示器（导航栏模式才显示） -->
        <div v-if="mode === 'navbar'" class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
          <div 
            class="w-3 h-3 rounded-full"
            :class="getNetworkColor(walletStore.chainId)"
          ></div>
          <span class="text-sm text-gray-300">
            {{ getNetworkName(walletStore.chainId) }}
          </span>
        </div>

        <!-- 余额显示（导航栏模式才显示） -->
        <div v-if="mode === 'navbar'" class="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
          <span class="text-sm text-gray-300">
            {{ walletStore.formatBalance(walletStore.balance) }} ETH
          </span>
        </div>

        <!-- 用户菜单按钮 -->
        <button
          @click="showDropdown = !showDropdown"
          class="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
        >
          <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span class="hidden sm:inline">{{ walletStore.formatAddress(walletStore.address) }}</span>
          <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- 遮罩层（模态框模式） -->
      <div 
        v-if="showDropdown && mode === 'modal'"
        @click="showDropdown = false"
        class="fixed inset-0 z-40 bg-black/50"
      ></div>

      <!-- 钱包菜单 -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showDropdown"
          :class="[
            'w-80 bg-gray-800 rounded-xl shadow-2xl border-2 border-cyan-400/50 backdrop-blur-md',
            mode === 'modal' 
              ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' 
              : 'absolute right-0 top-full mt-2 z-50'
          ]"
        >
            <!-- 账户信息 -->
            <div class="p-4 border-b border-gray-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div class="text-white font-medium">我的钱包</div>
                  <div class="text-gray-400 text-sm">{{ getNetworkName(walletStore.chainId) }}</div>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">地址:</span>
                  <button 
                    @click="copyAddress"
                    class="flex items-center gap-1 transition-colors duration-200"
                    :class="copied ? 'text-green-400' : 'text-blue-400 hover:text-blue-300'"
                  >
                    {{ walletStore.formatAddress(walletStore.address) }}
                    <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">余额:</span>
                  <span class="text-white">{{ walletStore.formatBalance(walletStore.balance) }} ETH</span>
                </div>
              </div>
            </div>

            <!-- 操作菜单 -->
            <div class="p-2">
              <NuxtLink
                :to="`/user/${walletStore.address.value || ''}`"
                @click="showDropdown = false"
                class="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                查看我的主页
              </NuxtLink>
              
              <button
                @click="refreshBalance"
                class="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                刷新余额
              </button>
              
              <NuxtLink
                to="/profile"
                @click="showDropdown = false"
                class="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                编辑个人资料
              </NuxtLink>

              <button
                @click="handleDisconnect"
                class="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                断开连接
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 错误提示 -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <div
        v-if="error"
        class="fixed top-4 right-4 bg-red-500/90 text-white px-6 py-4 rounded-xl shadow-lg border border-red-400 z-[9999] max-w-sm"
      >
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-red-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 class="font-semibold mb-1">连接失败</h4>
            <p class="text-sm text-red-100">{{ error }}</p>
          </div>
          <button
            @click="error = ''"
            class="text-red-200 hover:text-white ml-auto"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- 成功提示 -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <div
        v-if="success"
        class="fixed top-4 right-4 bg-green-500/90 text-white px-6 py-4 rounded-xl shadow-lg border border-green-400 z-[9999]"
      >
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="font-medium">{{ success }}</span>
          <button
            @click="success = ''"
            class="text-green-200 hover:text-white ml-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  mode: {
    type: String,
    default: 'modal', // 'modal' for homepage, 'navbar' for navigation
    validator: (value) => ['modal', 'navbar'].includes(value)
  },
  size: {
    type: String,
    default: 'default', // 'small', 'default', 'large'
    validator: (value) => ['small', 'default', 'large'].includes(value)
  }
})

// Store
const walletStore = useWalletStore()

// State
const connecting = ref(false)
const showDropdown = ref(false)
const error = ref('')
const success = ref('')
const copied = ref(false)

// Methods
const handleConnect = async () => {
  if (connecting.value) return
  
  connecting.value = true
  error.value = ''
  
  try {
    await walletStore.connectWallet()
    success.value = '钱包连接成功!'
    setTimeout(() => success.value = '', 3000)
  } catch (err) {
    error.value = err.message || '连接失败，请重试'
    setTimeout(() => error.value = '', 5000)
  } finally {
    connecting.value = false
  }
}

const handleDisconnect = () => {
  walletStore.disconnectWallet()
  showDropdown.value = false
  success.value = '钱包已断开连接'
  setTimeout(() => success.value = '', 3000)
}

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(walletStore.address.value)
    copied.value = true
    success.value = '地址已复制到剪贴板'
    setTimeout(() => {
      success.value = ''
      copied.value = false
    }, 2000)
  } catch (err) {
    error.value = '复制失败'
    setTimeout(() => error.value = '', 3000)
  }
}

const refreshBalance = async () => {
  await walletStore.updateBalance()
  success.value = '余额已更新'
  setTimeout(() => success.value = '', 2000)
}

const getNetworkName = (chainId) => {
  return walletStore.SUPPORTED_NETWORKS[chainId] || 'Unknown Network'
}

const getNetworkColor = (chainId) => {
  const colors = {
    1: 'bg-blue-500',     // Mainnet
    5: 'bg-yellow-500',   // Goerli
    11155111: 'bg-purple-500', // Sepolia
    1337: 'bg-green-500'  // Localhost
  }
  return colors[chainId] || 'bg-red-500'
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.wallet-connector')
  if (!dropdown) {
    showDropdown.value = false
  }
}

// Lifecycle
onMounted(async () => {
  // 设置钱包事件监听
  walletStore.setupAccountListener()
  
  // 检查是否已连接
  await walletStore.checkConnection()
  
  // 添加点击外部关闭下拉菜单的监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 自定义滚动条 */
.wallet-connector ::-webkit-scrollbar {
  width: 4px;
}

.wallet-connector ::-webkit-scrollbar-track {
  background: transparent;
}

.wallet-connector ::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.wallet-connector ::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}
</style>
