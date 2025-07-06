<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative container mx-auto px-6 text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          DID-Fi
          <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            DApp
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          去中心化身份 + 声誉系统 + 打赏经济<br>
          <span class="text-lg text-cyan-300">链上身份认证 · 信用互评 · 价值激励</span>
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink 
            to="/did"
            class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            注册 DID 身份
          </NuxtLink>
          
          <WalletConnector class="transform hover:scale-105 transition-all duration-300" />
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-cyan-500 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-bounce"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white/5 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center text-white mb-4">三大核心模块</h2>
        <p class="text-center text-gray-400 mb-16">构建可信的去中心化社交经济生态</p>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- DID 身份系统 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-cyan-500/20">
            <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">🧾 DID 身份系统</h3>
            <p class="text-gray-300 leading-relaxed mb-6">
              使用钱包地址注册链上身份，设置昵称和个人信息，让您的链上活动更具人格化
            </p>
            <div class="space-y-2 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>链上身份注册</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>IPFS 元数据存储</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>身份信息公开查询</span>
              </div>
            </div>
          </div>

          <!-- 声誉系统 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-purple-500/20">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">🌟 声誉系统</h3>
            <p class="text-gray-300 leading-relaxed mb-6">
              基于链上互评的信用体系，通过点赞点踩建立可信的社区声誉排名
            </p>
            <div class="space-y-2 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>点赞/点踩评价</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>防刷机制保护</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>实时声誉排行榜</span>
              </div>
            </div>
          </div>

          <!-- 打赏系统 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-yellow-500/20">
            <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">💰 打赏系统</h3>
            <p class="text-gray-300 leading-relaxed mb-6">
              基于 ERC20 代币的价值激励体系，支持打赏、附言和统计功能
            </p>
            <div class="space-y-2 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>ERC20 代币打赏</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>打赏附言功能</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>收入统计与提现</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-white mb-12">项目进展</h2>
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="group">
            <div class="text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              3
            </div>
            <div class="text-gray-300">核心模块</div>
            <div class="text-sm text-gray-500 mt-1">DID·声誉·打赏</div>
          </div>
          <div class="group">
            <div class="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div class="text-gray-300">前端完成度</div>
            <div class="text-sm text-gray-500 mt-1">UI/UX 设计</div>
          </div>
          <div class="group">
            <div class="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              链上
            </div>
            <div class="text-gray-300">智能合约</div>
            <div class="text-sm text-gray-500 mt-1">开发中</div>
          </div>
          <div class="group">
            <div class="text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              Beta
            </div>
            <div class="text-gray-300">当前版本</div>
            <div class="text-sm text-gray-500 mt-1">v0.1.0</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="py-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4">体验演示</h2>
        <p class="text-gray-300 text-lg">查看用户主页功能展示</p>
      </div>
      
      <div class="max-w-md mx-auto">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">演示用户</h3>
            <p class="text-gray-400 text-sm mb-4">Solidity 开发者</p>
            <NuxtLink
              to="/user/0x1234567890123456789012345678901234567890"
              class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              查看用户主页
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-sm">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">准备建立您的链上身份？</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          加入 DID-Fi 生态，体验去中心化身份、声誉系统和价值激励的完美结合
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/did"
            class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            注册 DID 身份
          </NuxtLink>
          <NuxtLink 
            to="/reputation"
            class="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            查看声誉排行
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'DID-Fi DApp - 去中心化身份 · 声誉系统 · 打赏经济',
  meta: [
    { name: 'description', content: '基于区块链的去中心化身份认证、声誉互评和价值激励平台，构建可信的链上社交经济生态' },
    { name: 'keywords', content: 'DID, 去中心化身份, 声誉系统, 打赏, Web3, 区块链, DeFi' }
  ]
})
</script>

<style scoped>
/* Additional animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
