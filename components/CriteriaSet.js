import React, { useState, useRef } from "react";

import style from "../styles/CriteriaSet.module.css";

export default function CriteriaSet({ criteria, setCriteria }) {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("subject");
  const [orderOption, setOrderOption] = useState("time");
  const [desc, setDesc] = useState(false);
  const orderRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newCriteria = '?';
    if (searchOption === "author") newCriteria += `author=${search}`;
    if (searchOption === "subject") newCriteria += `subject=${search}`;
    if (orderOption) newCriteria += `&order=${orderOption}`;
    if (desc) newCriteria += `&desc=${desc ? "0" : "1"}`;
    newCriteria !== criteria && setCriteria(newCriteria);
  };
  const expandSortingOptions = () => {
    orderRef.current.className == `${style.orderOptions}`
      ? (orderRef.current.className = `${style.orderOptions} ${style.hidden}`)
      : (orderRef.current.className = `${style.orderOptions}`);
  };
  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.searchOptions}>
          <input
            type="submit"
            value=""
            className={`${style.button} ${style.searchButton}`}
          />
          <input
            className={style.searchBar}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className={style.input}
            type="radio"
            name="search"
            value="author"
            id="authorSearch"
            checked={searchOption === "author"}
            onChange={(e) => setSearchOption(e.target.value)}
          />
          <label className={style.label} htmlFor="authorSearch">
            Author
          </label>
          <input
            className={style.input}
            type="radio"
            name="search"
            value="subject"
            id="subjectSearch"
            checked={searchOption === "subject"}
            onChange={(e) => setSearchOption(e.target.value)}
          />
          <label className={style.label} htmlFor="subjectSearch">
            Subject
          </label>
        </div>
        <div className={`${style.orderOptions} ${style.hidden}`} ref={orderRef}>
          <span>Order by:</span>
          <input
            className={style.input}
            type="radio"
            name="order"
            value="author"
            id="authorOrder"
            checked={orderOption === "author"}
            onChange={(e) => setOrderOption(e.target.value)}
          />
          <label className={style.label} htmlFor="authorOrder">
            Author
          </label>
          <input
            className={style.input}
            type="radio"
            name="order"
            value="subject"
            id="subjectOrder"
            checked={orderOption === "subject"}
            onChange={(e) => setOrderOption(e.target.value)}
          />
          <label className={style.label} htmlFor="subjectOrder">
            Subject
          </label>
          <input
            className={style.input}
            type="radio"
            name="order"
            value="time"
            id="timeOrder"
            checked={orderOption === "time"}
            onChange={(e) => setOrderOption(e.target.value)}
          />
          <label className={style.label} htmlFor="timeOrder">
            Time
          </label>
          <input
            type="checkbox"
            name="desc"
            id="descOrder"
            checked={desc}
            onChange={(e) => setDesc(!desc)}
          />
          <label htmlFor="descOrder">Descendent</label>
        </div>
        <input
          className={`${style.button} ${style.sortButton}`}
          type="button"
          onClick={expandSortingOptions}
        />
      </form>
    </div>
  );
}
