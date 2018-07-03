import * as React from "react";

import { TodoActionsCreators } from "./../actions/todo-actions-creators";

export enum Filter {
    ShowAll,
    Uncompleted,
    Completed
}

interface State {
    currentInputValue: string;
}

export class InputView extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentInputValue: ""
        };
    }

    protected handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        this.setState({
            currentInputValue: event.target.value
        });
    };

    protected addNewTodo(newTodoText: string): void {
        if (newTodoText.length === 0) {
            alert("Hey! Write something!");
        } else {
            TodoActionsCreators.todoAdded(newTodoText);
        }
    }

    protected resetInputText(): void {
        this.setState({
            currentInputValue: ""
        });
    }

    protected onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        this.addNewTodo(this.state.currentInputValue);
        this.resetInputText();
    };

    protected handleKeyClick: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === "Enter") {
            this.addNewTodo(this.state.currentInputValue);
            this.resetInputText();
        }
    };

    protected onFilterClick(event: React.MouseEvent<HTMLButtonElement>, filtertype: Filter): void {
        TodoActionsCreators.filterClicked(filtertype);
    }

    protected onDeleteCheckedClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        TodoActionsCreators.deleteCheckedClicked();
    };

    public render(): JSX.Element {
        return (
            <div>
                <div>
                    <input
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyClick}
                        placeholder="Add a task..."
                        value={this.state.currentInputValue}
                    />
                </div>
                <div>
                    <button onClick={this.onSubmitClick}>Submit</button>
                    <div>
                        <button onClick={event => this.onFilterClick(event, Filter.Completed)}>Show only completed</button>
                        <button onClick={event => this.onFilterClick(event, Filter.Uncompleted)}>Show only uncompleted</button>
                        <button onClick={event => this.onFilterClick(event, Filter.ShowAll)}>Show all</button>
                        <button onClick={this.onDeleteCheckedClick}>Delete checked</button>
                    </div>
                </div>
            </div>
        );
    }
}
