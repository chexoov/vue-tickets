<template>
  <div class="main">
    <img
      src="../assets/img/076dc3828d4323a8f6f5d083dfaff115.jpeg"
      class="background"
      alt=""
    />

    <div class="main-logo">
      <p class="p-Authorization">Авторизация</p>
    </div>

    <div class="main-box">
      <router-link :to="{ name: 'list' }">Перейти в список</router-link>

      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <div class="main-box-content">
          <p>Логин или Телефон</p>

          <div class="Authorization">
            <el-form-item class="" label="">
              <el-input
              v-model="phoneData"
                type="text"
                prefix-icon="Phone"
                value= "7"
              />
            </el-form-item>

            <el-form-item label="" >
              <el-input
                v-model="passwordData"
                show-password
                prefix-icon="Lock"
                type="password"
               
              />
              
             
            </el-form-item>
          </div>

          <el-form-item class="Entrance">
            <el-button @click="login" type="primary" >
              <router-link  :to="{ name: 'list' }">Войти</router-link>
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import axios from 'axios'
import router from '../router';

const phoneData = ref("")
const passwordData = ref("")
const ruleFormRef = ref()

const login = async() => { 
  try {
  const data = await axios.post("https://dev.moydomonline.ru/api/auth/login/ ", {
    "username": phoneData.value,
    "password": passwordData.value
})
    const jwt = data.data.key
    localStorage.setItem("jwt", jwt)
    router.push({ name: 'list' })
  } catch (error) {
    
  }
}

</script>


<style lang="scss">


img.background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.main-box {
  background-color: white;
  position: fixed;
  left: 540px;
  width: 340px;
  height: 280px;
  top: 223px;
  gap: 0px;
  opacity: 0px;
  border-radius: 6px;
  .main-box-content {
    padding-top: 30px;
  }
}

.main-logo {
  z-index: 1;
  display: flex;
  position: fixed;
  left: 558px;
  top: 200px;
  border-radius: 6px;
  width: (308px);
  height: (50px);
  background-color: green;
  justify-content: center;
}

.Authorization {
  margin-left: 10px;
  margin-right: 10px;
}

.Entrance {
  margin-left: auto;
  margin-right: auto;
  width: 6em;
}
</style>
