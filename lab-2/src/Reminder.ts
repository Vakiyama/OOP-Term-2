export default class Reminder {
    private _description: string;
    private _tag: string;
    private _isCompleted: boolean;

    constructor(
        description: string,
        tag: string,
        isCompleted: boolean
    ) {
        this._description = description;
        this._tag = tag;
        this._isCompleted = isCompleted;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(tag: string) {
        this._tag = tag;
    }

    public get isCompleted(): boolean {
        return this._isCompleted;
    }

    public toggleCompletion(): void {
        this._isCompleted = !this._isCompleted;
    }
}
