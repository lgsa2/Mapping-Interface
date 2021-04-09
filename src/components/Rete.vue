<template>
  <div id="rete" ref="rete"></div>
</template>

<script>
import init from "../node-editor";


export default {
  mounted() {
     init(this.$refs.rete);
  }
};
</script>

<style>
#rete {
  width: 1904px;
  height: 1000px;
  background: #ccc;
}

.node .control input, .node .input-control input {
  width: 140px;
}

select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>
