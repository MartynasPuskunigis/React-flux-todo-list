import { Filter } from "../components/input-view";

export class TodoAddAction {
    constructor(private task: string) {}

    public get tasktext(): string {
        return this.task;
    }
}
export class TodoDeleteAction {
    constructor(private id: number) {}

    public get taskId(): number {
        return this.id;
    }
}
export class TodoCompletionChangedAction {
    constructor(private id: number) {}

    public get taskId(): number {
        return this.id;
    }
}
export class FilterChangedAction {
    constructor(private filtertype: Filter) {}

    public get filter(): Filter {
        return this.filtertype;
    }
}
export class CheckboxClickedAction {
    constructor(private isCheckboxChecked: boolean, private id: number) {}

    public get isChecked(): boolean {
        return this.isCheckboxChecked;
    }

    public get taskId(): number {
        return this.id;
    }
}
export class DeleteCheckedAction {}
