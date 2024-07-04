
import './App.css';
// import Todos from './component/Todos';
import Todosdemo from './component/Todosdemo';
import Login from './component/Login';

import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state)=>state.auth.user)
  // console.log(user)
  return (
    <div >

{user? 
<Todosdemo/>
:
<Login/>  
}
    </div>
  )
}

export default App;
