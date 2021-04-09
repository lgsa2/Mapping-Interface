import Rete from 'rete';
import VueMidiControl from './MidiControl.vue';

export class MidiControl extends Rete.Control {

    constructor(emitter, key, readonly) {
        super(key);
        this.component = VueMidiControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}