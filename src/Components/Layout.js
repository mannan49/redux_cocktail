import React from 'react'
import Footer from './Footer';
import Header from './Header';
import "../App.css"

const Layout = ( {children} ) => {
  return (
    <>
    <Header />
    <div className='content-container'> {children} </div>
    <Footer />
    </>
  )
}

export default Layout