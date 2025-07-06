# DID-Fi DApp

去中心化身份和打赏系统，基于区块链的身份认证、声誉管理和价值激励平台。

## 🎯 项目简介

DID-Fi DApp 是一个创新的去中心化应用，融合了三大核心功能：
- **🧾 DID 身份系统**：链上身份注册和管理
- **🌟 声誉系统**：社区互评和信用排名
- **💰 打赏系统**：ERC20 代币激励机制

## 🚀 快速开始

### 前端开发
```bash
cd frontend
pnpm install
pnpm dev
```

### 智能合约开发
```bash
npx hardhat help
npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## 📊 开发状态

- ✅ **前端完成度**: 95% - 所有页面和组件已实现
- 🔄 **智能合约**: 0% - 待开发
- 📋 **集成对接**: 0% - 待开发

详细进展请查看：[开发进展记录](./DEVELOPMENT_PROGRESS.md)

## 🏗️ 技术栈

- **前端**: Nuxt 3 + TypeScript + Tailwind CSS
- **区块链**: Hardhat + Solidity + Ethers.js
- **存储**: IPFS (计划中)

## 📁 项目结构

```
├── frontend/          # Nuxt 3 前端应用
├── contracts/         # 智能合约
├── test/             # 合约测试
├── PROJECT_CONTEXT.md # 项目需求文档
└── DEVELOPMENT_PROGRESS.md # 开发进展记录
```
