<template>
  <div class="student-center">
    <!-- 顶部欢迎区域 -->
    <div class="welcome-bar">
      <div class="welcome-info">
        <h2 class="welcome-text">Hi, {{ userInfo.name }}同学</h2>
        <p class="welcome-desc">欢迎访问常州纺织服装职业技术学院</p>
      </div>
      <div class="avatar-container">
        <van-image 
          round 
          :src="userInfo.avatar || defaultAvatar" 
          alt="用户头像"
          class="avatar"
          @click="handleAvatarClick"
        />
      </div>
    </div>

    <!-- 功能列表 -->
    <van-list class="function-list" v-if="!loading">
      <van-cell 
        v-for="(item, index) in functionItems" 
        :key="index"
        :title="item.title"
        :label="item.desc"
        :icon="item.icon"
        is-link
        @click="handleFunctionClick(item)"
        class="function-item"
      />
    </van-list>

    <!-- 加载状态 -->
    <van-loading v-if="loading" class="loading" type="spinner" color="#1677ff" />

    <!-- 错误提示 -->
    <van-empty 
      v-if="error" 
      description="获取数据失败，请重试"
      class="error-empty"
    >
      <van-button type="primary" @click="fetchUserInfo">重新加载</van-button>
    </van-empty>

    <!-- 退出登录确认弹窗 -->
    <van-dialog
      v-model:show="showLogoutDialog"
      title="确认退出"
      message="确定要退出登录吗？"
      show-cancel-button
      @confirm="handleLogout"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { List, Cell, Image, Loading, Empty, Dialog, Button } from 'vant';
import 'vant/lib/index.css';

// 路由实例
const router = useRouter();

// 状态管理
const loading = ref(true);
const error = ref(false);
const showLogoutDialog = ref(false);
const defaultAvatar = 'https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/4b82b848c57b4676bd9ee921b52e608a.png~tplv-a9rns2rl98-24:720:720.png';

// 用户信息
const userInfo = reactive({
  name: '',
  avatar: ''
});

// 功能列表数据
const functionItems = reactive([
  {
    title: '报名详情',
    desc: '',
    icon: 'user-o',
    path: '/enrollment-details'
  },
  {
    title: '缴费',
    desc: '缴费时间 2025-03-06 00:00:00 - 2025-06-30 00:00:00',
    icon: 'balance-o',
    path: '/payment'
  },
  {
    title: '成绩查询',
    desc: '查询时间 2025-03-06 00:00:00 - 2025-06-30 00:00:00',
    icon: 'file-text-o',
    path: '/score-query'
  },
  {
    title: '预录取查询',
    desc: '查询时间 2025-03-06 00:00:00 - 2025-06-30 00:00:00',
    icon: 'chart-trending-o',
    path: '/admission-query'
  },
  {
    title: '打印准考证',
    desc: '',
    icon: 'printer-o',
    path: '/print-ticket'
  },
  {
    title: '退出登录',
    desc: '',
    icon: 'logout',
    path: 'logout'
  }
]);

// 获取用户信息
const fetchUserInfo = async () => {
  loading.value = true;
  error.value = false;
  
  try {
    // 调用获取用户信息接口
    const response = await axios.get('/api/user/info');
    if (response.data.success) {
      userInfo.name = response.data.data.name || '同学';
      userInfo.avatar = response.data.data.avatar;
    } else {
      throw new Error(response.data.message || '获取用户信息失败');
    }
  } catch (err) {
    console.error('获取用户信息失败:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// 处理功能项点击
const handleFunctionClick = (item) => {
  if (item.path === 'logout') {
    // 退出登录
    showLogoutDialog.value = true;
  } else {
    // 跳转到对应页面
    router.push(item.path);
  }
};

// 处理退出登录
const handleLogout = async () => {
  try {
    // 调用退出登录接口
    await axios.post('/api/logout');
    // 清除本地存储的token
    localStorage.removeItem('token');
    // 跳转到登录页
    router.push('/login');
  } catch (err) {
    console.error('退出登录失败:', err);
    Dialog.alert({
      message: '退出登录失败，请重试'
    });
  }
};

// 处理头像点击
const handleAvatarClick = () => {
  router.push('/profile');
};

// 页面加载时获取用户信息
onMounted(() => {
  // 检查是否已登录
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  
  fetchUserInfo();
});
</script>

<style scoped>
.student-center {
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 欢迎区域样式 */
.welcome-bar {
  background: linear-gradient(135deg, #409eff, #69b1ff);
  padding: 30px 16px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.welcome-info {
  padding-bottom: 5px;
}

.welcome-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}

.welcome-desc {
  font-size: 14px;
  opacity: 0.9;
}

.avatar-container {
  margin-bottom: -25px;
}

.avatar {
  width: 50px;
  height: 50px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 功能列表样式 */
.function-list {
  margin-top: 30px;
  background-color: transparent;
}

.function-item {
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 加载状态样式 */
.loading {
  margin: 50px auto;
  display: block;
}

/* 错误提示样式 */
.error-empty {
  padding-top: 50px;
}
</style>