import Rete from 'rete';
import VueSynthControl from './SynthControl.vue';

export class SynthControl extends Rete.Control {

    constructor(emitter, key, readonly) {
        super(key);
        this.component = VueSynthControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(input) {
        console.log('SynthControl');
        console.log(input);
        switch (input.id) {
            case 'controler':
                this.vueContext.id = input.id;
                this.vueContext.button.id = input.button.id;
                this.vueContext.button.value = input.button.value;
                this.vueContext.value = input.button.value;
                break;
            case 'chord':
                this.vueContext.id = input.id;
                this.vueContext.sequence = input.sequence;
                this.vueContext.IsToWork = input.IsToWork;
                this.vueContext.value = input.button.value;
                break;
            case 'sequence':
                this.vueContext.id = input.id;
                this.vueContext.sequence = input.sequence;
                this.vueContext.IsToWork = input.IsToWork;
                this.vueContext.value = input.button.value;
                break;
        }
    }
}