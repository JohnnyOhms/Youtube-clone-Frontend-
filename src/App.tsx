import React from 'react';
import Navbar from './component/Navbar/Navbar';
import SideBar from './component/sideBar/SideBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Category from './component/categories/category';

function App() {

   const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#d88507",
      },
    },
   } );
  
  return (
    <ThemeProvider theme={theme}>
      {/* <Navbar /> */}
      <SideBar />
      <Category/>
    </ThemeProvider>
  );
}

export default App;
