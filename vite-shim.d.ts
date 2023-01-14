declare module "*?worker" {
  class CustomizedWorker extends Worker {
    constructor();
  }
  export = CustomizedWorker;
}
