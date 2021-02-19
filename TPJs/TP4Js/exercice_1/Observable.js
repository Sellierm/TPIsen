class Observable
{
    constructor() {
        this.tab = new Array();
    }


    on(eventName, callback) {
        let  newEvent = new MyEvent(eventName,callback);
        this.tab.push(newEvent);
    }


     off(eventName, callback) {
         let i = this.tab.findIndex(x => x.name == eventName)
         this.tab.splice(i,1)
    }



     trigger(eventName, ...parameter) {
         let i = this.tab.findIndex(x => x.name == eventName)
         this.tab[i].callback(...parameter);
    }
}

