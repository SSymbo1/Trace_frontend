<div align="center">
	<h1>Trace</h1>
	<img src="./public/vite.svg" width="150" align="center" />
	<br/> <br/>
	<strong>重要产品追溯管理系统前端</strong>
</div>

### 介绍
哈尔滨学院21级毕业设计，基于Vue3的溯源平台项目

### 安装与运行
该项目为使用 pnpm 进行包管理的 Vite 项目。

如果你没有 pnpm 包管理工具请先安装pnpm。
确保你的 node 版本支持 Vue3，Vite 和 pnpm，以下是开发时使用的版本

- node：v18.15.0
- pnpm: 8.15.4

#### 1.安装 pnpm
```bash
npm install pnpm -g
```
#### 2.安装项目依赖
首先进入项目根目录( 如果处于项目根目录则忽略这一条 )
```bash
cd trace_frontend
```
接下来执行以下命令
```bash
pnpm install
```
#### 3.运行项目
```bash
pnpm run dev
```

### 目录结构

- api ( 封装的request方法，数据接口 )
- assets ( 静态资源 )
- json ( 复用魔法值 )
- router ( 路由配置 )
- stores ( pinia配置 )
- view ( 功能页面 )
