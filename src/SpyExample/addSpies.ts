import { doSomething } from "./DoSomethingComponent";
import { myClickListener } from "./MyClickListenerComponent";

export async function addSpies(mpSdk:any){
    // 1 - Register Components
    // https://matterport.github.io/showcase-sdk/docs/reference/current/modules/scene.html#registercomponents
    await mpSdk.Scene.registerComponents([
        {
          name: 'dosomething',
          factory: doSomething(),
        },
        {
          name: 'clickListener',
          factory: myClickListener(mpSdk),
        },
      ]);
  
      // 2 - SCENE OBJECT
      const [sceneObject] = await mpSdk.Scene.createObjects(1);
  
      // 3 - SCENE NODE
      const node = sceneObject.addNode();
      node.addComponent('mp.directionalLight', { enabled: true, intensity: 1.5 });
      node.addComponent('mp.pointLight', {
        enabled: true,
        intensity: 1.5,
        decay: 5,
      });
      node.addComponent('mp.ambientLight', { enabled: true, intensity: 3.0 });
      node.addComponent('mp.input', {
        eventsEnabled: true,
        userNavigationEnabled: false,
      });
  
      // 4 - Initialize
      // GLTF Loader properties - https://matterport.github.io/showcase-sdk/sdkbundle_components_gltfloader.html
      const initial = {
        url: 'http://raw.githubusercontent.com/mrdoob/three.js/refs/heads/dev/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
        visible: true,
        localScale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        localPosition: {
          x: 0.1777167022228241,
          y: -0.2665756344795227,
          z: -3,
        },
        localRotation: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        colliderEnabled: true,
      };
  
      // 5 - Add Component
      const gltfcomponent = node.addComponent('mp.gltfLoader', initial, 'test');
      const clickEmitPath = sceneObject.addEmitPath(
        gltfcomponent,
        'INTERACTION.CLICK'
      );
      const clickComponentEventPath = node.addComponent('clickListener');
      const emitPath = sceneObject.addEmitPath(
        clickComponentEventPath,
        'clicked'
      );
      sceneObject.bindPath(clickComponentEventPath, emitPath);
  
      // 6 - Add SpyEvent
      sceneObject.spyOnEvent({
        path: clickEmitPath,
        onEvent(payload: any) {
          console.log(
            '%c ClickSpy',
            'background: #333333; color:rgb(255, 13, 207)',
            payload
          );
        },
      });
  
      // Transitions the node to Operating if it is in the Initializing state. Calling this function has no effect if the node is already Operating
      node.start();
  
      setTimeout(() => {
        node.stop();
      }, 50000000);
}