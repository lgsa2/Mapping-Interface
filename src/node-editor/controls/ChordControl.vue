<template>
    <div><input class="click_button" type="button" @click="plus($event)" value="+" />&nbsp;<input class="click_button" type="button" @click="minus($event)" value="-" /></div>
</template>

<script>
export default {
    props: ['emitter', 'ikey', 'cback', 'getData', 'putData'],
    methods: {
		plus(){ this.cback(1); this.update(); },	
		minus(){ this.cback(0); this.update(); },	
		update() { this.emitter.trigger('process'); }
	},
}
</script>


<style>
.click_button {
  width:30px !important;
}
</style>