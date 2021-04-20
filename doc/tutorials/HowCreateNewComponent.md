# How Create a new component

Each component is a Rete.component class, so to create another component it is necessary to create another class that will have inputs, outputs and controls. Each class has two methods which are builder () and worker (). The builder is executed when the class is created at run time and the worker method is always executed when there are changes in the input or control.

Inside the src / node-editor folder, there is a folder called components, where the components of this project's rete.js framework are created and maintained. Then it is necessary to create a new .js file that will be the component.

I'll show you how to create a new component in practice. It will be a simple Number component for practical purposes, in which it has a control and an output. In the control there will be a vue component that will have an HTML input, in which it will contain the input and will be sent to the output of this Number component.

