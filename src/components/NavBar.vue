<template>
    <div>
        <base-modal @close="hideDialog" :open="dialogIsVisible">
            <img src="../assets/MidiTable.png">
            <button class="close" @click="hideDialog">Close it!</button>
        </base-modal>
        <div class="container">
            <ul>
                <li><button  @click="showDialog">Show Table MIDI notes</button></li>
            </ul>
        </div>
    </div>

</template>

<script>
import BaseModal from './Basic/BaseModal'
export default {
    components:{
        BaseModal
    },
    data(){
        return{
            dialogIsVisible:false
        }
    },
    methods:{
        showDialog() {
            this.dialogIsVisible = true;
        },
        hideDialog() {
            this.dialogIsVisible = false;
        },
    }
}
</script>

<style>
.container{
    background-color: rgba(48, 46, 46, 0.8);
}
button {
    font: inherit;
    padding: 0.5rem 2rem;
    border: 1px solid rgba(110, 136, 255, 0.8);
    background-color:rgba(110, 136, 255, 0.8);
    color: white;
    cursor: pointer;
}
.close{
    margin-top: 20px;  
    font: inherit;
    padding: 0.5rem 2rem;
    border: 1px solid rgba(110, 136, 255, 0.8);
    background-color:rgba(110, 136, 255, 0.8);
    color: white;
    cursor: pointer;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  padding: 8px;
  background-color: #dddddd;
}
</style>