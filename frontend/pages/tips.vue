<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <TheNavbar />
    
    <div class="container mx-auto px-6 py-8 pt-24">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">💰 打赏广场</h1>
        <p class="text-gray-300 text-lg">发现值得支持的创作者，参与价值激励生态</p>
      </div>

      <!-- 统计概览 -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.totalAmount }}</div>
              <div class="text-gray-400 text-sm">总打赏金额</div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.totalTips }}</div>
              <div class="text-gray-400 text-sm">打赏次数</div>
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
              <div class="text-2xl font-bold text-white">{{ stats.activeCreators }}</div>
              <div class="text-gray-400 text-sm">活跃创作者</div>
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
              <div class="text-2xl font-bold text-white">{{ stats.todayTips }}</div>
              <div class="text-gray-400 text-sm">今日打赏</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区 -->
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- 左侧：筛选选项 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 快速打赏 -->
          <div v-if="walletStore.isConnected" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">快速打赏</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm mb-2">收款地址</label>
                <input 
                  v-model="quickTip.address"
                  type="text" 
                  placeholder="0x..."
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label class="block text-gray-300 text-sm mb-2">金额 (USDT)</label>
                <input 
                  v-model="quickTip.amount"
                  type="number" 
                  step="0.01"
                  placeholder="10.00"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label class="block text-gray-300 text-sm mb-2">附言</label>
                <textarea 
                  v-model="quickTip.message"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none text-sm"
                  rows="3"
                  placeholder="说点什么..."
                ></textarea>
              </div>
              <button 
                @click="sendQuickTip"
                :disabled="!quickTip.address || !quickTip.amount || sending"
                class="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 disabled:cursor-not-allowed"
              >
                {{ sending ? '发送中...' : '立即打赏' }}
              </button>
            </div>
          </div>

          <!-- 筛选选项 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">筛选条件</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm mb-2">时间范围</label>
                <select 
                  v-model="filters.timeRange"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">全部时间</option>
                  <option value="today">今天</option>
                  <option value="week">本周</option>
                  <option value="month">本月</option>
                </select>
              </div>
              
              <div>
                <label class="block text-gray-300 text-sm mb-2">金额范围</label>
                <select 
                  v-model="filters.amountRange"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">全部金额</option>
                  <option value="small">1-10 USDT</option>
                  <option value="medium">10-100 USDT</option>
                  <option value="large">100+ USDT</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-300 text-sm mb-2">排序方式</label>
                <select 
                  v-model="filters.sortBy"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="time_desc">最新时间</option>
                  <option value="amount_desc">金额降序</option>
                  <option value="amount_asc">金额升序</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 热门创作者 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">热门创作者</h3>
            <div class="space-y-3">
              <div v-for="creator in topCreators" :key="creator.address" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{{ getInitials(creator.address) }}</span>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-medium">{{ creator.nickname }}</div>
                  <div class="text-gray-400 text-xs">{{ creator.totalReceived }} USDT</div>
                </div>
                <NuxtLink
                  :to="`/user/${creator.address}`"
                  class="text-cyan-400 hover:text-cyan-300 text-xs"
                >
                  查看
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：打赏记录 -->
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
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- 打赏记录列表 -->
          <div class="space-y-4">
            <div 
              v-for="tip in filteredTips" 
              :key="`${tip.from}-${tip.to}-${tip.timestamp}`"
              class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div class="flex items-start gap-4">
                <!-- 打赏人头像 -->
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold">{{ getInitials(tip.from) }}</span>
                  </div>
                </div>

                <!-- 主要内容 -->
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-white font-medium">{{ tip.fromNickname || formatAddress(tip.from) }}</span>
                    <span class="text-gray-400">打赏了</span>
                    <span class="text-white font-medium">{{ tip.toNickname || formatAddress(tip.to) }}</span>
                  </div>
                  
                  <div class="flex items-center gap-4 mb-3">
                    <div class="flex items-center gap-1">
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-yellow-400 font-bold text-lg">{{ tip.amount }} USDT</span>
                    </div>
                    <span class="text-gray-400 text-sm">{{ formatTimeAgo(tip.timestamp) }}</span>
                  </div>

                  <div v-if="tip.message" class="bg-gray-800/50 rounded-lg p-3 mb-3">
                    <p class="text-gray-300 text-sm italic">"{{ tip.message }}"</p>
                  </div>

                  <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span>交易哈希: {{ formatTxHash(tip.txHash) }}</span>
                    <a 
                      :href="`https://etherscan.io/tx/${tip.txHash}`" 
                      target="_blank"
                      class="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      查看交易
                    </a>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex-shrink-0 flex flex-col gap-2">
                  <NuxtLink
                    :to="`/user/${tip.to}`"
                    class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    查看收款人
                  </NuxtLink>
                  <button 
                    v-if="walletStore.isConnected && walletStore.address.value !== tip.to"
                    @click="tipUser(tip.to)"
                    class="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    我也打赏
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
              class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {{ loading ? '加载中...' : '加载更多' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 打赏弹窗 -->
    <div v-if="showTipModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showTipModal = false">
      <div class="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4" @click.stop>
        <h3 class="text-xl font-bold text-white mb-4">打赏用户</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-300 text-sm mb-2">收款地址</label>
            <div class="bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm">
              {{ formatAddress(tipModal.address) }}
            </div>
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-2">打赏金额 (USDT)</label>
            <input 
              v-model="tipModal.amount" 
              type="number" 
              step="0.01"
              class="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
              placeholder="输入打赏金额"
            />
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-2">附言 (可选)</label>
            <textarea 
              v-model="tipModal.message" 
              class="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white resize-none"
              rows="3"
              placeholder="说点什么..."
            ></textarea>
          </div>
          <div class="flex gap-3">
            <button 
              @click="showTipModal = false"
              class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
            >
              取消
            </button>
            <button 
              @click="confirmTip"
              class="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-colors"
            >
              确认打赏
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
const selectedTab = ref('all')
const loading = ref(false)
const hasMore = ref(true)
const sending = ref(false)

// 统计数据
const stats = reactive({
  totalAmount: '12,456',
  totalTips: 3456,
  activeCreators: 234,
  todayTips: 89
})

// 筛选条件
const filters = reactive({
  timeRange: 'all',
  amountRange: 'all',
  sortBy: 'time_desc'
})

// 快速打赏表单
const quickTip = reactive({
  address: '',
  amount: '',
  message: ''
})

// 打赏弹窗
const showTipModal = ref(false)
const tipModal = reactive({
  address: '',
  amount: '',
  message: ''
})

// Tab 选项
const tabs = [
  { value: 'all', label: '全部打赏' },
  { value: 'large', label: '大额打赏' },
  { value: 'recent', label: '最新打赏' },
  { value: 'popular', label: '热门创作者' }
]

// 热门创作者
const topCreators = ref([
  {
    address: '0x1234567890123456789012345678901234567890',
    nickname: 'Solidity专家',
    totalReceived: '1,234'
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    nickname: 'Web3开发者',
    totalReceived: '987'
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    nickname: 'DeFi研究员',
    totalReceived: '756'
  }
])

// 打赏记录
const tips = ref([
  {
    from: '0x1111111111111111111111111111111111111111',
    fromNickname: 'Crypto爱好者',
    to: '0x1234567890123456789012345678901234567890',
    toNickname: 'Solidity专家',
    amount: '50.00',
    message: '感谢您的教程，受益良多！',
    timestamp: Date.now() - 3600000,
    txHash: '0xabc123def456789abc123def456789abc123def456789abc123def456789abc123'
  },
  {
    from: '0x2222222222222222222222222222222222222222',
    fromNickname: '',
    to: '0x2345678901234567890123456789012345678901',
    toNickname: 'Web3开发者',
    amount: '25.50',
    message: '继续加油！',
    timestamp: Date.now() - 7200000,
    txHash: '0xdef456789abc123def456789abc123def456789abc123def456789abc123def456'
  },
  {
    from: '0x3333333333333333333333333333333333333333',
    fromNickname: 'DeFi探索者',
    to: '0x3456789012345678901234567890123456789012',
    toNickname: 'DeFi研究员',
    amount: '100.00',
    message: '您的分析报告非常专业，谢谢分享！',
    timestamp: Date.now() - 10800000,
    txHash: '0x789abc123def456789abc123def456789abc123def456789abc123def456789abc'
  }
])

// 计算属性
const filteredTips = computed(() => {
  let filtered = [...tips.value]

  // Tab 过滤
  switch (selectedTab.value) {
    case 'large':
      filtered = filtered.filter(tip => parseFloat(tip.amount) >= 50)
      break
    case 'recent':
      filtered = filtered.filter(tip => tip.timestamp > Date.now() - 86400000)
      break
    case 'popular':
      // 按收款人分组，显示收款最多的
      const grouped = filtered.reduce((acc, tip) => {
        if (!acc[tip.to]) acc[tip.to] = []
        acc[tip.to].push(tip)
        return acc
      }, {} as Record<string, typeof tips.value>)
      
      const popularReceivers = Object.entries(grouped)
        .map(([address, tips]) => ({
          address,
          total: tips.reduce((sum, tip) => sum + parseFloat(tip.amount), 0),
          tips
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
      
      filtered = popularReceivers.flatMap(receiver => receiver.tips)
      break
  }

  // 排序
  switch (filters.sortBy) {
    case 'time_desc':
      filtered.sort((a, b) => b.timestamp - a.timestamp)
      break
    case 'amount_desc':
      filtered.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
      break
    case 'amount_asc':
      filtered.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))
      break
  }

  return filtered
})

// 工具函数
const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const formatTxHash = (hash: string) => {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

const formatTimeAgo = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小时前`
  if (minutes > 0) return `${minutes}分钟前`
  return '刚刚'
}

const getInitials = (address: string) => {
  return address.slice(2, 4).toUpperCase()
}

// 操作函数
const sendQuickTip = async () => {
  try {
    sending.value = true
    
    // TODO: 调用智能合约发送打赏
    console.log('快速打赏:', quickTip)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 添加到记录
    tips.value.unshift({
      from: walletStore.address.value || '',
      fromNickname: '我',
      to: quickTip.address,
      toNickname: '',
      amount: quickTip.amount,
      message: quickTip.message,
      timestamp: Date.now(),
      txHash: '0x' + Math.random().toString(16).substring(2, 66)
    })
    
    // 重置表单
    quickTip.address = ''
    quickTip.amount = ''
    quickTip.message = ''
    
    alert('打赏成功！')
  } catch (error) {
    console.error('打赏失败:', error)
    alert('打赏失败，请重试')
  } finally {
    sending.value = false
  }
}

const tipUser = (address: string) => {
  tipModal.address = address
  tipModal.amount = ''
  tipModal.message = ''
  showTipModal.value = true
}

const confirmTip = async () => {
  try {
    // TODO: 调用智能合约发送打赏
    console.log('打赏用户:', tipModal)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 添加到记录
    tips.value.unshift({
      from: walletStore.address.value || '',
      fromNickname: '我',
      to: tipModal.address,
      toNickname: '',
      amount: tipModal.amount,
      message: tipModal.message,
      timestamp: Date.now(),
      txHash: '0x' + Math.random().toString(16).substring(2, 66)
    })
    
    showTipModal.value = false
    alert('打赏成功！')
  } catch (error) {
    console.error('打赏失败:', error)
    alert('打赏失败，请重试')
  }
}

const loadMore = async () => {
  loading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 这里应该从服务器获取更多数据
  loading.value = false
  hasMore.value = false
}

onMounted(() => {
  // 初始化数据加载
})

// SEO
useSeoMeta({
  title: '打赏广场 - DID-Fi DApp',
  description: '发现值得支持的创作者，参与价值激励生态，查看最新打赏记录',
})
</script>
