import React, { useState } from "react";
import { useHistory } from "react-router";

import "./index.css";
import List from "./List";

const yearData = [
  {
    name: "Latest",
    data: [{ name: 2015 }, { name: 2016 }, { name: 2017 }, { name: 2018 }],
  },
  {
    name: "Old",
    data: [{ name: 2000 }, { name: 2001 }, { name: 2002 }, { name: 2003 }],
  },
  {
    name: "EverGreen",
    data: [{ name: 1990 }, { name: 1991 }, { name: 1992 }, { name: 1993 }],
  },
];

export default function Layout({ children }) {
  const [expandedItems, setExpandedItems] = useState(["Latest", "Old"]);
  const history = useHistory();

  const handleItemClick = (event, itemName, flag = true) => {
    event.stopPropagation();

    if (flag) {
      if (expandedItems.includes(itemName)) {
        const expanded = expandedItems.filter((item) => item != itemName);
        setExpandedItems([...expanded]);
      } else {
        setExpandedItems([...expandedItems, itemName]);
      }
    } else {
      history.push("/movies?year=" + itemName);
    }
  };
  return (
    <div className="layout">
      <header className="header">
        <h1>Search Movies</h1>
      </header>
      <nav className="navigation">
        <List
          data={yearData}
          onItemClick={handleItemClick}
          expandedListItems={expandedItems}
        />
      </nav>
      <main className="main">{children}</main>
    </div>
  );
}
