<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>统一管理平台</h2>
      <el-image :src="require('@/assets/logo.png')"></el-image>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="6">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-input v-model="loginForm.code" style="width: 172px;float: left;"></el-input>
          <el-image :src="captchaImage" class="captchaImage"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      captchaImage: null,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'change'},
          {min: 5, max: 5, message: '长度为5个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then(res => {
            const jwt = res.headers['authorization']
            this.$store.commit('SET_TOKEN',jwt)
            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptchaImage() {
      this.$axios.get('/captcha').then(res => {
        console.log(res.data)
        this.token = res.data.data.token
        this.captchaImage = res.data.data.captchaImage
      })
    }
  },
  created() {
    this.getCaptchaImage()
  }
}
</script>

<style scoped>

.el-row {
  background: #fafafa;
  display: flex;
  align-items: center;
  height: 100%;
  text-align: center;
}

.el-divider {
  height: 200px;
}

.captchaImage {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>