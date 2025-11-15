<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col items-center">
    <!-- 顶部学校信息 -->
    <div class="w-full pt-16 pb-8 px-6 flex flex-col items-center">
      <div class="w-16 h-16 rounded-full bg-white p-2 shadow-lg mb-3">
        <img src="https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/ea0052a763d64b39853f25b7d290718d.png~tplv-a9rns2rl98-24:720:720.png" 
             alt="校徽" 
             class="w-full h-full object-contain">
      </div>
      <h1 class="text-white text-xl font-bold">常州纺织服装职业技术学院</h1>
    </div>

    <!-- 注册表单卡片 -->
    <div class="w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl p-6 -mt-4 flex-grow">
      <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">注册</h2>
      
      <form @submit.prevent="handleRegister">
        <!-- 身份证上传区域 -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">上传身份证</label>
          <div class="grid grid-cols-2 gap-4">
            <!-- 身份证正面 -->
            <div class="relative border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                 @click="selectImage('front')">
              <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                     accept="image/*" @change="handleImageUpload($event, 'front')">
              <i class="fa fa-camera text-gray-400 text-xl mb-2"></i>
              <span class="text-sm text-gray-500">身份证正面</span>
              <img v-if="images.front" :src="images.front" class="absolute inset-0 w-full h-full object-cover rounded-md">
            </div>
            
            <!-- 身份证反面 -->
            <div class="relative border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                 @click="selectImage('back')">
              <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                     accept="image/*" @change="handleImageUpload($event, 'back')">
              <i class="fa fa-camera text-gray-400 text-xl mb-2"></i>
              <span class="text-sm text-gray-500">身份证反面</span>
              <img v-if="images.back" :src="images.back" class="absolute inset-0 w-full h-full object-cover rounded-md">
            </div>
          </div>
          <p v-if="errors.images" class="text-red-500 text-xs mt-1">{{ errors.images }}</p>
        </div>
        
        <!-- 姓名输入 -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-medium mb-2">姓名</label>
          <input type="text" id="name" v-model="form.name" 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                 placeholder="请输入姓名">
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>
        
        <!-- 身份证号输入 -->
        <div class="mb-4">
          <label for="idCard" class="block text-gray-700 font-medium mb-2">身份证号</label>
          <input type="text" id="idCard" v-model="form.idCard" 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                 placeholder="请输入身份证号">
          <p v-if="errors.idCard" class="text-red-500 text-xs mt-1">{{ errors.idCard }}</p>
        </div>
        
        <!-- 性别选择 -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">性别</label>
          <div class="flex space-x-6">
            <label class="inline-flex items-center cursor-pointer">
              <input type="radio" value="男" v-model="form.gender" 
                     class="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4">
              <span class="ml-2 text-gray-700">男</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input type="radio" value="女" v-model="form.gender" 
                     class="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4">
              <span class="ml-2 text-gray-700">女</span>
            </label>
          </div>
        </div>
        
        <!-- 密码输入 -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">登录密码</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" 
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                   placeholder="请设置登录密码">
            <button type="button" @click="showPassword = !showPassword" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i class="fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>
        
        <!-- 确认密码 -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 font-medium mb-2">确认密码</label>
          <input type="password" id="confirmPassword" v-model="form.confirmPassword" 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                 placeholder="请再次输入密码">
          <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
        </div>
        
        <!-- 注册按钮 -->
        <button type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                :disabled="isSubmitting">
          <span v-if="!isSubmitting">完成注册</span>
          <span v-if="isSubmitting" class="flex items-center">
            <i class="fa fa-spinner fa-spin mr-2"></i> 注册中...
          </span>
        </button>
        
        <!-- 前往登录 -->
        <button type="button" @click="goToLogin"
                class="w-full mt-4 border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all">
          前往登录
        </button>
      </form>
    </div>
    
    <!-- 底部空白区域 -->
    <div class="h-8"></div>
    
    <!-- 成功提示 -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 max-w-sm w-full transform transition-all animate-bounce-in">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-check text-green-500 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">注册成功</h3>
          <p class="text-gray-600 mb-6">您已成功完成注册，请登录系统</p>
          <button @click="showSuccess = false; goToLogin()" 
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
            前往登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 路由实例
const router = useRouter();

// 表单数据
const form = reactive({
  name: '',
  idCard: '',
  gender: '男',
  password: '',
  confirmPassword: ''
});

// 图片预览
const images = reactive({
  front: null,
  back: null
});

// 图片文件
const imageFiles = reactive({
  front: null,
  back: null
});

// 状态管理
const showPassword = ref(false);
const isSubmitting = ref(false);
const showSuccess = ref(false);
const errors = reactive({
  name: '',
  idCard: '',
  password: '',
  confirmPassword: '',
  images: ''
});

// 选择图片
const selectImage = (type) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => handleImageUpload(e, type);
  input.click();
};

// 处理图片上传
const handleImageUpload = (e, type) => {
  const file = e.target.files[0];
  if (file) {
    // 验证图片大小
    if (file.size > 5 * 1024 * 1024) {
      errors.images = '图片大小不能超过5MB';
      return;
    }
    
    // 预览图片
    const reader = new FileReader();
    reader.onload = (event) => {
      images[type] = event.target.result;
    };
    reader.readAsDataURL(file);
    
    // 保存文件
    imageFiles[type] = file;
    
    // 清除错误
    if (images.front && images.back) {
      errors.images = '';
    }
  }
};

// 表单验证
const validateForm = () => {
  let isValid = true;
  errors.name = '';
  errors.idCard = '';
  errors.password = '';
  errors.confirmPassword = '';
  errors.images = '';
  
  // 验证姓名
  if (!form.name.trim()) {
    errors.name = '请输入姓名';
    isValid = false;
  }
  
  // 验证身份证号
  if (!form.idCard.trim()) {
    errors.idCard = '请输入身份证号';
    isValid = false;
  } else if (!/^\d{17}[\dXx]$/.test(form.idCard.trim())) {
    errors.idCard = '请输入有效的身份证号';
    isValid = false;
  }
  
  // 验证密码
  if (!form.password) {
    errors.password = '请设置登录密码';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于6位';
    isValid = false;
  }
  
  // 验证确认密码
  if (!form.confirmPassword) {
    errors.confirmPassword = '请再次输入密码';
    isValid = false;
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = '两次输入的密码不一致';
    isValid = false;
  }
  
  // 验证身份证图片
  if (!images.front || !images.back) {
    errors.images = '请上传身份证正反面照片';
    isValid = false;
  }
  
  return isValid;
};

// 处理注册
const handleRegister = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  try {
    // 创建FormData对象
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('idCard', form.idCard);
    formData.append('gender', form.gender);
    formData.append('password', form.password);
    formData.append('idCardFront', imageFiles.front);
    formData.append('idCardBack', imageFiles.back);
    
    // 调用注册接口
    const response = await axios.post('/api/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.success) {
      showSuccess.value = true;
    } else {
      alert(response.data.message || '注册失败，请稍后重试');
    }
  } catch (error) {
    console.error('注册失败:', error);
    alert('注册失败，请检查网络连接或稍后重试');
  } finally {
    isSubmitting.value = false;
  }
};

// 前往登录页面
const goToLogin = () => {
  router.push('/');
};
</script>

<style scoped>
/* 动画效果 */
@keyframes bounce-in {
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-bounce-in {
  animation: bounce-in 0.3s ease-out forwards;
}
.w-full{
  width: 94%;
}
</style>