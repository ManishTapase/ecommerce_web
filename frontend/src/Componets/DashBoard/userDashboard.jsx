import React from 'react';
import Layout from '../../Componets/Layouts/layout';
import { useAuth } from '../../Contexts/AuthContext';
import UserMenu from './UserMenu';
const UserDashboard = () => {
    const [auth,setAuth]=useAuth()
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div>
            <UserMenu/>
          </div>
        </div>
      </div>
      
    </Layout>
  );
}

export default UserDashboard;
