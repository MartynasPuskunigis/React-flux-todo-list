import { Dispatcher } from "simplr-flux";

import {
    TodoAddAction,
    TodoDeleteAction,
    TodoCompletionChangedAction,
    FilterChangedAction,
    CheckboxClickedAction,
    DeleteCheckedAction
} from "./todo-actions";
import { Filter } from "../components/input-view";

export namespace TodoActionsCreators {
    export function addItem(task: string): void {
        Dispatcher.dispatch(new TodoAddAction(task));
    }
    export function deleteItem(taskId: number): void {
        Dispatcher.dispatch(new TodoDeleteAction(taskId));
    }
    export function toggleItemsState(taskId: number): void {
        Dispatcher.dispatch(new TodoCompletionChangedAction(taskId));
    }
    export function filterItems(filtertype: Filter): void {
        Dispatcher.dispatch(new FilterChangedAction(filtertype));
    }
    export function addNewCheckedItem(isChecked: boolean, taskId: number): void {
        Dispatcher.dispatch(new CheckboxClickedAction(isChecked, taskId));
    }
    export function deleteItems(): void {
        Dispatcher.dispatch(new DeleteCheckedAction());
    }
}
