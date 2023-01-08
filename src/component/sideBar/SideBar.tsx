import { Stack } from '@mui/material'
import React from 'react'
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';

const SideBar = () => {
  return (

    <div className="wrapper">
 
      <div className="sidebar">
        <ul>
            <li>
                <a href="#" className="active">
              <span className="icon"><BrowseGalleryIcon/></span>
                    <span className="item">Home</span>
                </a>
            </li>
            <li>
                <a href="#" className="active">
                    <span className="icon"><BrowseGalleryIcon/></span>
                    <span className="item">Home</span>
                </a>
            </li>
            <li>
                <a href="#" className="active">
                    <span className="icon"><BrowseGalleryIcon/></span>
                    <span className="item">Home</span>
                </a>
            </li>
          </ul>
      </div>
    </div>
  )
}

export default SideBar