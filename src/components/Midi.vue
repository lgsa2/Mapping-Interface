<template>
    <div id="midi-data">
        <ul></ul>
    </div>
</template>


<script>
export default {
    mounted(){
      
        var midi;

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
        var dataList = document.querySelector('#midi-data ul')

        function gotMIDImessage(messageData) {
            var newItem = document.createElement('li');
            newItem.appendChild(document.createTextNode(messageData.data));
            dataList.appendChild(newItem);
        }

        function onMIDIFailure() {
            console.warn("Not recognising MIDI controller");
        }
    }
}
</script>

<style>
#midi-data{
    width: 200px;
    height: 100px;
    overflow: auto;
}

</style>
