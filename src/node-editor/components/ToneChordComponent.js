import Rete from 'rete';
// import { NumControl } from '../controls/NumControl.js';
import { ToneChordControl } from '../controls/ToneChordControl.js';
import * as Socket from '../sockets.js';
export class ToneChordComponent extends Rete.Component {
    constructor() {
        super("Tone Chord")
    }

    builder(node) {

        var chord = new Rete.Output('toneChord', "Tone Chord", Socket.object);

        var tone = new Rete.Input('tone', 'Tone', Socket.object);
        var Button = new Rete.Input('button', 'Button', Socket.object);



        return node
            .addControl(new ToneChordControl(this.editor, "Chord", true))
            .addOutput(chord)
            .addInput(Button)
            .addInput(tone);
    }

    worker(node, inputs, outputs) {
        console.log('ToneChordComponent');
        let Tone = inputs['tone'][0];
        let button = inputs['button'][0];
        let input = {
            id: 'chord',
            sequence: [],
            button: {
                id: 0,
                value: 0
            }
        };
        if (inputs) {
            // console.log(node);
            if (Tone) {
                if (Tone.button.value >= 0 && Tone.button.value <= 34) {
                    this.editor.nodes.find(n => n.id == node.id).controls.get('Chord').setValue("C");
                } else if (Tone.button.value >= 35 && Tone.button.value <= 66) {
                    this.editor.nodes.find(n => n.id == node.id).controls.get('Chord').setValue("G");
                } else if (Tone.button.value >= 67 && Tone.button.value <= 98) {
                    this.editor.nodes.find(n => n.id == node.id).controls.get('Chord').setValue("Am");
                } else if (Tone.button.value >= 99 && Tone.button.value <= 127) {
                    this.editor.nodes.find(n => n.id == node.id).controls.get('Chord').setValue("F");
                }

            }
            if (button) {
                if (button.button.value === 127) {
                    if (node.data) {
                        var chord = node.data.Chord;
                        // console.log(chord);
                    }
                    input.button.value = button.button.value;
                    input.button.id = button.button.id;
                    if (chord === "C") {
                        console.log('ok');
                        input.sequence = [60, 64, 67]
                    } else if (chord === "G") {
                        console.log('ok');
                        input.sequence = [67, 71, 74]
                    } else if (chord === "Am") {
                        console.log('ok');
                        input.sequence = [69, 72, 76]
                    } else if (chord === "F") {
                        console.log('ok');
                        input.sequence = [65, 69, 72]
                    }
                }
                outputs['toneChord'] = input;
            }
        }
    }
}