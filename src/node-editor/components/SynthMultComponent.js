import Rete from 'rete';
// import { TextControl } from '../controls/TextControl.js';
import { ChordControl } from '../controls/ChordControl.js'
// import { NumControl } from '../controls/NumControl.js';
import { SynthControl } from '../controls/SynthControl.js';
import * as Socket from '../sockets';

export class SynthMultComponent extends Rete.Component {
    constructor() {
        super("SynthMult");
    }

    builder(node) {

        node.meta.letter = '`';
        async function callback(n) {
            if (!n) { // del
                let synth = this.emitter.nodes.find(n => n.id == node.id).inputs.get(node.meta.letter);
                let SynthControl = this.emitter.nodes.find(n => n.id == node.id).controls.get(node.meta.letter);
                if (SynthControl || synth) {
                    node.removeInput(synth)
                    node.removeControl(SynthControl);
                    delete(node.data[node.meta.letter]);
                    await node.update();
                    node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) - 1);
                    setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);
                }
            } else { // add
                node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) + 1);
                let synth = new Rete.Input(node.meta.letter, 'Synth ' + node.meta.letter, Socket.object);
                node.addInput(synth);
                node.addControl(new SynthControl(this.emitter, node.meta.letter, 'Synth ' + node.meta.letter, 0));
                await node.update();
                setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);

            }
        }

        return node
            .addControl(new ChordControl(this.editor, node, 'button', callback));
    }

    worker(node, inputs) {
        console.log('SynthComponent');
        let obj = inputs;
        var count = 0;
        for (var prop in obj) {
            var input = obj[prop][0];
            if (input != undefined) {
                var key = String.fromCharCode(97 + count);
                var ob = this.editor.nodes.find(n => n.id == node.id).controls.get(key)
                    // console.log(ob);
                ob.setValue(input);
            }
        }
    }
}