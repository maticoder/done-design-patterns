export class Iterator<T> {
    public items: T[];
    public index: number;

    public constructor(items: T[]) {
        this.index = 0;
        this.items = items;
    }

    public first(): T {
        this.reset();
        return this.next();
    }

    public next(): T {
        return this.items[this.index++];
    }

    public hasNext(): boolean {
        return this.index <= this.items.length;
    }

    public reset(): void {
        this.index = 0;
    }

    public each(callback: (item: T) => void): void {
        for (let item: any = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}
