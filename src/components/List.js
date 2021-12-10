import React from "react";
import "./index.css";

export default function List({ data, expandedListItems, onItemClick }) {
  return (
    <ul className="list">
      {data.map((item) => {
        const isExpanded = expandedListItems.includes(item.name);
        const hasItems = !!item?.data;
        return (
          <li
            className={`list-item-${isExpanded ? "expanded" : "collapsed"}`}
            key={item.name}
            onClick={(event) => onItemClick(event, item.name, hasItems)}
          >
            {item.name}
            {item?.data && isExpanded && (
              <List
                data={item?.data}
                expandedListItems={expandedListItems}
                onItemClick={onItemClick}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
