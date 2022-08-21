import React, { useEffect } from "react";
import { Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";
import MyYoutube from "./MyYoutube";

const NotLogged = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    
    <Routes>
      <Route path="/my-youtube/:link" element={<MyYoutube />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
};

const Body = () => {
  return false? null : <NotLogged />;
};

export default Body;