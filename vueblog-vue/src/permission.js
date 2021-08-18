import router from "./router";
// 路由判斷登入，根據路由配置文件的參數
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判斷該路由是否需要登入權限
    const token = localStorage.getItem("token")
    console.log("------------" + token)
    if (token) { // 判斷當前的token是否存在 ； 登入存入的token
      if (to.path === '/login') {
      } else {
        next()
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

