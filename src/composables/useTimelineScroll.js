import { onMounted, onUnmounted } from 'vue'

/**
 * 时间轴滚动处理 composable
 * @param {Object} options 配置选项
 * @param {Function} options.onSwitch 切换回调函数，接收新索引
 * @param {Function} options.canSwitchNext 是否可以切换到下一个，接收当前索引，返回布尔值
 * @param {Function} options.canSwitchPrev 是否可以切换到上一个，接收当前索引，返回布尔值
 * @param {number} options.quietWindowMs 手势结束判定的静默时长，默认320ms
 */
export function useTimelineScroll({
  onSwitch,
  canSwitchNext = () => true,
  canSwitchPrev = () => true,
  quietWindowMs = 320
} = {}) {
  let isSwitching = false
  let switchUnlockTimer = null

  const handleWheel = (e) => {
    e.preventDefault?.()

    // 只要还有滚动事件进来，就持续延后解锁时间
    clearTimeout(switchUnlockTimer)
    switchUnlockTimer = setTimeout(() => {
      isSwitching = false
    }, quietWindowMs)

    if (isSwitching) return

    // 向下滚动：切换到下一个
    if (e.deltaY > 0 && canSwitchNext()) {
      onSwitch?.(1) // 传递方向 1 表示下一个
      isSwitching = true
    }
    // 向上滚动：切换到上一个
    else if (e.deltaY < 0 && canSwitchPrev()) {
      onSwitch(-1) // 传递方向 -1 表示上一个
      isSwitching = true
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
    clearTimeout(switchUnlockTimer)
  })
}
