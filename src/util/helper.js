
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