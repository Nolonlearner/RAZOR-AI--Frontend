# 项目名称
RAZOR-AI
A managed purchase, maintenance, and update platform for AI products. This is the frontend of RAZOR-AI.

## 安装和运行

### 前提条件

- [Node.js](https://nodejs.org/)     (版本20.15.1)
- [Yarn](https://yarnpkg.com/)       (版本1.22.22)
- [Vue CLI](https://cli.vuejs.org/)  (版本5.0.8)

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
RAZOR-AI-frontend           # 项目根目录
├── .eslintignore           # ESLint 忽略配置文件，指定哪些文件和目录不应由 ESLint 检查
├── .eslintrc.js            # ESLint 配置文件，用于定义代码质量和风格检查的规则
├── .prettierignore         # Prettier 忽略文件，指定不应由 Prettier 格式化的文件和目录
├── .prettierrc             # Prettier 配置文件，用于定义代码格式化的规则
├── babel.config.js         # Babel 配置文件，用于 JavaScript 代码的转换和兼容性处理
├── jest.config.js          # Jest 配置文件，用于单元测试的配置
├── jsconfig.json           # JavaScript 项目配置文件，提供 IntelliSense 和模块路径别名支持
├── package.json            # 项目元数据和依赖管理文件，定义项目使用的 npm 包和脚本命令
├── public                  # 公共静态文件夹，存放不经过 Webpack 处理的文件
│   └── index.html          # 项目入口 HTML 文件，作为单页面应用的模板
├── README.md               # 项目简介和说明文档，通常包含如何运行和使用项目的信息
├── src                     # 源代码目录，存放所有前端代码
│   ├── App.vue             # 根组件文件，是整个应用的入口组件
│   ├── assets              # 资源文件夹，存放图片、样式和其他静态资源
│   │   ├── images          # 图片文件夹  
│   │   └── styles          # 样式文件夹，存放 SCSS 文件
│   ├── components           # 公共组件文件夹，存放项目中可复用的 Vue 组件
│   ├── layouts              # 布局组件文件夹，定义不同页面的布局结构
│   │   └── defaultLayout.vue  # 默认布局组件，应用于大多数页面
│   ├── main.js              # 入口 JavaScript 文件，初始化 Vue 实例并挂载应用
│   ├── router               # 路由配置文件夹，定义应用中的页面路径和导航规则
│   │   └── index.js         # 路由入口文件，配置应用的路由规则
│   ├── store                # Vuex 状态管理文件夹，集中管理应用的全局状态
│   ├── utils                # 工具函数文件夹，存放常用的 JavaScript 工具函数
│   │   └── api.js           # API 请求封装文件，用于统一管理和调用后端接口
│   └── views                # 视图文件夹，存放各个页面的 Vue 组件
├── tests                    # 测试文件夹，存放单元测试和集成测试相关代码
│   └── unit                 # 单元测试文件夹
├── vue.config.js            # Vue CLI 配置文件，用于自定义 Webpack 配置
└── yarn.lock                # Yarn 锁定文件，确保每次安装的依赖版本一致


```
## 项目结构说明
```
- **public/**：存放公共静态文件，如网站图标和入口 HTML 文件。
- **src/**：包含源代码和资源文件。
  - **assets/**：资源文件夹，包含图片和样式等。
  - **components/**：公共组件，如头部导航和页脚组件。
  - **views/**：页面组件，如首页和产品页面。
  - **router/**：路由配置，主要文件为 `index.js`。
  - **store/**：Vuex 状态管理，主要文件为 `index.js`。
  - **utils/**：工具函数，如 API 请求封装。
  - **App.vue**：根组件。
  - **main.js**：入口文件。
- **.gitignore**：Git 忽略文件。
- **.gitattributes**：Git 文本文件换行设置。
- **babel.config.js**：Babel 配置文件。
- **package.json**：项目依赖和脚本。
- **vue.config.js**：Vue CLI 配置文件。
- **.eslintrc.js**: ESLint 配置文件。
- **.eslintignore**: ESLint 忽略文件。
- **.prettierrc**: Prettier 配置文件。
- **.prettierignore**: Prettier 忽略文件。
- **yarn.lock**：Yarn 锁定依赖版本文件。
- .github/workflows/ci.yml: GitHub Actions 配置文件。
```

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
- yarn build：用于构建生产环境的代码。这个命令会将你的应用程序代码打包和优化，使其适合部署到生产环境中。它会生成一个 dist 目录，其中包含经过优化的 HTML、CSS 和 JavaScript 文件。这些文件经过压缩和优化，通常可以提高应用程序的性能和加载速度。
```
yarn build
```
- 配置位置
- vue.config.js：如果有自定义的构建配置，它会在这个文件中定义
- package.json 的 scripts 部分："build": "vue-cli-service build" 指定了构建的命令，实际的构建过程是由 vue-cli-service 执行的。

- yarn test：用于运行测试。它会执行项目中定义的测试用例，确保代码的正确性。测试可以包括单元测试、集成测试、端到端测试等。这个命令的具体行为取决于你选择的测试框架和配置。
```
yarn test
```
- 配置位置
- package.json 的 scripts 部分："test": "vue-cli-service test:unit" 或类似的命令，指定了运行测试的命令。
- jest.config.js 或 karma.conf.js：如果使用 Jest 或 Karma 作为测试框架，测试配置会在这些文件中定义。

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
使用 Yourname/featureName-branch 进行新功能开发，Yourname/bugfix-branch 进行 bug 修复。

## 代码格式化和质量检查

本项目使用 Prettier 和 ESLint 确保代码格式的一致性和代码质量。

### Prettier

Prettier 的配置文件为 .prettierrc，忽略文件为 .prettierignore。

### ESLint

ESLint 的配置文件为 `.eslintrc.js`，忽略文件为 .eslintignore。

### 安装和运行

- 安装 Prettier 和 ESLint：
```
yarn add eslint prettier eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier babel-eslint --dev
```

- 运行代码格式化：
```
yarn prettier --write .
```

- 运行代码检查：
```
yarn eslint .
```

- 更新依赖项
  升级这些依赖库可以在 package.json 中手动修改版本号，然后运行 yarn upgrade。
  或者，你可以使用以下命令升级所有依赖库到最新版本：
  ```
  yarn upgrade-interactive --latest
  ```

# GitHub Actions 配置
## ci.yml 文件内容解释
- name: CI/CD Pipeline: 定义了工作流的名称。
- on: 定义触发工作流的条件，包括 push 和 pull_request 事件。
- jobs: 定义了要执行的任务。包括 build 和 deploy 两个作业。
- build: 执行代码检查和测试。
- deploy: 当代码推送到 main 分支时，执行部署任务。

# 日常工作流程
## 创建新分支
每当开始一个新的任务时，首先要从主分支（如 main）拉取最新的代码并创建一个新的分支。分支的命名应该遵循以下规范：
- 功能开发：Yourname/featureName
- Bug 修复：Yourname/bugfixName
```
git checkout main
git pull origin main
git checkout -b yourbranch
```
## 开发
在新分支上进行开发。确保代码风格符合项目规范（使用 ESLint 和 Prettier）。

## 提交更改
频繁且清晰地提交更改。提交信息应简明扼要，描述所做的更改。
```
git add .
git commit -m "简短且描述准确的提交信息"
```
## 本地测试
在提交代码之前，确保所有的本地测试都通过。
```
yarn lint
yarn test
yarn serve
```
## 推送分支
将分支推送到远程仓库。
```
git push origin yourbranch
```
## 创建 Pull Request
在 GitHub 上为你的分支创建一个 Pull Request (PR)。在 PR 中描述所做的更改，并请求团队成员进行代码审查。

## 代码审查和合并
- 团队成员会审查你的代码并提出改进意见。根据反馈进行必要的修改，并将更改推送到你的分支。
- 在代码通过审查后，将 PR 合并到主分支。
##  更新本地仓库
合并 PR 后，记得更新本地的主分支。
```
git checkout main
git pull origin main
```
## 清理分支
合并后的分支可以删除，以保持仓库的整洁。
```
git branch -d yourbranch
git push origin --delete yourbranch
```
## 部署
在合并 PR 后，根据项目的 CI/CD 流程，代码将被自动部署到测试环境或生产环境。
## 定期会议
团队成员应定期召开会议，讨论进展、遇到的问题和下一步计划。会议记录应保存并分享给所有成员。
# 常见问题
## 如何重置我的本地仓库？
如果遇到无法解决的问题，可以重置本地仓库
```
git fetch origin
git reset --hard origin/main
```
## 如何处理合并冲突？
在合并分支时，如果遇到冲突，Git 会提示哪些文件有冲突。编辑这些文件，解决冲突后，标记为已解决并提交。
```
git add .
git commit -m "Resolve merge conflict"
```
## 如何回退到之前的提交？
如果发现问题需要回退到之前的提交，可以使用以下命令：
```
git log  # 找到目标提交的哈希值
git checkout <commit-hash>
```

# 希望以上内容能帮助你更好地理解和参与项目的开发。如果有任何问题，请随时与团队成员联系。
