<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="item.created" placement="top" v-for="item in blogs" :key="item.id">
          <el-card>
            <h4>
              <router-link :to="{name:'BlogDetail',params:{blogId:item.id}}">
                {{ item.title }}
              </router-link>
            </h4>
            <p> {{ item.description }} </p>
          </el-card>
        </el-timeline-item>

      </el-timeline>
<!--         分頁沒有功能-->
      <el-pagination class="mpage"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     @current-change="page"
                     :total="total">
      </el-pagination>


    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Blogs.vue",
  components: {Header},
  data() {
    return {
      blogs: {},
      currentPage: 0,
      total: 0,
      pageSize: 5
    }
  },
  methods: {
    page(currentPage) {
      this.$axios.get(`blogs?currentPage=${currentPage}`).then(res => {
        console.log(res)
        console.log(currentPage)
        this.blogs = res.data.data.records
        this.currentPage = res.data.data.current
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      })
    },

  },
  mounted() {
    this.page(1)
  }
}
</script>

<style>
.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>