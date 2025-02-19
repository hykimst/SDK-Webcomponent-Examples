// Clickable
export class MyClickListener {
    outputs: any;
    context: any;
    material: any;
  
    constructor(sdk: any) {
      this.onEvent = this.onEvent.bind(this);
    }
  
    onInit() {
      var THREE = this.context.three;
      var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      this.material = new THREE.MeshBasicMaterial();
      var mesh = new THREE.Mesh(geometry, this.material);
  
      // this.outputs.objectRoot = mesh;   // gets added to the scene node
      this.outputs.collider = mesh; // will now be part of raycast testing
    }
  
    onDestroy() {
      console.log('`onDestroy`');
    }
  
    emits = {
      // emit a clicked events
      clicked: true,
    };
  
    events = {
      // subscribe to click events
      'INTERACTION.CLICK': true,
    };
  
    notify(msg: string) {
      console.log(
        '%c CLICKED DO SOMETHING ',
        'background: #333333; color:rgb(255, 13, 207)',
        msg
      );
    }
  
    onEvent(eventType: string, data: any) {
      console.log('=== CLICKED', eventType, data);
      if (eventType === 'INTERACTION.CLICK') {
        this.notify('clicked');
      }
    }
  }
  export function myClickListener(sdk: any) {
    return function () {
      return new MyClickListener(sdk);
    };
  }
  