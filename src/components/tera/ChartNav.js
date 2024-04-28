import React, { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import {  setId } from "../../redux/features/chartSlice";

function ChartNav({ items, selected }) {
  const [list, setList] = useState(items);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    setList(items);
  }, [items]);
  return (
    <div>
      <div className=" text-white bg-indigo-900 h-screen">
        <h3 className="text-xl font-bold pt-12 text-center">Danh sách</h3>
        <ul className="mt-8 leading-6">
          {list.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                dispatch(setId(item.id));
                setSelectedItem(item.id);
                selected(item.id);
              }}
              className={`hover:bg-indigo-300 hover:cursor-pointer pl-12 mx-6 h-10 pt-2 rounded-md  ${
                item.id === selectedItem ? "bg-indigo-500" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChartNav;
