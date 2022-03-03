import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <h3>layout</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to="/">首页</Link>
        <Link to="/home">home</Link>
        <Link to="/home/child">home child</Link>
        <Link to="/home/child/hello-world">home hello-world</Link>
        <Link to="/home/child/1234">home name</Link>
        <Link to="/about">about</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
