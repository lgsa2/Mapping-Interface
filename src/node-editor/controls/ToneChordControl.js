import Rete from 'rete';
import VueToneChordControl from './TextControl.vue';

export class ToneChordControl extends Rete.Control {

    constructor(emitter, key, readonly) {
        super(key);
        this.component = VueToneChordControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(Chord) {
        this.vueContext.value = Chord;

    }
}