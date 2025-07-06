<template>
  <div class="app-layout">
    <!-- Global Notifications -->
    <NuxtRouteAnnouncer />
    
    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900/80 backdrop-blur-md border-t border-white/10 py-8">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div class="text-xl font-bold text-white">DID-Fi</div>
                <div class="text-xs text-gray-400 -mt-1">DApp</div>
              </div>
            </div>
            <p class="text-gray-400 text-sm">
              去中心化身份金融应用，为您提供安全、透明的区块链服务。
            </p>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-white font-semibold mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  首页
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  仪表板
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/profile" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  个人资料
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <!-- Resources -->
          <div>
            <h3 class="text-white font-semibold mb-4">资源</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  文档
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  API 参考
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  社区
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  支持
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Connect -->
          <div>
            <h3 class="text-white font-semibold mb-4">联系我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Copyright -->
        <div class="border-t border-white/10 mt-8 pt-8 text-center">
          <p class="text-gray-400 text-sm">
            &copy; 2025 DID-Fi DApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Global app configuration
</script>

<style>
/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* Firefox scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) rgba(0, 0, 0, 0.1);
}
</style>
