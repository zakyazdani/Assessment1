import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ChartsAndMaps from '../Components/ChartsAndMaps';
//import Contacts from '../Components/Contacts';
import Contacts from '../Components/Contact';
import CreateContact from '../Components/CreateContacts';

const Routers = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
          {/* <Route path="/" element={<Contacts />} /> */}
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<ChartsAndMaps />} />
          <Route path="/contacts/create" element={<CreateContact />} />
          <Route path="/contacts/edit" element={<CreateContact edit />} />
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default Routers;