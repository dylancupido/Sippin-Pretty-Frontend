import { useState } from 'react';
import { Calculator }  from './Components/TillPage';
import { PaymentOptions } from './Components/TillPage';
import { Menu } from './Components/TillPage.jsx';
import './Styles/Till.css';


function App() {
  return (
   <div>

        <Calculator />
        <PaymentOptions />
        <Menu />


    </div>
  );
}
export default App;



