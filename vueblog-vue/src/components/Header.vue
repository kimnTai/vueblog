<template>
  <div class="m-content">
    <h3>歡迎來到我的BLOG</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>
    <!--    我是分隔線-->
    <div class="maction">
      <span><el-link href="/blogs">首頁</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">發表BLOG</el-link></span>

      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"><el-link type="primary" href="/login">登入</el-link></span>

      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>

  </div>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '請先登入',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false
    }
  },
  methods: {
    logout() {
      // 目前是壞的 不知為何要 get
      // this.$axios.get("/logout", {
      //   headers: {
      //     "Authorization": localStorage.getItem("token")
      //   }
      // }
      // )
          // .then(res => {
        this.$store.commit("REMOVE_INFO")
      //
      // })
      this.$router.push("/login")
    }
  },
  mounted() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar
      this.hasLogin = true
    }
  }
}
</script>

<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.maction {
  margin: 10px 0;
}
</style>