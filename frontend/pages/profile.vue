<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <TheNavbar />
    
    <div class="container mx-auto px-6 py-8 pt-24">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">个人资料</h1>
        <p class="text-gray-300 text-lg">管理您的身份信息和账户设置</p>
      </div>

      <!-- Profile Content -->
      <div v-if="!walletStore.isConnected" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">请连接钱包</h3>
        <p class="text-gray-400 mb-8">连接您的钱包以查看和管理个人资料</p>
        <WalletConnector />
      </div>

      <!-- Connected Profile -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column - Profile Info -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Profile Card -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div class="text-center mb-6">
              <div class="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">{{ profile.name || '未设置' }}</h3>
              <p class="text-gray-400 text-sm">{{ walletStore.formatAddress(walletStore.address) }}</p>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-300">账户状态</span>
                <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  活跃
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">DID 验证</span>
                <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  已验证
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">信用评分</span>
                <span class="text-xl font-bold text-cyan-400">750</span>
              </div>
            </div>
          </div>

          <!-- Wallet Info -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">钱包信息</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-400 text-sm mb-1">钱包地址</label>
                <div class="bg-gray-800/50 rounded-lg p-3 text-white text-sm break-all">
                  {{ walletStore.address }}
                </div>
              </div>
              <div>
                <label class="block text-gray-400 text-sm mb-1">网络</label>
                <div class="bg-gray-800/50 rounded-lg p-3 text-white text-sm">
                  {{ getNetworkName(walletStore.chainId) }}
                </div>
              </div>
              <div>
                <label class="block text-gray-400 text-sm mb-1">余额</label>
                <div class="bg-gray-800/50 rounded-lg p-3 text-white text-sm">
                  {{ walletStore.formatBalance(walletStore.balance) }} ETH
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Settings & Activities -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Settings -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-6">个人信息</h3>
            
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">姓名</label>
                  <input 
                    v-model="profile.name"
                    type="text" 
                    class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="输入您的姓名"
                  />
                </div>
                
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">邮箱</label>
                  <input 
                    v-model="profile.email"
                    type="email" 
                    class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="输入您的邮箱"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">个人简介</label>
                <textarea 
                  v-model="profile.bio"
                  rows="4"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="介绍一下您自己..."
                ></textarea>
              </div>
              
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">社交链接</label>
                <div class="space-y-3">
                  <input 
                    v-model="profile.twitter"
                    type="url" 
                    class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="Twitter URL"
                  />
                  <input 
                    v-model="profile.github"
                    type="url" 
                    class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="GitHub URL"
                  />
                  <input 
                    v-model="profile.website"
                    type="url" 
                    class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="Website URL"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                保存更改
              </button>
            </form>
          </div>

          <!-- DID Identity Management -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-6">DID 身份管理</h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/20">
                <h4 class="text-purple-400 font-semibold mb-2">身份验证</h4>
                <p class="text-gray-300 text-sm mb-4">验证您的数字身份</p>
                <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 w-full">
                  管理验证
                </button>
              </div>
              
              <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-xl border border-cyan-500/20">
                <h4 class="text-cyan-400 font-semibold mb-2">信用评分</h4>
                <p class="text-gray-300 text-sm mb-4">管理您的信用评分</p>
                <button class="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 w-full">
                  查看详情
                </button>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 class="text-blue-400 font-semibold mb-1">关于 DID</h4>
                  <p class="text-gray-300 text-sm">
                    去中心化身份 (DID) 让您完全控制自己的身份数据，无需依赖第三方服务提供商。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity History -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-6">活动历史</h3>
            
            <div class="space-y-4">
              <div v-for="activity in activities" :key="activity.id" 
                   class="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div class="w-10 h-10 rounded-full flex items-center justify-center"
                     :class="getActivityColor(activity.type)">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="activity.type === 'login'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    <path v-else-if="activity.type === 'transaction'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="text-white font-medium">{{ activity.description }}</div>
                  <div class="text-gray-400 text-sm">{{ activity.time }}</div>
                </div>
                <div class="text-gray-400 text-sm">
                  {{ activity.details }}
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-6">安全设置</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h4 class="text-white font-medium">两步验证</h4>
                  <p class="text-gray-400 text-sm">为您的账户添加额外的安全层</p>
                </div>
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300">
                  已启用
                </button>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h4 class="text-white font-medium">生物识别</h4>
                  <p class="text-gray-400 text-sm">使用指纹或面部识别登录</p>
                </div>
                <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300">
                  未启用
                </button>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h4 class="text-white font-medium">登录通知</h4>
                  <p class="text-gray-400 text-sm">当有新设备登录时接收通知</p>
                </div>
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300">
                  已启用
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Store
const walletStore = useWalletStore()

// Profile data
const profile = ref({
  name: '',
  email: '',
  bio: '',
  twitter: '',
  github: '',
  website: ''
})

// Activity data
const activities = ref([
  {
    id: 1,
    type: 'login',
    description: '登录账户',
    time: '2小时前',
    details: 'Chrome 浏览器'
  },
  {
    id: 2,
    type: 'transaction',
    description: '发送交易',
    time: '6小时前',
    details: '0.1 ETH'
  },
  {
    id: 3,
    type: 'verification',
    description: 'DID 验证',
    time: '1天前',
    details: '身份验证完成'
  },
  {
    id: 4,
    type: 'login',
    description: '登录账户',
    time: '2天前',
    details: 'Safari 浏览器'
  }
])

// Methods
const getNetworkName = (chainId) => {
  return walletStore.SUPPORTED_NETWORKS[chainId] || 'Unknown Network'
}

const getActivityColor = (type) => {
  const colors = {
    login: 'bg-blue-500/20 text-blue-400',
    transaction: 'bg-green-500/20 text-green-400',
    verification: 'bg-purple-500/20 text-purple-400'
  }
  return colors[type] || 'bg-gray-500/20 text-gray-400'
}

const updateProfile = () => {
  // Save profile to localStorage or send to backend
  localStorage.setItem('did-fi-profile', JSON.stringify(profile.value))
  console.log('Profile updated:', profile.value)
}

const loadProfile = () => {
  const saved = localStorage.getItem('did-fi-profile')
  if (saved) {
    profile.value = JSON.parse(saved)
  }
}

// Lifecycle
onMounted(() => {
  loadProfile()
})

// Meta
useHead({
  title: '个人资料 - DID-Fi DApp'
})
</script>
