<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    
    <div class="container mx-auto px-6 py-8 pt-24">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">🧾 DID 身份系统</h1>
        <p class="text-gray-300 text-lg">注册和管理您的去中心化身份</p>
      </div>

      <!-- 连接钱包提示 -->
      <div v-if="!walletStore.isConnected" class="text-center py-16">
        <div class="w-24 h-24 bg-blue-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">请先连接钱包</h3>
        <p class="text-gray-400 mb-8">连接您的钱包以注册或管理 DID 身份</p>
        <WalletConnector />
      </div>

      <!-- DID 主要内容 -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- 左侧：身份状态 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 当前身份卡片 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">当前身份状态</h3>
            
            <div v-if="didInfo.isRegistered" class="space-y-4">
              <!-- 已注册状态 -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div class="text-white font-medium">DID 已注册</div>
                  <div class="text-gray-400 text-sm">{{ formatDate(didInfo.registeredAt) }}</div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">昵称</span>
                  <span class="text-white">{{ didInfo.nickname || '未设置' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">IPFS 元数据</span>
                  <span class="text-cyan-400 text-sm">{{ didInfo.metadataURI ? '已设置' : '未设置' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">公开可见</span>
                  <span class="text-green-400 text-sm">是</span>
                </div>
              </div>

              <NuxtLink
                :to="`/user/${walletStore.address.value}`"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                查看我的主页
              </NuxtLink>
            </div>

            <div v-else class="text-center py-6">
              <!-- 未注册状态 -->
              <div class="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 class="text-white font-medium mb-2">尚未注册 DID</h4>
              <p class="text-gray-400 text-sm mb-4">注册后可设置昵称和个人信息</p>
            </div>
          </div>

          <!-- DID 优势 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">DID 身份优势</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-gray-300 text-sm">链上身份认证</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-gray-300 text-sm">跨平台身份通用</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-gray-300 text-sm">隐私自主控制</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-gray-300 text-sm">声誉积累可见</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：注册/编辑表单 -->
        <div class="lg:col-span-2">
          <!-- 注册 DID 表单 -->
          <div v-if="!didInfo.isRegistered" class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-6">注册 DID 身份</h3>
            
            <form @submit.prevent="registerDID" class="space-y-6">
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">昵称 *</label>
                <input 
                  v-model="form.nickname"
                  type="text" 
                  required
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="输入您的昵称（3-20字符）"
                  maxlength="20"
                />
              </div>

              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">个人简介</label>
                <textarea 
                  v-model="form.bio"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
                  rows="4"
                  placeholder="简单介绍一下自己..."
                  maxlength="200"
                ></textarea>
                <div class="text-right text-gray-500 text-xs mt-1">{{ form.bio.length }}/200</div>
              </div>

              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">个人链接</label>
                <div class="space-y-3">
                  <div v-for="(link, index) in form.links" :key="index" class="flex gap-3">
                    <input 
                      v-model="link.title"
                      type="text" 
                      class="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                      placeholder="链接标题"
                    />
                    <input 
                      v-model="link.url"
                      type="url" 
                      class="flex-2 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                      placeholder="https://..."
                    />
                    <button 
                      type="button"
                      @click="removeLink(index)"
                      class="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addLink"
                    class="w-full border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-xl py-3 text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    添加链接
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">技能标签</label>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span 
                    v-for="(tag, index) in form.tags" 
                    :key="index"
                    class="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30 flex items-center gap-2"
                  >
                    {{ tag }}
                    <button 
                      type="button"
                      @click="removeTag(index)"
                      class="text-cyan-400 hover:text-cyan-300"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input 
                    v-model="newTag"
                    type="text" 
                    @keyup.enter="addTag"
                    class="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="输入标签后按回车"
                    maxlength="20"
                  />
                  <button 
                    type="button"
                    @click="addTag"
                    class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>

              <div class="flex gap-4 pt-4">
                <button 
                  type="submit"
                  :disabled="!form.nickname || registering"
                  class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  <svg v-if="registering" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ registering ? '注册中...' : '注册 DID 身份' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- 编辑 DID 表单 -->
          <div v-else class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-white">编辑 DID 信息</h3>
              <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">已注册</span>
            </div>
            
            <form @submit.prevent="updateDID" class="space-y-6">
              <!-- 与注册表单相同的字段，但预填充现有数据 -->
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">昵称 *</label>
                <input 
                  v-model="form.nickname"
                  type="text" 
                  required
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="输入您的昵称（3-20字符）"
                  maxlength="20"
                />
              </div>

              <!-- 其他字段类似... -->
              
              <div class="flex gap-4 pt-4">
                <button 
                  type="submit"
                  :disabled="updating"
                  class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg v-if="updating" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ updating ? '更新中...' : '更新信息' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useWallet } from '~/composables/useWallet'

// 钱包状态
const walletStore = useWallet()

// DID 信息状态
const didInfo = reactive({
  isRegistered: false,
  nickname: '',
  bio: '',
  links: [] as Array<{ title: string; url: string }>,
  tags: [] as string[],
  metadataURI: '',
  registeredAt: Date.now()
})

// 表单状态
const form = reactive({
  nickname: '',
  bio: '',
  links: [{ title: '', url: '' }],
  tags: [] as string[]
})

// 操作状态
const registering = ref(false)
const updating = ref(false)
const newTag = ref('')

// 工具函数
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const addLink = () => {
  form.links.push({ title: '', url: '' })
}

const removeLink = (index: number) => {
  form.links.splice(index, 1)
}

const addTag = () => {
  if (newTag.value.trim() && !form.tags.includes(newTag.value.trim()) && form.tags.length < 10) {
    form.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.tags.splice(index, 1)
}

// 主要操作函数
const registerDID = async () => {
  try {
    registering.value = true
    
    // TODO: 调用智能合约注册 DID
    console.log('注册 DID:', form)
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 更新状态
    didInfo.isRegistered = true
    didInfo.nickname = form.nickname
    didInfo.bio = form.bio
    didInfo.links = form.links.filter(link => link.title && link.url)
    didInfo.tags = [...form.tags]
    didInfo.registeredAt = Date.now()
    
    // 显示成功消息
    alert('DID 注册成功！')
    
  } catch (error) {
    console.error('注册失败:', error)
    alert('注册失败，请重试')
  } finally {
    registering.value = false
  }
}

const updateDID = async () => {
  try {
    updating.value = true
    
    // TODO: 调用智能合约更新 DID
    console.log('更新 DID:', form)
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 更新本地状态
    didInfo.nickname = form.nickname
    didInfo.bio = form.bio
    didInfo.links = form.links.filter(link => link.title && link.url)
    didInfo.tags = [...form.tags]
    
    alert('信息更新成功！')
    
  } catch (error) {
    console.error('更新失败:', error)
    alert('更新失败，请重试')
  } finally {
    updating.value = false
  }
}

const loadDIDInfo = async () => {
  if (!walletStore.address.value) return
  
  try {
    // TODO: 从智能合约加载 DID 信息
    // 模拟已注册用户
    const isRegistered = Math.random() > 0.5
    
    if (isRegistered) {
      didInfo.isRegistered = true
      didInfo.nickname = 'Demo User'
      didInfo.bio = '这是一个演示用户'
      didInfo.links = [
        { title: '我的博客', url: 'https://example.com' }
      ]
      didInfo.tags = ['Web3', 'Blockchain']
      didInfo.registeredAt = Date.now() - 86400000 * 7 // 7天前
      
      // 预填充表单
      form.nickname = didInfo.nickname
      form.bio = didInfo.bio
      form.links = [...didInfo.links, { title: '', url: '' }]
      form.tags = [...didInfo.tags]
    }
  } catch (error) {
    console.error('加载 DID 信息失败:', error)
  }
}

onMounted(() => {
  if (walletStore.isConnected.value) {
    loadDIDInfo()
  }
})

// SEO
useSeoMeta({
  title: 'DID 身份系统 - DID-Fi DApp',
  description: '注册和管理您的去中心化身份，设置昵称、个人信息和技能标签',
})
</script>
