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

    protected onCheckboxClick: React.MouseEventHandler<HTMLInputElement> = event => {
        this.props.onCheckboxClicked(this.props.task.id, event.currentTarget.checked);
    }

    protected onTaskClick: React.MouseEventHandler<HTMLDivElement> = event => {
        this.props.onTaskClicked(this.props.task.id);
    }

    protected onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        this.props.onDeleteClicked(this.props.task.id);
    }

    public render(): JSX.Element | JSX.Element[] {
        return (
            <div>
                <div>
                    <input type="checkbox" onClick={this.onCheckboxClick} />
                </div>
                {this.props.task.isDone ? (
                    <div onClick={this.onTaskClick}>
                        <del>{this.props.task.text}</del>
                    </div>
                ) : (
                    <div onClick={this.onTaskClick}>{this.props.task.text}</div>
                )}
                <div>
                    <button onClick={this.onDeleteClick}>X</button>
                </div>
            </div>
        );
    }
}
