# 项目名称
RAZOR-AI
A managed purchase, maintenance, and update platform for AI products. This is the frontend of RAZOR-AI.

## 安装和运行

### 前提条件

- [Node.js](https://nodejs.org/) (版本 14.x 或更高)
- [Yarn](https://yarnpkg.com/) (版本 1.x 或更高)
- [Vue CLI](https://cli.vuejs.org/) (使用 Vue 2.0)

### 安装步骤

1. 下载并安装 [Node.js](https://nodejs.org/)
   - 确保 Node.js 已成功安装
   ```sh
   node -v
2. 下载并安装 Yarn
   - 确保 Yarn 已成功安装
   ```sh
   yarn -v
3. 下载并安装 Vue CLI
   - 确保 Vue CLI 已成功安装
   ```sh
   vue --version
4. 克隆仓库
   ```sh
   git clone <the-url>
5. 进入项目目录
   ```sh
   cd razor-ai-frontend
6. 安装依赖项
   ```sh
   yarn install
7. 运行项目
   - Yarn 会根据 package.json 文件中的依赖项列表下载并安装所有必要的包，生成 yarn.lock 文件，记录具体安装的包版本，以确保在其他环境中安装时依赖
   项的一致性
   ```sh
   yarn serve
# 项目结构
```
RAZOR-AI-frontend/
├── public/                      # 公共静态文件
│   ├── favicon.ico              # 网站图标
│   └── index.html               # 入口 HTML 文件
├── src/
│   ├── assets/                  # 资源文件（图片、样式等）
│   │   ├── images/              # 图片文件夹
│   │   └── styles/              # 样式文件夹
│   ├── components/              # 公共组件
│   │   ├── Header.vue           # 头部导航组件
│   │   └── Footer.vue           # 页脚组件
│   ├── views/                   # 页面组件
│   │   ├── Home.vue             # 首页
│   │   └── Product.vue          # 产品页面
│   ├── router/                  # 路由配置
│   │   └── index.js             # 路由入口文件
│   ├── store/                   # Vuex 状态管理
│   │   └── index.js             # Vuex 入口文件
│   ├── utils/                   # 工具函数
│   │   └── api.js               # API 请求封装
│   ├── App.vue                  # 根组件
│   └── main.js                  # 入口文件
├── .gitignore                   # Git 忽略文件
├── package.json                 # 项目依赖和脚本
└── vue.config.js                # Vue CLI 配置文件
```
## 项目结构说明
public/：存放公共静态文件，如网站图标和入口 HTML 文件。
src/：包含源代码和资源文件。
assets/：资源文件夹，包含图片和样式等。
components/：公共组件，如头部导航和页脚组件。
views/：页面组件，如首页和产品页面。
router/：路由配置，主要文件为 index.js。
store/：Vuex 状态管理，主要文件为 index.js。
utils/：工具函数，如 API 请求封装。
App.vue：根组件。
main.js：入口文件。
.gitignore：Git 忽略文件。
.gittattributes: Git 文本文件换行默认为crtl
package.json：项目依赖和脚本。
vue.config.js：Vue CLI 配置文件。

# 脚本说明
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development 运行开发服务器
```
yarn serve
```

### Compiles and minifies for production 打包项目用于生产环境
```
yarn build
```

### Lints and fixes files 运行 ESLint 检查代码风格
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 许可证
该项目使用 MIT 许可证。

# 开发人员要求
## 分支策略
1. 使用 Yourname/featureName-branch 进行新功能开发，Yourname/bugfix-branch 进行 bug 修复。
