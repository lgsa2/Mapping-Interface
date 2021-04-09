<template>
    <div id="teste">
        <!-- <button @click="change(50,127)"></button> -->
    </div>
</template>


<script>
export default {
   props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    data() {
        return {
            input:{
                id:'controler',
                button:{
                    id:0,
                    value:0,
                    isCC: false 
                },
            }
        };
    },
    methods: {
        change(id, val, isCC) {
            this.input.button.id = id;
            this.input.button.value = val;
            this.input.button.isCC = isCC;
            this.update();
        },
        update() {
            if (this.ikey)
                this.putData(this.ikey, this.input)
            this.emitter.trigger('process');
        }
    },
    mounted() {
         
        var midi;
        var $md = this;
        
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({
                sysex: false
            }).then(onMIDISuccess, onMIDIFailure);
        } else {
            console.warn("No MIDI support in your browser")
        }

        function onMIDISuccess(midiData) {
            midi = midiData;
            var allInputs = midi.inputs.values();
            
            for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
                input.value.onmidimessage = gotMIDImessage;
            }
        }

        function gotMIDImessage(messageData) {
            // console.log('messageData - '+ messageData.data);
            var data = messageData.data;
            var isCC = false;
            if(data[0] === 178){
                isCC = true;
            }
            // console.log(messageData.data);
            $md.change(data[1], data[2], isCC);
        }
        

        function onMIDIFailure() {
            console.warn("Not recognising MIDI controller");
        }
    } 
}
</script>

<style>
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