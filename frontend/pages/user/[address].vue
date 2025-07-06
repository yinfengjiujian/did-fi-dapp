<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <TheNavbar />
    
    <div class="container mx-auto px-6 py-8 pt-24">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-300">加载用户信息中...</p>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-20">
        <div class="w-24 h-24 bg-red-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">{{ error }}</h3>
        <button 
          @click="loadUserProfile"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          重新加载
        </button>
      </div>

      <!-- 用户主页内容 -->
      <div v-else>
      <!-- 1️⃣ 头部：身份信息卡片 -->
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <!-- 头像区域 -->
          <div class="flex flex-col items-center lg:items-start">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-2">
              <img 
                v-if="userProfile.avatar" 
                :src="userProfile.avatar" 
                :alt="userProfile.nickname || 'User Avatar'"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <!-- 基本信息区域 -->
          <div class="flex-1 space-y-4">
            <!-- 昵称 -->
            <h1 class="text-xl font-bold text-white">
              {{ userProfile.nickname || '未设置昵称' }}
            </h1>
            
            <!-- 钱包地址 -->
            <div class="flex items-center gap-2">
              <span class="text-gray-300 text-sm">{{ formatAddress(userAddress) }}</span>
              <button 
                @click="copyAddress"
                class="p-1 hover:bg-white/10 rounded-lg transition-colors"
                :class="{ 'text-green-400': copied, 'text-gray-400': !copied }"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!copied" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>

            <!-- 注册时间 -->
            <div class="text-gray-400 text-sm">
              注册于 {{ formatRegistrationTime(userProfile.registeredAt) }}
            </div>

            <!-- 统计信息 -->
            <div class="flex flex-wrap gap-6">
              <!-- 声誉值 -->
              <div class="flex items-center gap-2">
                <span class="text-gray-300 text-sm">声誉值:</span>
                <span 
                  class="font-bold"
                  :class="userProfile.reputation >= 0 ? 'text-green-400' : 'text-red-400'"
                >
                  {{ userProfile.reputation > 0 ? '+' : '' }}{{ userProfile.reputation }}
                </span>
              </div>

              <!-- 累计打赏 -->
              <div class="flex items-center gap-2">
                <span class="text-gray-300 text-sm">累计打赏:</span>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-yellow-400 font-bold">{{ userProfile.totalReceived }} USDT</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 动态按钮区域 -->
          <div class="flex flex-col gap-3">
            <button 
              v-if="isOwnProfile"
              @click="editProfile"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              编辑资料
            </button>
            <template v-else>
              <button 
                @click="showTipModal = true"
                class="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clip-rule="evenodd" />
                </svg>
                打赏
              </button>
              <div class="flex gap-2">
                <button 
                  @click="voteUp"
                  class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  赞
                </button>
                <button 
                  @click="voteDown"
                  class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10H9a2 2 0 00-2 2v6a2 2 0 002 2h8" />
                  </svg>
                  踩
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- 2️⃣ 内容作品区（IPFS 内容或外链） -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 个人简介 -->
          <div v-if="userProfile.bio" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-3">个人简介</h3>
            <p class="text-gray-300 leading-relaxed">{{ userProfile.bio }}</p>
          </div>

          <!-- 链接列表 -->
          <div v-if="userProfile.links && userProfile.links.length > 0" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">作品链接</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <a 
                v-for="link in userProfile.links" 
                :key="link.url"
                :href="link.url" 
                target="_blank"
                class="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-gray-500 transition-all group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-white font-medium group-hover:text-cyan-400 transition-colors">{{ link.title }}</h4>
                    <p class="text-gray-400 text-sm truncate">{{ formatUrl(link.url) }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- 技能标签 -->
          <div v-if="userProfile.tags && userProfile.tags.length > 0" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">技能标签</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in userProfile.tags" 
                :key="tag"
                class="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- 3️⃣ 互动记录区（来自合约事件或 The Graph） -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 最近收到的打赏 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clip-rule="evenodd" />
              </svg>
              最近打赏
            </h3>
            <div class="space-y-3">
              <div 
                v-for="tip in recentTips" 
                :key="`${tip.from}-${tip.timestamp}`"
                class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl"
              >
                <div class="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{{ getInitials(tip.from) }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-white text-sm">{{ formatAddress(tip.from) }}</span>
                    <span class="text-yellow-400 font-bold text-sm">+{{ tip.amount }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-400">
                    <span>{{ formatTimeAgo(tip.timestamp) }}</span>
                  </div>
                  <p v-if="tip.message" class="text-gray-300 text-xs mt-1 italic">"{{ tip.message }}"</p>
                </div>
              </div>
              <div v-if="recentTips.length === 0" class="text-gray-400 text-sm text-center py-4">
                暂无打赏记录
              </div>
            </div>
          </div>

          <!-- 最近被点赞/点踩 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              最近评价
            </h3>
            <div class="space-y-3">
              <div 
                v-for="vote in recentVotes" 
                :key="`${vote.from}-${vote.timestamp}`"
                class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl"
              >
                <div class="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{{ getInitials(vote.from) }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-white text-sm">{{ formatAddress(vote.from) }}</span>
                    <span 
                      class="font-bold text-sm"
                      :class="vote.value > 0 ? 'text-green-400' : 'text-red-400'"
                    >
                      {{ vote.value > 0 ? '+1' : '-1' }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ formatTimeAgo(vote.timestamp) }}
                  </div>
                </div>
              </div>
              <div v-if="recentVotes.length === 0" class="text-gray-400 text-sm text-center py-4">
                暂无评价记录
              </div>
            </div>
          </div>

          <!-- 4️⃣ 其他可扩展功能区 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">更多信息</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-300 text-sm">ENS 域名</span>
                <span class="text-cyan-400 text-sm">{{ userProfile.ensName || '未设置' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300 text-sm">打赏排名</span>
                <span class="text-yellow-400 text-sm">#{{ userProfile.tipRanking || '--' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300 text-sm">声誉排名</span>
                <span class="text-green-400 text-sm">#{{ userProfile.reputationRanking || '--' }}</span>
              </div>
            </div>
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
            <label class="block text-gray-300 text-sm mb-2">打赏金额 (USDT)</label>
            <input 
              v-model="tipAmount" 
              type="number" 
              step="0.01"
              class="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
              placeholder="输入打赏金额"
            />
          </div>
          <div>
            <label class="block text-gray-300 text-sm mb-2">附言 (可选)</label>
            <textarea 
              v-model="tipMessage" 
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
              @click="sendTip"
              class="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-colors"
            >
              确认打赏
            </button>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWallet } from '~/composables/useWallet'
import { ethers } from 'ethers'

// 路由和钱包
const route = useRoute()
const walletStore = useWallet()

// 用户地址
const userAddress = computed(() => route.params.address as string)
const isOwnProfile = computed(() => {
  const currentAddress = walletStore.address.value
  const targetAddress = userAddress.value
  return currentAddress?.toLowerCase() === targetAddress?.toLowerCase()
})

// 用户资料数据
const userProfile = ref({
  nickname: '',
  avatar: '',
  bio: '',
  registeredAt: Date.now(),
  reputation: 0,
  totalReceived: 0,
  links: [] as Array<{ title: string; url: string }>,
  tags: [] as string[],
  ensName: '',
  tipRanking: null as number | null,
  reputationRanking: null as number | null
})

// 互动记录数据
const recentTips = ref([
  {
    from: '0x1234567890123456789012345678901234567890',
    amount: '10.00',
    message: '感谢分享的教程！',
    timestamp: Date.now() - 3600000
  },
  {
    from: '0x9876543210987654321098765432109876543210',
    amount: '5.50',
    message: '继续加油！',
    timestamp: Date.now() - 7200000
  }
])

const recentVotes = ref([
  {
    from: '0x1111111111111111111111111111111111111111',
    value: 1,
    timestamp: Date.now() - 1800000
  },
  {
    from: '0x2222222222222222222222222222222222222222',
    value: 1,
    timestamp: Date.now() - 3600000
  },
  {
    from: '0x3333333333333333333333333333333333333333',
    value: -1,
    timestamp: Date.now() - 5400000
  }
])

// 打赏弹窗
const showTipModal = ref(false)
const tipAmount = ref('')
const tipMessage = ref('')

// 复制地址功能
const copied = ref(false)
const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(userAddress.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 加载和错误状态
const loading = ref(true)
const error = ref('')

// 工具函数
const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const formatRegistrationTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long'
  })
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

const formatUrl = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// 操作函数
const editProfile = () => {
  // 跳转到编辑页面
  navigateTo('/profile')
}

const voteUp = async () => {
  // 调用声誉合约点赞
  console.log('点赞用户:', userAddress.value)
}

const voteDown = async () => {
  // 调用声誉合约点踩
  console.log('点踩用户:', userAddress.value)
}

const sendTip = async () => {
  // 调用打赏合约
  console.log('打赏用户:', userAddress.value, '金额:', tipAmount.value, '附言:', tipMessage.value)
  showTipModal.value = false
  tipAmount.value = ''
  tipMessage.value = ''
}

// 加载用户数据
const loadUserProfile = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 验证地址格式
    if (!userAddress.value || !ethers.isAddress(userAddress.value)) {
      throw new Error('无效的钱包地址')
    }
    
    // 模拟数据，实际应从合约和IPFS加载
    // TODO: 实际实现时从以下源加载数据：
    // 1. DIDRegistry 合约获取基础信息
    // 2. Reputation 合约获取声誉数据  
    // 3. TipContract 合约获取打赏统计
    // 4. IPFS 获取用户元数据
    // 5. The Graph 获取事件历史
    
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟加载延迟
    
    userProfile.value = {
      nickname: 'Solidity 开发者',
      avatar: '', // IPFS 头像URL
      bio: 'Solidity爱好者、教程创作者，专注于智能合约开发和DeFi应用构建',
      registeredAt: Date.now() - 86400000 * 30, // 30天前注册
      reputation: 15,
      totalReceived: 125.50,
      links: [
        { title: '我的博客', url: 'https://myblog.com' },
        { title: 'Solidity入门教程', url: 'ipfs://QmXXX' },
        { title: 'GitHub', url: 'https://github.com/myname' },
        { title: 'DeFi 项目演示', url: 'https://demo.defi.com' }
      ],
      tags: ['Solidity', 'Web3', 'Ethereum', 'DeFi', 'Smart Contracts'],
      ensName: 'developer.eth',
      tipRanking: 42,
      reputationRanking: 18
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载用户数据失败'
    console.error('加载用户数据失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUserProfile()
})

// SEO
useSeoMeta({
  title: computed(() => `${userProfile.value.nickname || '用户'} - DID-Fi DApp`),
  description: computed(() => userProfile.value.bio || '查看用户在DID-Fi DApp上的个人资料'),
})
</script>
