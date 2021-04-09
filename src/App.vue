<template>
  <div>
    <nav-bar v-show="false"></nav-bar>
    <rete></rete>
  </div>
</template>

<script>
// import Midi from './components/Midi.vue'
import Rete from './components/Rete'
import Store from './store.js'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  provide:{
    store: new Store()
  },
  components: {
    Rete,
    NavBar
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

/* .node {
  background: rgba(48, 46, 46, 0.8) !important;
  border: 2px solid #030303 !important;
}
.node.selected {
    background: #358a5a !important;
    border-color: #2f5746 !important;
}



.connection .main-path {
    stroke: #3d4952 !important;
}
.context-menu{= j
}

.search {
    border-bottom: 1px solid #358a5a !important;
    background-color: #358a5a !important;
}

.item {
    border-bottom: 1px solid #358a5a !important;
    background-color: #358a5a !important;
} */

</style>
