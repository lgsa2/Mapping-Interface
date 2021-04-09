import Rete from 'rete'
import VueLoopControl from './ChordControl.vue'

export class ChordControl extends Rete.Control {
    constructor(emitter, node, key, cback) {
        super(key);
        this.component = VueLoopControl;
        this.props = { emitter, ikey: key, cback: cback };
    }
}