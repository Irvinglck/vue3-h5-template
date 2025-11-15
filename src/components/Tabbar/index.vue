<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" v-if="!$route.meta.hideTabbar"  fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
      
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute } from 'vue-router'

const route = useRoute()

const active = ref(0);
const tabbarData = reactive([
    
  
  // {
  //   icon: "wap-home-o",
  //   title: "主页",
  //   to: {
  //     name: "Demo"
  //   }
  // },
  {
    icon: "gem-o",
    title: "工具",
    to: {
      name: "Tools"
    }
  },
  {
    icon: "user-o",
    title: "关于",
    to: {
      name: "About"
    }
  }
]);
</script>
