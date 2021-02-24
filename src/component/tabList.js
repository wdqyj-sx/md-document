import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimesCircle,faDotCircle } from "@fortawesome/free-solid-svg-icons";
import "./tabList.scss";
const classNames = require('classnames');

const TabList = ({ activeId,editId, openFiles, selectActive, deleteTab }) => { 
  
  return (
    <ul className="nav nav-pills">
      {openFiles.map((item) => {
           const tabC = classNames({
            'nav-link':true,
            'active':activeId===item.id,
            'edit':editId.includes(item.id),
          
             
        })
        return (
          <li className="nav-item" key={item.id}>
            <a className={tabC} href="#">
             <span className = "mr-2" onClick = {()=>{selectActive(item.id)}}> {item.title}</span>
             <span className="icon-tab" onClick = {()=>{deleteTab(item.id)}}> 
              {
                editId.includes(item.id) ?<FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>:<FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
              }
             </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

TabList.prototype = {
  activeId: PropTypes.string,
  eidtId:PropTypes.array,
  openFiles: PropTypes.array,
  selectActive: PropTypes.func,
  deleteTab: PropTypes.func,
};

TabList.defaultProps = {
  openFiles: [],
};

export default TabList;
