import './App.css';
import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
    <div className="App bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 dark:from-dark-100 dark:to-dark-100 ">
      <Header/>
      <AllRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
