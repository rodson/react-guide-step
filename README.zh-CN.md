<p align="center">
  <img src="./logo.svg" alt="react-guide-step" width="120" height="120" />
</p>

<h1 align="center">react-guide-step</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-guide-step"><img src="https://img.shields.io/npm/v/react-guide-step.svg" alt="npm version" /></a>
  <a href="https://github.com/rodson/react-guide-step/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-guide-step.svg" alt="license" /></a>
  <a href="https://www.npmjs.com/package/react-guide-step"><img src="https://img.shields.io/npm/dm/react-guide-step.svg" alt="downloads" /></a>
</p>

<p align="center">
  <a href="./README.md">English</a> | 简体中文
</p>

<p align="center">
  <b>🔗 <a href="https://rodson.github.io/react-guide-step/">在线演示 & 主页</a></b>
</p>

一个轻量级、零依赖的 React 组件库，用于构建交互式产品导览、用户引导和分步引导体验。

## 特性

- **分步引导** — 定义一系列步骤，定位到任意 DOM 元素
- **聚光灯遮罩** — 高亮目标元素，同时遮暗页面其他区域
- **智能定位** — 自动计算提示框位置，支持 12 种定位方式和视口翻转逻辑
- **键盘导航** — 支持方向键、Enter 和 Escape 键导航
- **自定义渲染** — 通过 render props 完全控制步骤内容
- **持久化** — 可选的 localStorage 完成状态跟踪，避免重复展示
- **自动滚动** — 自动滚动目标元素到可视区域
- **元素等待** — 等待异步/懒加载 DOM 元素出现后再继续
- **主题定制** — 自定义颜色、圆角、层级和动画时长
- **国际化支持** — 所有按钮文案均可配置
- **生命周期钩子** — 每个步骤支持 `beforeEnter` 和 `afterLeave` 异步钩子
- **图片预加载** — 预加载步骤图片，防止布局抖动
- **Tree-shakeable** — 零运行时依赖，支持 ESM 和 CJS

## 安装

```bash
npm install react-guide-step
```

```bash
yarn add react-guide-step
```

```bash
pnpm add react-guide-step
```

> **对等依赖：** `react >= 18.0.0` 和 `react-dom >= 18.0.0`

## 快速开始

### 1. 定义引导步骤

```ts
// tours/onboarding.ts
import type { GuideStep } from 'react-guide-step';

const steps: GuideStep[] = [
  {
    target: '#welcome-header',
    title: '欢迎！',
    content: '让我们带你了解这个应用。',
    placement: 'bottom',
  },
  {
    target: '#sidebar-nav',
    title: '导航栏',
    content: '使用侧边栏在不同页面之间切换。',
    placement: 'right',
  },
  {
    target: '#create-btn',
    title: '创建',
    content: '点击这里创建一个新项目。',
    placement: 'bottom',
    highlightPadding: 8,
  },
];
```

### 2. 设置 Provider 并启动引导

```tsx
import { GuideProvider, useGuide } from 'react-guide-step';
import type { GuideOptions } from 'react-guide-step';
import { steps } from './tours/onboarding';

function App() {
  const options: GuideOptions = {
    steps,
    maskClosable: true,
    keyboardNavigation: true,
    onComplete: () => console.log('引导完成！'),
    onSkip: (step) => console.log(`在第 ${step} 步跳过`),
  };

  const guide = useGuide(options);

  return (
    <GuideProvider guide={guide} options={options}>
      <YourApp />
      <button onClick={() => guide.start()}>开始引导</button>
    </GuideProvider>
  );
}
```

## API 参考

### `useGuide(options)`

创建引导控制器的主要 Hook。

**返回值：`GuideController`**

| 属性 | 类型 | 说明 |
|---|---|---|
| `start()` | `() => void` | 开始引导 |
| `stop()` | `() => void` | 停止引导 |
| `next()` | `() => void` | 跳转到下一步 |
| `prev()` | `() => void` | 跳转到上一步 |
| `goTo(index)` | `(number) => void` | 跳转到指定步骤 |
| `isActive` | `boolean` | 引导是否正在运行 |
| `currentStep` | `number` | 当前步骤索引 |
| `totalSteps` | `number` | 总步骤数 |
| `isCompleted` | `boolean` | 引导是否已完成 |

### `GuideOptions`

