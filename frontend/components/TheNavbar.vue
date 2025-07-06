<template>
  <nav class="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <div class="text-xl font-bold text-white">DID-Fi</div>
            <div class="text-xs text-gray-400 -mt-1">DApp</div>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group px-3 py-2 rounded-lg hover:bg-white/5"
            :class="{ 'text-cyan-400 bg-cyan-500/10': $route.path === item.path }"
          >
            <!-- 图标 -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- 首页 -->
              <path v-if="item.icon === 'home'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              <!-- DID 身份 -->
              <path v-else-if="item.icon === 'identity'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              <!-- 声誉排行 -->
              <path v-else-if="item.icon === 'star'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              <!-- 打赏广场 -->
              <path v-else-if="item.icon === 'gift'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              <!-- 我的空间 -->
              <path v-else-if="item.icon === 'dashboard'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span>{{ item.name }}</span>
            <div 
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"
              :class="{ 'w-full': $route.path === item.path }"
            ></div>
          </NuxtLink>
        </div>

        <!-- Search -->
        <div class="hidden lg:block relative">
          <div class="relative">
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="搜索用户地址..."
              class="w-64 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle (Future) -->
          <!-- <button class="p-2 text-gray-400 hover:text-white transition-colors duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button> -->

          <!-- Notifications (Future) -->
          <!-- <button class="p-2 text-gray-400 hover:text-white transition-colors duration-200 relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19c-4.3 0-8-3.7-8-8s3.7-8 8-8 8 3.7 8 8c0 1.6-.5 3.1-1.3 4.3" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> -->

          <!-- Wallet Connector -->
          <WalletConnector mode="navbar" />

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-white/10 z-45"
        >
          <div class="container mx-auto px-6 py-4">
            <div class="space-y-2">
              <NuxtLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                @click="mobileMenuOpen = false"
                class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium py-3 px-4 rounded-lg hover:bg-white/5"
                :class="{ 'text-cyan-400 bg-cyan-500/10': $route.path === item.path }"
              >
                <!-- 移动端图标 -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- 首页 -->
                  <path v-if="item.icon === 'home'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  <!-- DID 身份 -->
                  <path v-else-if="item.icon === 'identity'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  <!-- 声誉排行 -->
                  <path v-else-if="item.icon === 'star'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  <!-- 打赏广场 -->
                  <path v-else-if="item.icon === 'gift'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  <!-- 我的空间 -->
                  <path v-else-if="item.icon === 'dashboard'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span>{{ item.name }}</span>
              </NuxtLink>
              
              <!-- Mobile Wallet Info -->
              <div v-if="walletStore.isConnected" class="pt-4 border-t border-white/10">
                <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                  </div>
                  <div>
                    <div class="text-white text-sm font-medium">
                      {{ walletStore.formatAddress(walletStore.address) }}
                    </div>
                    <div class="text-gray-400 text-xs">
                      {{ walletStore.formatBalance(walletStore.balance) }} ETH
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Progress Bar -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-300" :class="{ 'opacity-100': isLoading }"></div>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ethers } from 'ethers'

// Store
const walletStore = useWalletStore()

// State
const mobileMenuOpen = ref(false)
const isLoading = ref(false)
const searchQuery = ref('')

// Navigation items - 针对 DID-Fi DApp 特点设计
const navItems = [
  { name: '首页', path: '/', icon: 'home' },
  { name: 'DID 身份', path: '/did', icon: 'identity' },
  { name: '声誉排行', path: '/reputation', icon: 'star' },
  { name: '打赏广场', path: '/tips', icon: 'gift' },
  { name: '我的空间', path: '/dashboard', icon: 'dashboard' }
]

// Search functionality
const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (!query) return
  
  // 检查是否是有效的以太坊地址
  if (ethers.isAddress(query)) {
    // 直接跳转到用户主页
    navigateTo(`/user/${query}`)
    searchQuery.value = ''
  } else {
    // 可以在这里添加其他搜索逻辑，比如按昵称搜索
    alert('请输入有效的钱包地址 (0x...)')
  }
}

// Watch route changes to close mobile menu
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})

// Handle page loading states
const route = useRoute()
watch(() => route.path, () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}, { immediate: true })
</script>

<style scoped>
/* 确保导航栏在页面顶部 */
nav {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 移动端菜单动画 */
@media (max-width: 768px) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: all 0.3s ease;
  }
  
  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
