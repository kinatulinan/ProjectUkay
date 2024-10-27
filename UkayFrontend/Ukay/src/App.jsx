import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UkayAppBar from './UkayAppBar.jsx'
import UkayProducts from './UkayProducts.jsx'
import HomePage from './HomePage.jsx'
import ProductsPage from './ProductsPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <UkayAppBar> </UkayAppBar>
        <HomePage> </HomePage>
        <br></br>
        <hr></hr>
        

    </>
  );
}

export default App
