<template>
  <el-upload
      class="avatar-uploader"
      action="http://localhost:8080/users/uploadImg"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :limit=1
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </template>
  <script setup>
  import {ref, reactive, defineComponent, computed} from "vue";
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  const imageUrl = ref('')//图片回显值
  const handleAvatarSuccess= (
   res
  ) => {
    console.log(res.data)
    imageUrl.value = res.data//将图片进行回显
    console.log(imageUrl.value)
  }
  const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg'&&rawFile.type!=='image/png') {//只能为图片类型
      // imageUrl=rawFile
      ElMessage.error('请选择图片类型的文件！')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('大小不能超过2MB!')//不能大于2MB
      return false
    }
    return true
  }
  </script>