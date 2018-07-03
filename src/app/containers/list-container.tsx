import * as React from "react";
import { Container } from "flux/utils";

import { Task } from "./../contracts/Task";

import { TodoReduceStore } from "./../stores/todo-store";
import { TodoActionsCreators } from "./../actions/todo-actions-creators";
import {
    ListItemView,
    InputItemViewOnDeleteClickedHandler,
    InputItemViewOnTaskClickedHandler,
    InputItemViewOnCheckboxClickedHandler
} from "../components/list-item-view";

interface State {
    tasks: Task[];
}

class TodoContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [TodoReduceStore];
    }

    public static calculateState(state: State): State {
        return {
            tasks: TodoReduceStore.getState().tasksToShow
        };
    }

    protected onDeleteClick: InputItemViewOnDeleteClickedHandler = taskId => {
        TodoActionsCreators.deleteItem(taskId);
    };

    protected onTaskClick: InputItemViewOnTaskClickedHandler = taskId => {
        TodoActionsCreators.toggleItemsState(taskId);
    };

    protected onCheckboxClick: InputItemViewOnCheckboxClickedHandler = (taskId, isChecked) => {
        TodoActionsCreators.addNewCheckedItem(isChecked, taskId);
    };

    public render(): JSX.Element | JSX.Element[] {
        const todoTasks = this.state.tasks.map(task => (
            <ListItemView
                key={`item-${task.id}`}
                task={task}
                onCheckboxClicked={this.onCheckboxClick}
                onDeleteClicked={this.onDeleteClick}
                onTaskClicked={this.onTaskClick}
            />
        ));
        return <div>{todoTasks}</div>;
    }
}
export const TodoContainer = Container.create(TodoContainerClass);
