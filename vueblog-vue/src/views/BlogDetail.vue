<template>
   <div>
      <Header></Header>
      <div class="mblog">
        <el-row>
         <h2>{{ blog.title }}</h2>
          <el-button v-show="isAuthor" type="primary" icon="el-icon-edit" circle style="float: right; margin: 20px 20px;" @click="onEdit()">
				</el-button>
        </el-row>
         <el-divider></el-divider>
         <v-md-preview :text="blog.content"></v-md-preview>
      </div>
   </div>
</template>

<script>
import Header from "@/components/Header";
export default {
   components: { Header },
   name: "BlogDetail.vue",
   data() {
      return {
         blog: {
            text: "",
            id: "",
            title: "",
            content: "",
         },
         isAuthor: false
      };
   },
   methods: {
		onEdit () {
			this.$router.push(`/blog/${this.blog.id}/edit`)
		}
	},
   mounted() {
      const blogId = this.$route.params.blogId;
      console.log(blogId);
         this.$axios.get(`/blog/${blogId}`).then((res) => {
         const blog = res.data.data;
         this.blog.id = blog.id;
         this.blog.title = blog.title;
         this.isAuthor = this.$store.state.userInfo.id === res.data.data.userId
         this.blog.content = blog.content;
      });
   },
};
</script>

<style>
.mblog {
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   width: 100%;
   min-height: 700px;
   min-height: 700px;
	margin: 0px 0;
	padding: 20px;
}
</style>