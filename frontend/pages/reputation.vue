<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <TheNavbar />
    
    <div class="container mx-auto px-6 py-8 pt-24">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">🌟 声誉排行榜</h1>
        <p class="text-gray-300 text-lg">基于链上互评的信用排名系统</p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.totalVotes }}</div>
              <div class="text-gray-400 text-sm">总评价数</div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.activeUsers }}</div>
              <div class="text-gray-400 text-sm">活跃用户</div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.topScore }}</div>
              <div class="text-gray-400 text-sm">最高声誉</div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.todayVotes }}</div>
              <div class="text-gray-400 text-sm">今日评价</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区 -->
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- 左侧：筛选和搜索 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 搜索框 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">搜索用户</h3>
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="钱包地址或昵称..."
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none pl-10"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- 排序选项 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">排序方式</h3>
            <div class="space-y-2">
              <label v-for="option in sortOptions" :key="option.value" class="flex items-center gap-3 cursor-pointer">
                <input 
                  v-model="selectedSort" 
                  :value="option.value"
                  type="radio" 
                  class="w-4 h-4 text-cyan-600 bg-gray-800 border-gray-600 focus:ring-cyan-500"
                />
                <span class="text-gray-300">{{ option.label }}</span>
              </label>
            </div>
          </div>

          <!-- 声誉分布 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">声誉分布</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-300 text-sm">正声誉 (>0)</span>
                <span class="text-green-400 font-medium">{{ stats.positiveUsers }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full" :style="{ width: `${(stats.positiveUsers / stats.activeUsers) * 100}%` }"></div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-300 text-sm">中性声誉 (0)</span>
                <span class="text-gray-400 font-medium">{{ stats.neutralUsers }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-gray-500 to-gray-600 h-2 rounded-full" :style="{ width: `${(stats.neutralUsers / stats.activeUsers) * 100}%` }"></div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-300 text-sm">负声誉 (<0)</span>
                <span class="text-red-400 font-medium">{{ stats.negativeUsers }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" :style="{ width: `${(stats.negativeUsers / stats.activeUsers) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：排行榜 -->
        <div class="lg:col-span-3">
          <!-- Tab 切换 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 mb-6">
            <div class="flex gap-2">
              <button 
                v-for="tab in tabs" 
                :key="tab.value"
                @click="selectedTab = tab.value"
                class="flex-1 px-4 py-3 text-center font-medium rounded-xl transition-all duration-200"
                :class="selectedTab === tab.value 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- 排行榜列表 -->
          <div class="space-y-4">
            <div 
              v-for="(user, index) in filteredUsers" 
              :key="user.address"
              class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div class="flex items-center gap-4">
                <!-- 排名 -->
                <div class="flex-shrink-0">
                  <div 
                    class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                    :class="getRankingClass(index + 1)"
                  >
                    {{ index + 1 }}
                  </div>
                </div>

                <!-- 用户头像 -->
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-lg">{{ getInitials(user.address) }}</span>
                  </div>
                </div>

                <!-- 用户信息 -->
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-white font-semibold text-lg">{{ user.nickname || '未设置昵称' }}</h3>
                    <span v-if="user.isVerified" class="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                      已验证
                    </span>
                  </div>
                  <div class="text-gray-400 text-sm mb-2">{{ formatAddress(user.address) }}</div>
                  <div class="flex items-center gap-4 text-sm">
                    <span class="text-gray-400">注册时间: {{ formatDate(user.registeredAt) }}</span>
                    <span class="text-gray-400">评价次数: {{ user.voteCount }}</span>
                  </div>
                </div>

                <!-- 声誉分数 -->
                <div class="flex-shrink-0 text-right">
                  <div 
                    class="text-3xl font-bold mb-1"
                    :class="user.reputation >= 0 ? 'text-green-400' : 'text-red-400'"
                  >
                    {{ user.reputation > 0 ? '+' : '' }}{{ user.reputation }}
                  </div>
                  <div class="text-gray-400 text-sm">声誉值</div>
                  
                  <!-- 趋势指示器 -->
                  <div class="flex items-center justify-end gap-1 mt-2">
                    <svg 
                      v-if="user.trend === 'up'" 
                      class="w-4 h-4 text-green-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <svg 
                      v-else-if="user.trend === 'down'" 
                      class="w-4 h-4 text-red-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                    <span class="text-xs text-gray-500">
                      {{ user.trend === 'up' ? '上升' : user.trend === 'down' ? '下降' : '持平' }}
                    </span>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex-shrink-0 flex flex-col gap-2">
                  <NuxtLink
                    :to="`/user/${user.address}`"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    查看主页
                  </NuxtLink>
                  <button 
                    v-if="walletStore.isConnected && walletStore.address.value !== user.address"
                    @click="voteUser(user.address, 1)"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    赞
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载更多 -->
          <div v-if="hasMore" class="text-center mt-8">
            <button 
              @click="loadMore"
              :disabled="loading"
              class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {{ loading ? '加载中...' : '加载更多' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useWallet } from '~/composables/useWallet'

// 钱包状态
const walletStore = useWallet()

// 页面状态
const searchQuery = ref('')
const selectedSort = ref('reputation_desc')
const selectedTab = ref('all')
const loading = ref(false)
const hasMore = ref(true)

// 统计数据
const stats = reactive({
  totalVotes: 1256,
  activeUsers: 89,
  topScore: 156,
  todayVotes: 34,
  positiveUsers: 67,
  neutralUsers: 15,
  negativeUsers: 7
})

// 排序选项
const sortOptions = [
  { value: 'reputation_desc', label: '声誉值降序' },
  { value: 'reputation_asc', label: '声誉值升序' },
  { value: 'vote_count_desc', label: '评价数降序' },
  { value: 'register_time_desc', label: '注册时间降序' }
]

// Tab 选项
const tabs = [
  { value: 'all', label: '全部用户' },
  { value: 'positive', label: '正声誉' },
  { value: 'rising', label: '上升趋势' },
  { value: 'today', label: '今日活跃' }
]

// 用户数据
const users = ref([
  {
    address: '0x1234567890123456789012345678901234567890',
    nickname: 'Solidity专家',
    reputation: 156,
    voteCount: 234,
    registeredAt: Date.now() - 86400000 * 30,
    isVerified: true,
    trend: 'up'
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    nickname: 'Web3开发者',
    reputation: 134,
    voteCount: 189,
    registeredAt: Date.now() - 86400000 * 45,
    isVerified: true,
    trend: 'up'
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    nickname: 'DeFi研究员',
    reputation: 98,
    voteCount: 156,
    registeredAt: Date.now() - 86400000 * 20,
    isVerified: false,
    trend: 'stable'
  },
  {
    address: '0x4567890123456789012345678901234567890123',
    nickname: '',
    reputation: 67,
    voteCount: 123,
    registeredAt: Date.now() - 86400000 * 60,
    isVerified: false,
    trend: 'down'
  },
  {
    address: '0x5678901234567890123456789012345678901234',
    nickname: 'NFT收藏家',
    reputation: 45,
    voteCount: 98,
    registeredAt: Date.now() - 86400000 * 15,
    isVerified: true,
    trend: 'up'
  }
])

// 计算属性
const filteredUsers = computed(() => {
  let filtered = [...users.value]

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.address.toLowerCase().includes(query) ||
      user.nickname.toLowerCase().includes(query)
    )
  }

  // Tab 过滤
  switch (selectedTab.value) {
    case 'positive':
      filtered = filtered.filter(user => user.reputation > 0)
      break
    case 'rising':
      filtered = filtered.filter(user => user.trend === 'up')
      break
    case 'today':
      // 模拟今日活跃用户
      filtered = filtered.filter(user => Math.random() > 0.5)
      break
  }

  // 排序
  switch (selectedSort.value) {
    case 'reputation_desc':
      filtered.sort((a, b) => b.reputation - a.reputation)
      break
    case 'reputation_asc':
      filtered.sort((a, b) => a.reputation - b.reputation)
      break
    case 'vote_count_desc':
      filtered.sort((a, b) => b.voteCount - a.voteCount)
      break
    case 'register_time_desc':
      filtered.sort((a, b) => b.registeredAt - a.registeredAt)
      break
  }

  return filtered
})

// 工具函数
const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}

const getInitials = (address: string) => {
  return address.slice(2, 4).toUpperCase()
}

const getRankingClass = (rank: number) => {
  if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
  if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black'
  if (rank === 3) return 'bg-gradient-to-r from-yellow-600 to-yellow-800 text-white'
  return 'bg-gray-600 text-white'
}

// 操作函数
const voteUser = async (address: string, value: number) => {
  try {
    // TODO: 调用智能合约进行投票
    console.log('投票:', address, value)
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新本地状态
    const user = users.value.find(u => u.address === address)
    if (user) {
      user.reputation += value
      user.voteCount += 1
    }
    
    alert(value > 0 ? '点赞成功！' : '点踩成功！')
  } catch (error) {
    console.error('投票失败:', error)
    alert('投票失败，请重试')
  }
}

const loadMore = async () => {
  loading.value = true
  
  // 模拟加载更多数据
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 这里应该从服务器获取更多数据
  // users.value.push(...newUsers)
  
  loading.value = false
  hasMore.value = false // 模拟没有更多数据
}

onMounted(() => {
  // 初始化数据加载
})

// SEO
useSeoMeta({
  title: '声誉排行榜 - DID-Fi DApp',
  description: '查看基于链上互评的用户声誉排行榜，发现值得信赖的社区成员',
})
</script>
