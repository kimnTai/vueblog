<template>
  <div>
       
    <el-container>
      <el-header>
        <img class="bloglogo" src="https://i.imgur.com/C32PxdP.png" alt="">
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="使用者名稱" prop="username">
            <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
     
  </div>

</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: 'kimn',
        password: '111111'
      },
      rules: {
        username: [
          {required: true, message: '請輸入使用者名稱', trigger: 'blur'},
          {min: 3, max: 15, message: '長度在 3 到 15 個字元', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '請輸入密碼', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          this.$axios.post('/login', this.ruleForm).then((res) => {
            console.log(res)
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            // 存入vuex
            this.$store.commit("SET_TOKEN", jwt)
            this.$store.commit("SET_USER_INFO", userInfo)
            // 清空表單
            this.ruleForm = {}
            // 頁面跳轉
            this.$router.push("/blogs")
          })
        } else {

          this.$message.error('當前输入的使用者名稱、密码或信箱不正確')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.bloglogo {
  height: 70%;
  margin-top: 10px;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>