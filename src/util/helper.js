
export const toOBJ = (arr) => {
   return arr.reduce((map,item)=>{
        let id = item.id;
        map[id] = item
        return map
   },{})
}

export const toARR = (obj) =>{
   return Object.keys(obj).map(key => obj[key]);
}

export const findParent = (currentNode,wrap)=>{
   let newNode = currentNode;
  
   while(newNode !==null) {
  
      if(newNode.classList.contains(wrap)){
        
         return newNode;
      }
      newNode = newNode.parentNode;
   }
   return false;
}