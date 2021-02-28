import { useEffect, useRef } from "react";
const { remote } = window.require("electron");
const { Menu, MenuItem } = remote;

const useContentMenu = (contextArr, wrap) => {
  let contextNode = useRef(null);
  useEffect(() => {
    const menu = new Menu();
    contextArr.map((item) => {
      menu.append(new MenuItem(item) );
    });
    const handleContextMenu = (e) => {
      
        if (document.querySelector(wrap).contains(e.target)) {
           
          contextNode.current = e.target;
          menu.popup({
            window: remote.getCurrentWindow(),
          });
        }
      };
      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
      };
  });
  return contextNode;

};

export default useContentMenu;
