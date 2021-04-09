import { NumControl } from '../controls/NumControl';
import Rete from 'rete';
import * as Socket from '../sockets.js';

export class NumComponent extends Rete.Component {

    constructor() {
        super("Number")
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", Socket.value);

        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}