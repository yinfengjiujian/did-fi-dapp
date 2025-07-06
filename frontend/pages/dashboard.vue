<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    
    <div class="container mx-auto px-6 py-8 pt-24">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">
          我的空间
        </h1>
        <p class="text-gray-300 text-lg">管理您的 DID 身份、声誉和打赏记录</p>
        <div class="mt-4 flex items-center gap-4">
          <div class="text-sm text-gray-400">
            钱包地址: {{ walletStore.address ? walletStore.formatAddress(walletStore.address) : '未连接' }}
          </div>
        </div>
      </div>

      <!-- Connection Status -->
      <ClientOnly>
        <div v-if="!walletStore.isConnected" class="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 mb-8">
        <div class="flex items-center gap-4">
          <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 class="text-yellow-400 font-semibold text-lg">钱包未连接</h3>
            <p class="text-yellow-300">请连接您的钱包以访问所有功能</p>
          </div>
          <WalletConnector />
        </div>
      </div>
      </ClientOnly>

      <!-- Dashboard Grid -->
      <div v-if="walletStore.isConnected" class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column - DID Identity & Status -->
        <div class="lg:col-span-1 space-y-6">
          <!-- DID Identity Card -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              我的 DID 身份
            </h3>
            <div class="space-y-4">
              <div v-if="didProfile.isRegistered" class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {{ didProfile.nickname ? didProfile.nickname.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <div>
                    <div class="text-white font-semibold">{{ didProfile.nickname || '未设置昵称' }}</div>
                    <div class="text-gray-400 text-sm">注册于 {{ didProfile.registeredAt }}</div>
                  </div>
                </div>
                <div class="bg-green-500/20 border border-green-500/30 rounded-xl p-3">
                  <div class="flex items-center gap-2 text-green-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium">DID 身份已验证</span>
                  </div>
                </div>
                <button @click="navigateTo('/did')" class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 rounded-xl transition-all duration-300 text-sm">
                  管理身份信息
                </button>
              </div>
              <div v-else class="text-center space-y-4">
                <div class="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
                  <svg class="w-8 h-8 text-yellow-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div class="text-yellow-400 font-medium text-sm">尚未注册 DID 身份</div>
                  <div class="text-yellow-300 text-xs mt-1">注册后可获得链上身份认证</div>
                </div>
                <button @click="navigateTo('/did')" class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 rounded-xl transition-all duration-300 text-sm">
                  立即注册 DID
                </button>
              </div>
            </div>
          </div>

          <!-- Reputation Status -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              我的声誉
            </h3>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-400">{{ reputationStats.score }}</div>
                  <div class="text-gray-300 text-sm">声誉分数</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-400">{{ reputationStats.rank }}</div>
                  <div class="text-gray-300 text-sm">排名</div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-300">获得点赞</span>
                  <span class="text-green-400 font-medium">{{ reputationStats.likes }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-300">获得点踩</span>
                  <span class="text-red-400 font-medium">{{ reputationStats.dislikes }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-300">互评次数</span>
                  <span class="text-blue-400 font-medium">{{ reputationStats.given }}</span>
                </div>
              </div>
              <button @click="navigateTo('/reputation')" class="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 rounded-xl transition-all duration-300 text-sm">
                查看声誉排行
              </button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-4">快速操作</h3>
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="navigateTo('/did')"
                class="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 p-3 rounded-xl transition-all duration-300 text-sm font-medium"
              >
                身份管理
              </button>
              <button 
                @click="navigateTo('/reputation')"
                class="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-3 rounded-xl transition-all duration-300 text-sm font-medium"
              >
                评价他人
              </button>
              <button 
                @click="navigateTo('/tips')"
                class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 p-3 rounded-xl transition-all duration-300 text-sm font-medium"
              >
                发起打赏
              </button>
              <button 
                @click="showWithdrawModal = true"
                class="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-3 rounded-xl transition-all duration-300 text-sm font-medium"
              >
                提现打赏
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Tips & Activities -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Tips Overview -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-6">打赏概览</h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-yellow-400 mb-2">{{ tipsStats.received }} ETH</div>
                <div class="text-gray-300 text-sm">收到打赏</div>
                <div class="text-green-400 text-sm">+{{ tipsStats.receivedCount }} 次</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-400 mb-2">{{ tipsStats.sent }} ETH</div>
                <div class="text-gray-300 text-sm">发出打赏</div>
                <div class="text-blue-400 text-sm">{{ tipsStats.sentCount }} 次</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-400 mb-2">{{ tipsStats.available }} ETH</div>
                <div class="text-gray-300 text-sm">可提现余额</div>
                <button 
                  @click="showWithdrawModal = true"
                  class="text-green-400 hover:text-green-300 text-sm underline mt-1"
                >
                  立即提现
                </button>
              </div>
            </div>
          </div>

          <!-- Recent Tips -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">最近打赏记录</h3>
              <button @click="navigateTo('/tips')" class="text-yellow-400 hover:text-yellow-300 text-sm">查看全部</button>
            </div>
            
            <div class="space-y-4">
              <div v-for="tip in recentTips" :key="tip.id" 
                   class="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                       :class="tip.type === 'received' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="tip.type === 'received'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-white font-medium">{{ tip.description }}</div>
                    <div class="text-gray-400 text-sm">{{ tip.time }}</div>
                    <div v-if="tip.message" class="text-gray-300 text-sm italic">"{{ tip.message }}"</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-white font-semibold"
                       :class="tip.type === 'received' ? 'text-green-400' : 'text-orange-400'">
                    {{ tip.type === 'received' ? '+' : '-' }}{{ tip.amount }} ETH
                  </div>
                  <div class="text-gray-400 text-sm">{{ tip.status }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-6">最近活动</h3>
            <div class="space-y-4">
              <div v-for="activity in recentActivities" :key="activity.id" 
                   class="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div class="w-8 h-8 rounded-full flex items-center justify-center"
                     :class="getActivityIconClass(activity.type)">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="activity.type === 'did'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    <path v-else-if="activity.type === 'reputation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm">{{ activity.description }}</div>
                  <div class="text-gray-400 text-xs">{{ activity.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Withdraw Modal -->
    <div v-if="showWithdrawModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-700">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-white">提现打赏</h3>
          <button @click="showWithdrawModal = false" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-300">可提现余额</span>
              <span class="text-2xl font-bold text-green-400">{{ tipsStats.available }} ETH</span>
            </div>
            <div class="text-gray-400 text-sm">
              来自 {{ tipsStats.receivedCount }} 次打赏
            </div>
          </div>
          
          <form @submit.prevent="withdrawTips" class="space-y-4">
            <div>
              <label class="block text-gray-300 text-sm font-medium mb-2">提现金额 (ETH)</label>
              <input 
                v-model="withdrawForm.amount"
                type="number" 
                step="0.001"
                :max="tipsStats.available"
                class="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="0.0"
              />
            </div>
            
            <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-sm">
              <div class="text-yellow-400 font-medium mb-1">提现说明</div>
              <div class="text-yellow-300">提现将把 ETH 转入您的钱包地址</div>
            </div>
            
            <button 
              type="submit"
              :disabled="!withdrawForm.amount || parseFloat(withdrawForm.amount) > parseFloat(tipsStats.available)"
              class="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
            >
              确认提现
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// Store
const walletStore = useWalletStore()

// Data
const showWithdrawModal = ref(false)

// DID Profile Data (Mock - will be replaced with smart contract data)
const didProfile = ref({
  isRegistered: true, // Change to false to see unregistered state
  nickname: 'CryptoExplorer',
  registeredAt: '2024-03-15',
  ipfsHash: 'QmXyZ...'
})

// Reputation Stats (Mock Data)
const reputationStats = ref({
  score: 85,
  rank: '#42',
  likes: 127,
  dislikes: 3,
  given: 89
})

// Tips Stats (Mock Data)
const tipsStats = ref({
  received: '2.456',
  receivedCount: 18,
  sent: '1.234',
  sentCount: 12,
  available: '2.456'
})

// Recent Tips Data
const recentTips = ref([
  {
    id: 1,
    type: 'received',
    description: '来自 Alice 的打赏',
    amount: '0.1',
    time: '2小时前',
    status: '已确认',
    message: '感谢你的精彩分享！'
  },
  {
    id: 2,
    type: 'sent',
    description: '打赏给 Bob',
    amount: '0.05',
    time: '5小时前',
    status: '已确认',
    message: '很棒的内容'
  },
  {
    id: 3,
    type: 'received',
    description: '来自 Charlie 的打赏',
    amount: '0.2',
    time: '1天前',
    status: '已确认',
    message: '继续加油！'
  }
])

// Recent Activities Data
const recentActivities = ref([
  {
    id: 1,
    type: 'did',
    description: '更新了 DID 昵称',
    time: '3小时前'
  },
  {
    id: 2,
    type: 'reputation',
    description: '给 Alice 点了赞',
    time: '6小时前'
  },
  {
    id: 3,
    type: 'tips',
    description: '收到了一笔打赏',
    time: '8小时前'
  },
  {
    id: 4,
    type: 'reputation',
    description: '声誉分数提升至 85',
    time: '1天前'
  }
])

const withdrawForm = ref({
  amount: ''
})

// Methods
const getActivityIconClass = (type) => {
  switch (type) {
    case 'did':
      return 'bg-cyan-500/20 text-cyan-400'
    case 'reputation':
      return 'bg-purple-500/20 text-purple-400'
    case 'tips':
      return 'bg-yellow-500/20 text-yellow-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

const withdrawTips = async () => {
  try {
    // Implement withdraw logic using smart contract
    console.log('提现打赏:', withdrawForm.value)
    showWithdrawModal.value = false
    withdrawForm.value = { amount: '' }
    // Update available balance
    tipsStats.value.available = (parseFloat(tipsStats.value.available) - parseFloat(withdrawForm.value.amount)).toFixed(3)
  } catch (error) {
    console.error('提现失败:', error)
  }
}

// Mock function to load user data (will be replaced with smart contract calls)
const loadUserData = async () => {
  if (!walletStore.isConnected) return
  
  try {
    // TODO: Load DID profile from smart contract
    // const didData = await didContract.getDIDProfile(walletStore.address)
    
    // TODO: Load reputation data from smart contract  
    // const reputationData = await reputationContract.getReputation(walletStore.address)
    
    // TODO: Load tips data from smart contract
    // const tipsData = await tipsContract.getTipsStats(walletStore.address)
    
    console.log('用户数据加载完成')
  } catch (error) {
    console.error('加载用户数据失败:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
})

// Watch for wallet connection changes
watch(() => walletStore.isConnected, (isConnected) => {
  if (isConnected) {
    loadUserData()
  }
})

// Meta
useHead({
  title: '我的空间 - DID-Fi DApp',
  meta: [
    { name: 'description', content: '管理您的 DID 身份、声誉记录和打赏数据' },
    { name: 'keywords', content: 'DID, 身份, 声誉, 打赏, 区块链, Web3' }
  ]
})
</script>
