import { useContext } from 'react';
import './App.css'
import LoginForm from './components/LoginForm';
import Context from './context/Context';

function App() {
  const {state, dispatch} = useContext(Context);

  return(
    <div>
      {state.isLogin ? (
        <>
          <strong>Welcome user</strong>
          <button onClick={() => dispatch({type: "LOGINOUT"})}>Sign Out</button>
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </div>
  )
  
}

export default App