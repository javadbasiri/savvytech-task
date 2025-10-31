import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react/jsx-runtime';
import Home from './pages/home';

const App = () => {
    return (
        <Fragment>
            <Home />

            <Toaster />
        </Fragment>
    );
};

export default App;
