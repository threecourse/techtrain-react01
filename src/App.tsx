import {FC} from 'react';
import { HashRouter as Router } from 'react-router-dom';
import {AppRoutes} from "./route";
import "./app.css"

// const title = import.meta.env.VITE_APP_TITLE;
console.dir(import.meta.env);

const App: FC = () => {
    return (
        <Router>
            <AppRoutes></AppRoutes>
        </Router>
    )
};

export default App;
