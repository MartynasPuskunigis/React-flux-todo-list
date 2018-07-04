import * as React from "react";
import * as ReactDOM from "react-dom";

import { InputView } from "./components/input-view";
import { ListView } from "./components/list-view";

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div>
                <div>
                    <InputView />
                </div>
                <div>
                    <ListView />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
