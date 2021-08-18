import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from 'axios'
// ------VMdEditor--------
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// ---------------
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview-html.css';




// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
   Hljs: hljs,
 });

 VMdPreview.use(githubTheme, {
   Hljs: hljs,
 });
 

import "./axios"
import "./permission"

const app = createApp(App)
installElementPlus(app)

app.use(store).use(router).use(VMdEditor).use(VMdPreview).mount('#app')
app.config.globalProperties.$axios = axios;