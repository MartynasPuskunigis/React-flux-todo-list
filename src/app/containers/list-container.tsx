import * as React from "react";
import { Container } from "flux/utils";

import { Task } from "./../contracts/Task";

import { TodoReduceStore } from "./../stores/todo-store";
import { TodoActionsCreators } from "./../actions/todo-actions-creators";

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

    protected onDeleteClick(event: React.MouseEvent<HTMLButtonElement>, taskId: number): void {
        TodoActionsCreators.todoDeleted(taskId);
    }

    protected onTaskClick(event: React.MouseEvent<HTMLDivElement>, taskId: number): void {
        TodoActionsCreators.todoCompletionChanged(taskId);
    }

    protected onCheckboxClick(event: React.MouseEvent<HTMLInputElement>, taskId: number): void {
        TodoActionsCreators.todoCheckboxClicked(event, taskId);
    }

    public render(): JSX.Element | JSX.Element[] {
        const todoTasks = this.state.tasks.map(task => (
            <div key={task.id}>
                <div>
                    <input onClick={event => this.onCheckboxClick(event, task.id)} type="checkbox" />
                </div>
                {task.isDone ? (
                    <div onClick={event => this.onTaskClick(event, task.id)}>
                        <del>{task.text}</del>
                    </div>
                ) : (
                    <div onClick={event => this.onTaskClick(event, task.id)}>{task.text}</div>
                )}
                <div>
                    <button onClick={event => this.onDeleteClick(event, task.id)}>X</button>
                </div>
            </div>
        ));
        return <div>{todoTasks}</div>;
    }
}
export const TodoContainer = Container.create(TodoContainerClass);
