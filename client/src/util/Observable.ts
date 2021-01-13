export default class Observable {
  private observers: any[];

  public constructor() {
    this.observers = [];
  }

  subscribe(f: Function): void {
    this.observers.push(f);
  }

  unsubscribe(f: Function): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== f);
  }

  notify(state: any): void {
    this.observers.forEach((observer) => observer(state));
  }
}
