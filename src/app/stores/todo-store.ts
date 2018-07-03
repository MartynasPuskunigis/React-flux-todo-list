import { ReduceStore, ActionHandler } from "simplr-flux";

import {
    TodoAddAction,
    TodoDeleteAction,
    TodoCompletionChangedAction,
    FilterChangedAction,
    CheckboxClickedAction,
    DeleteCheckedAction
} from "./../actions/todo-actions";

import { Task } from "./../contracts/Task";
import { Filter } from "../components/input-view";

interface StoreState {
    allTasks: Task[];
    tasksToShow: Task[];
    currentFilter: Filter;
    checkedBoxesIds: number[];
}

class TodoReduceStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(TodoAddAction, this.onAddTodo);
        this.registerAction(TodoDeleteAction, this.onDeleteTodo);
        this.registerAction(TodoCompletionChangedAction, this.onTodoCompletionChanged);
        this.registerAction(FilterChangedAction, this.onFilterChanged);
        this.registerAction(CheckboxClickedAction, this.onCheckboxClicked);
        this.registerAction(DeleteCheckedAction, this.onDeleteCheckedClicked);
    }

    private onAddTodo: ActionHandler<TodoAddAction, StoreState> = (action, state) => {
        const newId = Number(new Date().getTime());
        const newTask = {
            id: newId,
            text: action.tasktext,
            isDone: false
        };
        const nextState: StoreState = {
            ...state,
            allTasks: [newTask, ...state.allTasks]
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    private onDeleteTodo: ActionHandler<TodoDeleteAction, StoreState> = (action, state) => {
        const newTasks = state.allTasks.filter(item => item.id !== action.taskId);

        const nextState: StoreState = {
            ...state,
            allTasks: newTasks
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    private onTodoCompletionChanged: ActionHandler<TodoCompletionChangedAction, StoreState> = (action, state) => {
        const newTasks = state.allTasks.map(item => item);
        for (let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].id === action.taskId) {
                newTasks[i].isDone = !newTasks[i].isDone;
            }
        }
        const nextState: StoreState = {
            ...state,
            allTasks: newTasks
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    protected onFilterChanged: ActionHandler<FilterChangedAction, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            currentFilter: action.filter
        };
        return TodoReduceStoreClass.calculateState(nextState);
    };

    protected onCheckboxClicked: ActionHandler<CheckboxClickedAction, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        if (action.event.currentTarget.checked) {
            nextState.checkedBoxesIds.unshift(action.taskId);
        } else {
            nextState.checkedBoxesIds = nextState.checkedBoxesIds.filter(item => item !== action.taskId);
        }

        return nextState;
    };

    protected onDeleteCheckedClicked: ActionHandler<DeleteCheckedAction, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };

        nextState.allTasks = nextState.allTasks.filter(task => {
            for (let i = 0; i < nextState.allTasks.length; i++) {
                if (nextState.checkedBoxesIds.indexOf(task.id) === -1) {
                    nextState.checkedBoxesIds = nextState.checkedBoxesIds.filter(item => item !== task.id);
                    return true;
                }
            }
            return;
        });

        return TodoReduceStoreClass.calculateState(nextState);
    };

    protected static calculateState(state: StoreState): StoreState {
        switch (state.currentFilter) {
            case Filter.Uncompleted: {
                state.tasksToShow = state.allTasks.filter(item => item.isDone !== true);
                break;
            }
            case Filter.Completed: {
                state.tasksToShow = state.allTasks.filter(item => item.isDone !== false);
                break;
            }
            case Filter.ShowAll: {
                state.tasksToShow = state.allTasks;
                break;
            }
        }
        return state;
    }

    public getInitialState(): StoreState {
        return {
            allTasks: [],
            tasksToShow: [],
            currentFilter: Filter.ShowAll,
            checkedBoxesIds: []
        };
    }

    public get Tasks(): Task[] {
        return this.getState().tasksToShow;
    }
}

export const TodoReduceStore = new TodoReduceStoreClass();
