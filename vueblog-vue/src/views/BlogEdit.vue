<template>
   <div>
      <Header></Header>
      <div class="m-content">
         <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="auto"
            class="ruleForm"
         >
            <el-form-item label="標題" prop="title">
               <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="description">
               <el-input
                  type="textarea"
                  v-model="ruleForm.description"
               ></el-input>
            </el-form-item>

            <el-form-item label="內容" prop="content">
               <v-md-editor
                  v-model="ruleForm.content"
                  height="400px"
               ></v-md-editor>
            </el-form-item>

            <el-form-item>
               <el-button type="primary" @click="submitForm('ruleForm')"
                  >立即發表</el-button
               >
               <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
         </el-form>
      </div>
   </div>
</template>

<script>
import Header from "@/components/Header";

export default {
   components: { Header },
   name: "BlogEdit.vue",
   data() {
      return {
         ruleForm: {
            id: null,
            title: "",
            description: "",
            content: "",
         },
         rules: {
            title: [
               { required: true, message: "請輸入標題", trigger: "blur" },
               {
                  min: 3,
                  max: 25,
                  message: "長度在 3 到 25 個字元",
                  trigger: "blur",
               },
            ],
            description: [
               { required: true, message: "請輸入摘要", trigger: "blur" },
            ],
            content: [
               { required: true, message: "請輸入內容", trigger: "blur" },
            ],
         },
      };
   },
   methods: {
      submitForm(formName) {
         this.$refs[formName].validate((valid) => {
            if (valid) {
               this.$axios
                  .post("blog/edit", this.ruleForm, {
                     headers: {
                        Authorization: localStorage.getItem("token"),
                     },
                  })
                  .then((res) => {
                     console.log(res);
                     this.$alert("操作成功", "提示", {
                        confirmButtonText: "確定",
                        callback: (action) => {
                           this.$router.push("/blogs");
                        },
                     });
                  });
            } else {
               console.log("error submit!!");
               return false;
            }
         });
      },
      resetForm(formName) {
         this.$refs[formName].resetFields();
      },
   },
   mounted() {
      const blogId = this.$route.params.blogId;
      console.log(blogId);
      if (blogId) {
         this.$axios.get(`/blog/${blogId}`).then((res) => {
            const blog = res.data.data;
            this.ruleForm.id = blog.id;
            this.ruleForm.title = blog.title;
            this.ruleForm.description = blog.description;
            this.ruleForm.content = blog.content;
         });
      }
   },
};
</script>

<style>
.m-content {
   text-align: center;
}
</style>