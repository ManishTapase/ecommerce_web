import React from 'react';
import Helmet from 'react-helmet'
import Header from './Header';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
const Layout = ({children,description,keywords,titles,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='UTF-8'/>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
        <meta name='author' content={author}/>
        <title>{titles}</title>
      </Helmet>
      <Header/>
      <section className="mainview">
        <ToastContainer />
        <main style={{ height: "max-content" }}>{children}</main>
      </section>
        <Footer />
    </div>
  );
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack devlopment",
    keywords: "mern react node mongoose",
    author: "manish",
  };
  export default Layout;
