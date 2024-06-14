import React from 'react';
import Layout from '../Layouts/layout';
import AdminMenu from './AdminMenu';
const AdminDashboard = () => {
  return (
    <>
    <Layout>
        <div style={{height:"80vh"}} className='container-fluid'
         >
            <AdminMenu/>
        </div>
    </Layout>
      
    </>
  );
}

export default AdminDashboard;
