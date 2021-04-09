import Rete from 'rete';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from 'rete-context-menu-plugin';
import { SynthComponent } from './components/SynthComponent';
import { ControlerComponent } from './components/ControlerComponent';
import { ChordComponent } from './components/ChordComponent';
import { ToneChordComponent } from './components/ToneChordComponent';
import data from './data.json';
import { SequenceComponent } from './components/SequenceComponent';
import { SynthMultComponent } from './components/SynthMultComponent';

export default async function(container) {


    var components = [
        new ControlerComponent(),
        new SynthComponent(),
        new ChordComponent(),
        new ToneChordComponent(),
        new SequenceComponent(),
        new SynthMultComponent()
    ];


    var editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(AreaPlugin);
    editor.use(ContextMenuPlugin);


    var engine = new Rete.Engine("demo@0.1.0");

    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        async() => {
            console.log('process');
            console.log(editor.toJSON())
            await engine.abort();
            await engine.process(editor.toJSON());
        }
    );

    editor.fromJSON(data);

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    setTimeout(editor.trigger("process"), 1000);
}