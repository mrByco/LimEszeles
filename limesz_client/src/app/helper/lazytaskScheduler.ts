export class LazyTaskScheduler {
    private called: boolean = false;
    private running: boolean = false;


    constructor(private task: () => Promise<any | void>) {

    }

    public async call() {
        if (this.running) {
            this.called = true;
            return;
        }
        this.running = true;
        await this.task();
        this.running = false;
        if (this.called) {
            this.called = false;
            this.call();
        }
    }
}