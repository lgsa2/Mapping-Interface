import Rete from 'rete';
import { MidiControl } from '../controls/MidiControl.js';
// import { MidiControl } from '../controls/MidiControl.js';
import * as Socket from '../sockets.js';
export class ControlerComponent extends Rete.Component {
    constructor() {
        super("Controler")
    }

    builder(node) {

        var out1 = new Rete.Output('num1', "Button1", Socket.object);
        var out2 = new Rete.Output('num2', "Button2", Socket.object);
        var out3 = new Rete.Output('num3', "Button3", Socket.object);
        var out4 = new Rete.Output('num4', "Button4", Socket.object);
        var out5 = new Rete.Output('num5', "Button5", Socket.object);
        var out6 = new Rete.Output('num6', "Button6", Socket.object);
        var out7 = new Rete.Output('num7', "Tone1", Socket.object);
        var out8 = new Rete.Output('num8', "Tone2", Socket.object);



        return node
            .addControl(new MidiControl(this.editor, "Button"))
            .addOutput(out1)
            .addOutput(out2)
            .addOutput(out3)
            .addOutput(out4)
            .addOutput(out5)
            .addOutput(out6)
            .addOutput(out7)
            .addOutput(out8);
    }

    worker(node, inputs, outputs) {
        switch (node.data.Button.button.id) {
            case 50:
                outputs['num1'] = node.data.Button;
                break;
            case 49:
                outputs['num2'] = node.data.Button;
                break;
            case 48:
                outputs['num3'] = node.data.Button;
                break;
            case 46:
                outputs['num4'] = node.data.Button;
                break;
            case 45:
                outputs['num5'] = node.data.Button;
                break;
            case 44:
                outputs['num6'] = node.data.Button;
                break;
            case 16:
                outputs['num7'] = node.data.Button;
                break;
            case 17:
                outputs['num8'] = node.data.Button;
        }
    }
}