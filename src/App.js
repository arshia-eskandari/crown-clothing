import Directory from './components/directory/directory.component';
import { CATEGORIES } from './config';

const App = () => {
    return <Directory categories={CATEGORIES}/>;
};

export default App;
