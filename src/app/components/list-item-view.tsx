import * as React from "react";
import { Task } from "../contracts/Task";

export type InputItemViewOnCheckboxClickedHandler = (taskId: number, isChecked: boolean) => void;
export type InputItemViewOnTaskClickedHandler = (taskId: number) => void;
export type InputItemViewOnDeleteClickedHandler = (taskId: number) => void;

interface Props {
    task: Task;
    onCheckboxClicked: InputItemViewOnCheckboxClickedHandler;
    onTaskClicked: InputItemViewOnTaskClickedHandler;
    onDeleteClicked: InputItemViewOnDeleteClickedHandler;
}

export class ListItemView extends React.Component<Props> {

    protected onCheckboxClick(event: React.MouseEvent<HTMLInputElement>, taskId: number): void {
        this.props.onCheckboxClicked(taskId, event.currentTarget.checked);
    }

    protected onTaskClick(event: React.MouseEvent<HTMLDivElement>, taskId: number): void {
        this.props.onTaskClicked(taskId);
    }

    protected onDeleteClick(event: React.MouseEvent<HTMLButtonElement>, taskId: number): void {
        this.props.onDeleteClicked(taskId);
    }

    public render(): JSX.Element | JSX.Element[] {
        return (
            <div>
                <div>
                    <input onClick={event => this.onCheckboxClick(event, this.props.task.id)} type="checkbox" />
                </div>
                {this.props.task.isDone ? (
                    <div onClick={event => this.onTaskClick(event, this.props.task.id)}>
                        <del>{this.props.task.text}</del>
                    </div>
                ) : (
                    <div onClick={event => this.onTaskClick(event, this.props.task.id)}>{this.props.task.text}</div>
                )}
                <div>
                    <button onClick={event => this.onDeleteClick(event, this.props.task.id)}>X</button>
                </div>
            </div>
        );
    }
}
