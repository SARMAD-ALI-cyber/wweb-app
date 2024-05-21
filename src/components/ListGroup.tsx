import { Fragment } from "react/jsx-runtime";
import { MouseEvent, useState } from "react";
interface ListGroupProps{
    items: string[];
    heading:string;
    onSelect: (item: string)=>void

}


function ListGroup({items,heading,onSelect}:ListGroupProps) {
    const [selectedIndex,setSelectedIndex]=useState(-1)
  return (
    <Fragment>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No item found</p> : null}
      <ul className="list-group">
        {items.map((item,index) => (
          <li className={selectedIndex===index? "list-group-item active": "list-group-item"} 
          onClick={()=>{setSelectedIndex(index)
            onSelect(item)
          }}
          key={item}>
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
