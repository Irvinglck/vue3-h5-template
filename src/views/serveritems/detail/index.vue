<template>
  <div class="enrollment-detail-page">
    <!-- 顶部导航栏（含返回按钮） -->
    <van-nav-bar 
      title="报名详情" 
      left-arrow 
      @click-left="handleBack"
      class="custom-nav-bar"
    />

    <!-- 原有装饰图区域（调整位置） -->
    <div class="decorate">
      <img src="https://picsum.photos/200/80?random=1" alt="装饰图" class="decorate-img" />
    </div>

    <!-- 详情卡片（保持不变） -->
    <van-card class="detail-card" :border="false">
      <van-cell-group>
        <van-cell title="姓名" :value="formData.name" />
        <van-cell title="身份证号" :value="formData.idCard" />
        <van-cell title="照片">
          <template #value>
            <van-image 
              :src="formData.photo" 
              alt="考生照片" 
              class="student-photo" 
              fit="cover"
              @error="handleImageError"
            />
          </template>
        </van-cell>
        <van-cell title="性别" :value="formData.gender" />
        <van-cell title="考生号" :value="formData.examNo" />
        <van-cell title="政治面貌" :value="formData.politicalStatus" />
        <van-cell title="毕业学校" :value="formData.graduatedSchool" />
        <van-cell title="联系电话" :value="formData.phone" />
        <van-cell title="家庭住址" :value="formData.address" />
        <van-cell title="报考专业" :value="formData.major" />
      </van-cell-group>
    </van-card>

    <!-- 加载状态和错误提示（保持不变） -->
    <van-loading v-if="loading" class="loading" type="spinner" color="#1677ff" />
    <van-empty 
      v-if="error" 
      description="获取报名详情失败，请重试"
    >
      <van-button type="primary" @click="fetchEnrollmentDetail">重新加载</van-button>
    </van-empty>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Cell, CellGroup, Card, Image, Loading, Empty, Button, NavBar } from 'vant';
import 'vant/lib/index.css';

const router = useRouter();
const loading = ref(true);
const error = ref(false);
const defaultPhoto = 'https://picsum.photos/100/100?random=2';

const formData = reactive({
  name: '',
  idCard: '',
  photo: defaultPhoto,
  gender: '',
  examNo: '',
  politicalStatus: '',
  graduatedSchool: '',
  phone: '',
  address: '',
  major: ''
});

const fetchEnrollmentDetail = async () => {
  loading.value = true;
  error.value = false;
  try {
    const response = await axios.get('/api/enrollment/detail', {
      params: { studentId: localStorage.getItem('studentId') }
    });
    if (response.data.success) {
      Object.assign(formData, response.data.data);
    } else {
      throw new Error(response.data.message || '获取报名详情失败');
    }
  } catch (err) {
    console.error('获取报名详情失败:', err);
    error.value = true;
    formData.photo = defaultPhoto;
  } finally {
    loading.value = false;
  }
};

const handleImageError = (e) => {
  formData.photo = defaultPhoto;
};

// 点击返回按钮，后退到上一页
const handleBack = () => {
  router.back();
};

onMounted(() => {
  fetchEnrollmentDetail();
});
</script>

<style scoped>
.enrollment-detail-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 自定义导航栏样式，与页面风格统一 */
.custom-nav-bar {
  background: linear-gradient(135deg, #e6f2ff, #c9e6ff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 装饰图区域调整 */
.decorate {
  position: absolute;
  right: 16px;
  top: 46px; /* 与导航栏高度对齐 */
}

.decorate-img {
  width: 120px;
  height: auto;
}

.detail-card {
  margin: 10px 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 60px; /* 给导航栏和装饰图留出空间 */
}

.student-photo {
  width: 80px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.loading {
  margin: 50px auto;
  display: block;
}
</style>