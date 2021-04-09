import Rete from 'rete';
import * as Socket from '../sockets';
import { NumControl } from '../controls/NumControl.js';
import { ChordControl } from '../controls/ChordControl.js';

export class SequenceComponent extends Rete.Component {

    constructor() {
        super('Sequence Notes');
    }

    builder(node) {
        node.meta.letter = '`';

        async function callback(n) {
            console.log(node)
            if (!n) { // del
                let c1 = this.emitter.nodes.find(n => n.id == node.id).controls.get(node.meta.letter);
                if (c1) {
                    node.removeControl(c1);
                    delete(node.data[node.meta.letter]);
                    await node.update();
                    node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) - 1);
                    setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);
                }
            } else { // add
                node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) + 1);

                node.addControl(new NumControl(this.emitter, node.meta.letter, false));
                await node.update();
                setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);

            }
        }

        let out = new Rete.Output('sequence', 'Sequence', Socket.object);
        let inp1 = new Rete.Input('start', 'Start', Socket.object);

        return node
            .addInput(inp1)
            .addControl(new ChordControl(this.editor, node, 'button', callback))
            .addOutput(out);
    }


    worker(node, inputs, outputs) {
        let input = {
            id: 'sequence',
            sequence: [],
            value: 0,
            button: {
                id: 0,
                value: 0
            }
        };

        if (inputs) {
            let build = inputs['start'][0];
            //Objeto
            let obj = node.data;
            //Para prop (propriedade) in obj (objeto) faça
            for (var prop in obj) {
                input.sequence.push(obj[prop]);
            }
            if (build) {
                input.button.value = build.button.value;
                input.button.id = build.button.id;
                outputs['sequence'] = input;
            }
        }
    }
}