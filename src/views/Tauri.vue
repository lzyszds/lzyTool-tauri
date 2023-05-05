<script setup lang='ts'>
import { appWindow } from '@tauri-apps/api/window'

</script>

<template>
  <div data-tauri-drag-region id="tauriTab" class="titlebar">
    <div class="logo">
      <img width="30" src="@/../app-icon.png" alt="">
      <span>lzy工具箱</span>
    </div>
    <div class="tool">
      <div class="titlebar-button" id="titlebar-minimize" @click="appWindow.minimize()">
        <img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
      </div>
      <div class="titlebar-button" id="titlebar-maximize" @click="appWindow.toggleMaximize()">
        <img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
      </div>
      <div class="titlebar-button" id="titlebar-close" @click="appWindow.close()">
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.titlebar {
  height: 40px;
  background: $themeColor;
  color: #fff;
  user-select: none;
  display: flex;
  justify-content: space-between;

  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 110px;
    height: 40px;
    font-size: 1.6em;
    font-weight: 600;
    padding-left: 30px;

    img {
      border-radius: 10px;
      border: 2px solid #fff;
    }
  }

  .tool {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-right: 10px;
  }
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 40px;

  img {
    filter: invert(1);
  }
}

.titlebar-button:hover {
  background: #eeeeee30;

  &:nth-child(3):hover {
    background: $hoverColor;
  }
}
</style>
