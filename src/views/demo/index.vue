<!-- <script setup name="Demo">
import { reactive } from "vue";

const contentList = reactive([
  "✔ ⚡ Vue3 + Vite4",
  "✔ ✨ Vant4 组件库",
  "✔ 🌀 Tailwindcss 原子类框架",
  "✔ 🍍 Pinia 状态管理",
  "✔ 🌓 支持深色模式",
  "✔ Vue-router 4",
  "✔ 支持 SVG 图标自动注册组件",
  "✔ vmin 视口适配",
  "✔ Axios 封装",
  "✔ 打包资源 gzip 压缩",
  "✔ 开发环境支持 Mock 数据",
  "✔ ESLint",
  "✔ 首屏加载动画",
  "✔ 开发环境调试面板"
]);
</script> -->

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 flex flex-col items-center py-8 px-4">
    <!-- 学校Logo和名称 -->
    <div class="flex flex-col items-center mb-10">
      <div class="w-20 h-20 rounded-full bg-white p-2 mb-3 shadow-md">
        <img src="https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/8d581ffb359a40cfa56b9718130d1016.png~tplv-a9rns2rl98-24:720:720.png?rcl=202511141556074BC8AE7E5DDE08F6C63A&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1763711768&x-signature=rlVflfHEzBBagBRuaJTpY5bRbS8%3D" 
             alt="校徽" 
             class="w-full h-full object-contain">
      </div>
      <h1 class="text-white text-xl font-semibold">常州纺织服装职业技术学院</h1>
    </div>

    <!-- 登录卡片 -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 class="text-2xl font-bold text-center mb-8">考生登录</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- 身份证号输入 -->
        <div>
          <label for="idCard" class="block text-gray-700 mb-2 text-sm">身份证号</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              id="idCard" 
              v-model="form.idCard"
              :class="{'border-red-500': errors.idCard}"
              class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="请输入身份证号"
            >
          </div>
          <p v-if="errors.idCard" class="text-red-500 text-xs mt-1">{{ errors.idCard }}</p>
        </div>

        <!-- 密码输入 -->
        <div>
          <label for="password" class="block text-gray-700 mb-2 text-sm">密码</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="form.password"
              :class="{'border-red-500': errors.password}"
              class="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="请输入密码"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 8l-6 6 6 6V8z" />
                <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l-1.5 1.5L14 8" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <!-- 找回密码 -->
        <div class="text-right">
          <button 
            type="button" 
            @click="handleForgotPassword"
            class="text-blue-500 hover:text-blue-700 text-sm transition-colors"
          >
            找回密码
          </button>
        </div>

        <!-- 登录按钮 -->
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="!isLoading">登录</span>
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            登录中...
          </span>
        </button>

        <!-- 注册按钮 -->
        <button 
          type="button" 
          @click="handleRegister"
          class="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 rounded-lg font-medium transition-all"
        >
          前往注册
        </button>
      </form>
    </div>

    <!-- 错误提示弹窗 -->
    <div v-if="showError" class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup name="Demo">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 路由实例
const router = useRouter();

// 表单数据
const form = reactive({
  idCard: '',
  password: ''
});

// 状态管理
const showPassword = ref(false);
const isLoading = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const errors = reactive({
  idCard: '',
  password: ''
});

// 表单验证
const validateForm = () => {
  let isValid = true;
  errors.idCard = '';
  errors.password = '';

  // 身份证号验证 (简单验证18位数字)
  const idCardReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!form.idCard) {
    errors.idCard = '请输入身份证号';
    isValid = false;
  } else if (!idCardReg.test(form.idCard)) {
    errors.idCard = '请输入有效的18位身份证号';
    isValid = false;
  }

  // 密码验证
  if (!form.password) {
    errors.password = '请输入密码';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于6位';
    isValid = false;
  }

  return isValid;
};

// 显示错误信息
const showErrorMessage = (message) => {
  errorMessage.value = message;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 3000);
};

// 登录处理
const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    
    // 调用登录接口
    const response = await axios.post('/api/student/login', {
      idCard: form.idCard,
      password: form.password
    });

    // 登录成功处理
    if (response.data.code === 200) {
      // 存储token和用户信息
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
      
      // 跳转到首页
      router.push('/home');
    } else {
      showErrorMessage(response.data.message || '登录失败，请重试');
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    showErrorMessage(error.response?.data?.message || '网络异常，请稍后重试');
  } finally {
    isLoading.value = false;
  }
};

// 找回密码
const handleForgotPassword = () => {
  router.push('/forgot-password');
};

// 前往注册
const handleRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
/* 动画效果 */
@keyframes slideUp {
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}
</style>