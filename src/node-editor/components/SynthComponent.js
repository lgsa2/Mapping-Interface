import Rete from 'rete';
// import { TextControl } from '../controls/TextControl.js';
// import { NumControl } from '../controls/NumControl.js';
import { SynthControl } from '../controls/SynthControl.js';
import * as Socket from '../sockets';

export class SynthComponent extends Rete.Component {
    constructor() {
        super("Synth");
    }

    builder(node) {
        var num1 = new Rete.Input("synth", "Synth", Socket.object);

        return node
            .addInput(num1)
            .addControl(new SynthControl(this.editor, "synthTest"));
    }

    worker(node, inputs) {
        console.log('SynthComponent');
        console.log(node);
        let input = inputs['synth'][0];
        console.log(input);
        this.editor.nodes.find(n => n.id == node.id).controls.get('synthTest').setValue(input);
    }
}