| 选项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `steps` | `GuideStep[]` | *必填* | 引导步骤数组 |
| `initialStep` | `number` | `0` | 起始步骤索引 |
| `autoStart` | `boolean` | `false` | 挂载时自动启动引导 |
| `maskClosable` | `boolean` | `false` | 点击遮罩层关闭引导 |
| `keyboardNavigation` | `boolean` | `true` | 启用键盘导航 |
| `scrollBehavior` | `ScrollBehavior` | `'smooth'` | 滚动目标到可视区域时的滚动行为 |
| `persistKey` | `string` | — | localStorage 键名；已完成的引导不会再次显示 |
| `theme` | `GuideTheme` | — | 自定义主题覆盖 |
| `labels` | `GuideLabels` | — | 自定义按钮文案（用于国际化） |
| `onComplete` | `() => void` | — | 引导完成时的回调 |
| `onSkip` | `(stepIndex) => void` | — | 引导被跳过时的回调 |
| `onStepChange` | `(stepIndex) => void` | — | 每次步骤切换时的回调 |

### `GuideStep`

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `target` | `string \| HTMLElement` | *必填* | CSS 选择器或元素引用 |
| `title` | `string` | — | 步骤标题 |
| `content` | `ReactNode` | — | 步骤描述（支持文本、JSX、图片） |
| `placement` | `Placement` | `'bottom'` | 提示框相对于目标的位置 |
| `customRender` | `(props: StepRenderProps) => ReactNode` | — | 自定义渲染函数 |
| `beforeEnter` | `() => void \| Promise<void>` | — | 进入步骤前的异步钩子 |
| `afterLeave` | `() => void \| Promise<void>` | — | 离开步骤后的异步钩子 |
| `highlightPadding` | `number` | — | 聚光灯周围的额外内边距（px） |
| `waitForElement` | `boolean` | `false` | 等待目标元素出现在 DOM 中 |
| `showArrow` | `boolean` | `true` | 显示指向目标的箭头 |
| `allowInteraction` | `boolean` | `false` | 允许用户与高亮元素交互 |
| `preloadImages` | `string[]` | — | 在显示此步骤前预加载的图片 URL |

### `Placement`

```
'top' | 'top-start' | 'top-end'
'bottom' | 'bottom-start' | 'bottom-end'
'left' | 'left-start' | 'left-end'
'right' | 'right-start' | 'right-end'
'center'
```

### `GuideTheme`

| 属性 | 类型 | 说明 |
|---|---|---|
| `primaryColor` | `string` | 主按钮和强调色 |
| `textColor` | `string` | 文字颜色 |
| `bgColor` | `string` | 提示框背景颜色 |
| `overlayColor` | `string` | 遮罩层颜色 |
| `borderRadius` | `number` | 圆角大小（px） |
| `zIndex` | `number` | 引导层的基础 z-index |
| `animationDuration` | `number` | 动画时长（ms） |

### `GuideLabels`

| 属性 | 类型 | 说明 |
|---|---|---|
| `next` | `string` | "下一步" 按钮文案 |
| `prev` | `string` | "上一步" 按钮文案 |
| `skip` | `string` | "跳过" 按钮文案 |
| `finish` | `string` | "完成" 按钮文案 |
| `stepOf` | `string` | 步骤计数模板，例如 `"{current} / {total}"` |

## 进阶用法

### 自定义步骤渲染

```tsx
const steps: GuideStep[] = [
  {
    target: '#feature',
    customRender: ({ step, stepIndex, totalSteps, next, prev, skip }) => (
      <div className="my-custom-tooltip">
        <h3>第 {stepIndex + 1} 步，共 {totalSteps} 步</h3>
        <p>你的自定义内容</p>
        <div>
          <button onClick={prev}>上一步</button>
          <button onClick={next}>继续</button>
          <button onClick={skip}>跳过引导</button>
        </div>
      </div>
    ),
  },
];
```

### 持久化

通过设置 `persistKey` 防止已完成的引导再次出现：

```ts
const options: GuideOptions = {
  steps,
  persistKey: 'onboarding-v1',
};
```

完成状态存储在 `localStorage` 中，键名为 `rgs:<persistKey>`。要重置，移除该键即可：

```ts
localStorage.removeItem('rgs:onboarding-v1');
```

### 异步步骤钩子

在进入或离开步骤时执行异步操作：

```ts
const steps: GuideStep[] = [
  {
    target: '#dynamic-section',
    title: '动态内容',
    content: '这个区域是专门为你加载的。',
    waitForElement: true,
    beforeEnter: async () => {
      await fetchAndRenderSection();
    },
    afterLeave: async () => {
      await trackStepViewed();
    },
  },
];
```

