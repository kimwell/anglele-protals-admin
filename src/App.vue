<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    width: 100%;
    /* min-width: 1440px; */
    height: 100%;
  }
  
  .layout .ivu-menu-item-group-title {
    color: #000!important;
    font-weight: bold!important;
  }
  
  .spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .status-0 {
    background-color: #c16bd6;
  }
  
  .status-1 {
    background-color: #3fa6e3;
  }
  
  .status-2 {
    background-color: #66c549;
  }
  
  .status-3 {
    background-color: #f89d34;
  }
  
  .status-4 {
    background-color: #ff5c55;
  }
</style>
