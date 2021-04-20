# How Create a new component

Each component is a Rete.component class, so to create another component it is necessary to create another class that will have inputs, outputs and controls. Each class has two methods which are builder () and worker (). The builder is executed when the class is created at run time and the worker method is always executed when there are changes in the input or control.

Inside the src / node-editor folder, there is a folder called components, where the components of this project's rete.js framework are created and maintained. Then it is necessary to create a new .js file that will be the component.

I'll show you how to create a new component in practice. It will be a simple Number component for practical purposes, in which it has a control and an output. In the control there will be a vue component that will have an HTML input, in which it will contain the input and will be sent to the output of this Number component.

![Number Component](https://github.com/lgsa2/Mapping-Interface/blob/master/doc/images/NumberComponent.png)

As can be seen, this class has the builder () method, in the builder method is where we create the characteristics of our node. Therefore, this class has an output and a control. For the construction of the control we will see the creation of the vue component and the import to the Number component created.

![Vue Component](https://github.com/lgsa2/Mapping-Interface/blob/master/doc/images/NumberVue.png)

This vue component has HTML input as stated. Every time this input is edited, the value will be saved in the control.

The vue component will be imported from the Num control which will finally be imported into the NumberComponent.js created initially

![Num Control](https://github.com/lgsa2/Mapping-Interface/blob/master/doc/images/NumControl.png)

