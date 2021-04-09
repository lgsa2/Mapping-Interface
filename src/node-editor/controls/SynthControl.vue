/* eslint-disable no-inner-declarations */
<template>
    <div>
        <input type="number" :readonly="readonly" :value="value" @input="change(value)"/>
        <!-- <button @click="change"></button> -->
    </div>
</template>


<script>
let midiOutput = null;
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;

let currentSequenceId = -1;
let sequence = [];

const NOTE_DURATION = 300;

const playNote = function() {
    
    if (currentSequenceId >= 0) {
        midiOutput.send([NOTE_OFF, sequence[currentSequenceId], 0x7f]);
    }

    currentSequenceId++;
    midiOutput.send([NOTE_ON, sequence[currentSequenceId], 0x7f]);

    if(currentSequenceId < sequence.length)
        setTimeout(playNote, NOTE_DURATION);
}
export default {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    data(){
        return{
            id : '',
            button :{
                id : 0,
                value : 0
            },
            value : 0,
            sequence : [],
            IsToWork:false
        };
    },
    watch:{
        value(){
            switch(this.id){
                case 'controler':
                    if(this.button.value != 0){
                        midiOutput.send([NOTE_ON, this.button.id, 0x7f]);
                    }
                    else{
                        midiOutput.send([NOTE_OFF,this.button.id, 0x7f]);
                    }
                    break;
                case 'chord':
                    console.log('ok');
                    var Id = 0;
                    var chord = this.sequence;
                    if(this.value === 127){
                        do {
                            if (Id >= 1) {
                                midiOutput.send([NOTE_OFF, chord[Id], 0x7f]);
                            }
                            midiOutput.send([NOTE_ON, chord[Id], 0x7f]);
                            Id = Id + 1;
                        } while (Id != sequence.length );
                    }
                    break;
                case 'sequence':
                    if(this.value === 127){
                        sequence = this.sequence;
                        currentSequenceId = -1;
                        console.log(sequence)
                        playNote();
                    }
                    break;

            }
        }

    },
    methods:{
        change(){
            console.log('Funciona') 
        }
    },
    mounted(){
        navigator.requestMIDIAccess().then(function(midiAccess) {
            const outputs = midiAccess.outputs.values();
            console.log(outputs);
            for(const output of outputs) {
                console.log(output);
                midiOutput = output;
            }   
        });
    }
}           
</script>