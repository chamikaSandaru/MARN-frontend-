import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello world</h1>
        <button className='UserButton' onClick={() => navigate('/user')}>Users</button>
      </header>
    </div>
  );
}

export default App;
