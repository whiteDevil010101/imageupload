import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginForm from './component/LoginForm';
import Imgupload from './component/Imgupload';
import './App.css';
import Home from './component/Home';
import ImageList from './component/ImageList';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <LoginForm />
    <Routes>   
    <Route path="Home" element={ <Home/>}/>
    <Route path="Imgupload" element={ <Imgupload/>}/>
    <Route path="ImageList" element={ <ImageList/>}/>
      
        
 
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
