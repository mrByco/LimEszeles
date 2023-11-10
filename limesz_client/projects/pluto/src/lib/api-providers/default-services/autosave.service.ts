import { Injectable } from "@angular/core";

@Injectable()
export class AutosaveService {
    public saving: boolean = false;
    private items: AutosaveItem[] = [];

    private saveIntervalMs: number = 1000;
    private detectIntervalMs: number = 100;

    private detectInterval: any = null;
    private saveInterval: any = null;

    public register(item: any, saveMethod: () => Promise<void | any>, onSaveStateChanges?: (saving: boolean) => (any | void)) {
        this.items.push({ saveMethod, item, originalState: JSON.stringify(item), onSaveStateChanges, saving: false });
        this.checkTimerState();
    }

    public unregister(item: any) {
        let i = this.items.findIndex(i => i.item == item);
        if (i == -1) return;
        this.saveItemIfNeeded(this.items[i]);
        this.items.splice(i, 1);
        this.checkTimerState();
    }

    private checkTimerState() {
        if (this.items.length > 0 && !this.detectInterval) {
            this.startTimers();
        }
        else if (this.items.length == 0 && this.detectInterval) {
            this.stopTimers();
        }
    }

    private startTimers() {
        this.detectInterval = setInterval(() => { this.detectChanges() }, this.detectIntervalMs);
        this.saveInterval = setInterval(() => { this.saveWhatIsNeeded() }, this.saveIntervalMs);
    }

    private stopTimers() {
        this.saving = false;
        clearInterval(this.detectInterval);
        clearInterval(this.saveInterval);
        this.detectInterval = null;
        this.saveInterval = null;
    }

    private saveWhatIsNeeded() {
        this.items.forEach(async i => {
            await this.saveItemIfNeeded(i);
        });
    }

    private async saveItemIfNeeded(i: AutosaveItem) {
        if (JSON.stringify(i.item) != i.originalState) {
            await this.saveItem(i);
        }
    }

    private async saveItem(item: AutosaveItem) {
        if (item.saving) return;
        item.saving = true;
        item.onSaveStateChanges?.(true);
        await item.saveMethod();
        item.originalState = JSON.stringify(item.item);
        item.saving = false;
        item.onSaveStateChanges?.(false);
    }

    private detectChanges() {
        this.saving = this.items.find(i => JSON.stringify(i.item) != i.originalState) != null;
    }
}

export interface AutosaveItem {
    saveMethod: () => Promise<void | any>,
    item: any,
    originalState: string,
    onSaveStateChanges?: (saving: boolean) => (any | void)
    saving: boolean
}