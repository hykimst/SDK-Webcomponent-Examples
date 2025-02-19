export class DoSomething {
    // Constructor
    Constructor() {}
  
    onInit() {}
  
    onDestroy() {
      console.log('`onDestroy`');
    }
  
    events = {
      something: true,
    };
  
    outputs = {
      num: 0,
    };
  
    onEvent(eventType: string) {
      if (eventType === 'something') {
        this.outputs.num = Math.random();
        console.log(
          '%c === Do Something',
          'background: #333333; color:rgb(255, 243, 13)',
          this.outputs.num
        );
      }
    }
  }
  
  export function doSomething() {
    return function () {
      return new DoSomething();
    };
  }
  