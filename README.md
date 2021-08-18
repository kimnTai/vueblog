SpringBoot + Vue 前後端分離 Blog
---
後端開發總結
---
* SpringBoot 為基礎整合 Mybatis-plus 作為數據層框架
* CodeGenerator 資料庫class自動產生工具
* 整合Shiro
    * 使用 JWT (JSON Web Token) 作為前後端分離用憑證
    * JwtFilter 把jwt封裝成token，藉由AccountRealm對資料庫進行驗證
    * 驗證用戶狀態、返回Shiro => 登入成功 => 進入接口
* 接口端 若定義 @RequiresAuthentication 需要進行驗證/授權，才能訪問
* CorsConfig 、JwtFilter 需跨域處理
* GlobalExceptionHandler 全局異常處理
* Result 統一結果封裝

前端開發總結
---
* 使用技術
    * Vue3 (核心框架)
    * Element Plus (樣式美化)
    * axios (HTTP 客戶端)
    * v-md-editor (markdown編輯器)
* VueRouter 路由配置
* Header    頭部組件
* stroe     
    * 儲存token    至 localStorage
    * 儲存userInfo 至 sessionStorage
* axios.js      => 全局axios攔截器
* permission.js => 路由權限攔截
