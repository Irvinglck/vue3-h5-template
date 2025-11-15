<template>
  <div class="reset-password-page">
    <!-- 顶部学校信息 -->
    <div class="school-header">
      <img 
        src="https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/ea0052a763d64b39853f25b7d290718d.png~tplv-a9rns2rl98-24:720:720.png" 
        alt="校徽" 
        class="school-logo"
      >
      <h1 class="school-name">常州纺织服装职业技术学院</h1>
    </div>

    <!-- 表单卡片 -->
    <div class="form-card">
      <h2 class="form-title">找回密码</h2>

      <van-form @submit="handleSubmit" ref="resetForm">
        <!-- 姓名输入 -->
        <van-field
          v-model="form.name"
          name="name"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
          class="form-item"
        />

        <!-- 身份证号输入 -->
        <van-field
          v-model="form.idCard"
          name="idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入身份证号' }, { validator: validateIdCard }]"
          class="form-item"
        />

        <!-- 新密码输入 -->
        <van-field
          v-model="form.newPassword"
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          :type="showPassword ? 'text' : 'password'"
          :rules="[{ required: true, message: '请输入新密码' }, { min: 6, message: '密码长度不能少于6位' }]"
          class="form-item"
        >
          <template #suffix>
            <van-icon
              :name="showPassword ? 'eye-o' : 'eye-close-o'"
              class="password-icon"
              @click="showPassword = !showPassword"
            />
          </template>
        </van-field>

        <!-- 确认密码输入 -->
        <van-field
          v-model="form.confirmPassword"
          name="confirmPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :type="showPassword ? 'text' : 'password'"
          :rules="[{ required: true, message: '请确认密码' }, { validator: validateConfirmPassword }]"
          class="form-item"
        />

        <!-- 确认修改按钮 -->
        <van-button 
          round 
          type="primary" 
          native-type="submit"
          class="submit-btn"
          :loading="isSubmitting"
        >
          确认修改
        </van-button>

        <!-- 返回按钮 -->
        <van-button 
          round 
          type="info" 
          plain
          class="back-btn"
          @click="handleBack"
        >
          返回
        </van-button>
      </van-form>
    </div>

    <!-- 成功提示弹窗 -->
    <van-dialog
      v-model:show="showSuccessDialog"
      title="提示"
      message="密码修改成功，请使用新密码登录"
      show-confirm-button
      confirm-text="前往登录"
      @confirm="goToLogin"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Field, Form, Button, Icon, Dialog } from 'vant';
import 'vant/lib/index.css';

// 路由实例
const router = useRouter();

// 表单数据
const form = reactive({
  name: '',
  idCard: '',
  newPassword: '',
  confirmPassword: ''
});

// 状态管理
const showPassword = ref(false);
const isSubmitting = ref(false);
const showSuccessDialog = ref(false);
const resetForm = ref(null);

// 身份证号验证
const validateIdCard = (val) => {
  // 简单的身份证号格式验证（18位，最后一位可以是X/x）
  const reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val) ? true : '请输入有效的身份证号';
};

// 确认密码验证
const validateConfirmPassword = (val) => {
  return val === form.newPassword ? true : '两次输入的密码不一致';
};

// 处理表单提交
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    // 调用密码重置接口
    const response = await axios.post('/api/reset-password', {
      name: form.name,
      idCard: form.idCard,
      newPassword: form.newPassword
    });

    if (response.data.success) {
      // 显示成功弹窗
      showSuccessDialog.value = true;
      // 重置表单
      resetForm.value.resetFields();
    } else {
      Dialog.alert({
        message: response.data.message || '密码修改失败，请重试'
      });
    }
  } catch (error) {
    console.error('密码重置失败:', error);
    Dialog.alert({
      message: error.response?.data?.message || '网络异常，请稍后重试'
    });
  } finally {
    isSubmitting.value = false;
  }
};

// 返回上一页
const handleBack = () => {
  router.back();
};

// 前往登录页
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.reset-password-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #409eff, #6aaef9);
  padding-bottom: 20px;
}

.school-header {
  padding: 40px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.school-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  padding: 8px;
  margin-bottom: 12px;
}

.school-name {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.form-card {
  background-color: white;
  margin: 0 16px;
  border-radius: 16px;
  padding: 24px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 16px;
}

.password-icon {
  font-size: 20px;
  color: #999;
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  margin-bottom: 12px;
}

.back-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
}
</style>