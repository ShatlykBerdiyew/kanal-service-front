import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { Pagination } from "./components/Pagination";
import { motion } from "framer-motion";
import { columns, options, base_url } from "./data";

const App = () => {
  const [delivery, setdelivery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("initial");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [filterData, setFilterData] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [filterParam, setFilterParam] = useState({
    colm: "",
    term: "",
    data: "",
  });

  const handleFilter = () => {
    if (selectedRow && selectedTerm && filterData) {
      setFilterParam({
        colm: selectedRow,
        term: selectedTerm,
        data: selectedRow === "title" ? filterData : Number(filterData),
      });
      setFilterOpen(false);
    } else {
      alert("Запрос не полен");
    }
  };

  const fetchData = () => {
    fetch(
      `${base_url}/api/delivery/?page=${selectedPage}&size=10&colm=${filterParam.colm}&term=${filterParam.term}&data=${filterParam.data}`
    )
      .then((res) => res.json())
      .then((json) => {
        setdelivery(json.rows);
        setPageCount(Math.ceil(json.counts.count / 10));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [selectedPage, filterParam]);

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev);
    setSelectedRow("initial");
    setSelectedTerm("");
    setFilterData("");
    setSelectedPage(1);
  };

  console.log("Selected Row: ", selectedRow);

  return (
    <div className="container">
      {/*  ------------------------Начало  фильтрации  -------------------------------------*/}
      <h3 onClick={() => handleFilterOpen()}>Filter</h3>
      {filterOpen && (
        <motion.div layout className="filter">
          <div className="rows">
            <p>Выбор колонки:</p>
            {columns.map((col) => (
              <span
                key={col}
                className={selectedRow === col ? "active" : ""}
                onClick={() => setSelectedRow(col)}
              >
                {col}
              </span>
            ))}
          </div>
          <motion.div layout className="terms">
            <p>Выбор условия:</p>
            {options[selectedRow].map((item, i) => (
              <span
                key={i}
                className={selectedTerm === item.value ? "active" : ""}
                onClick={() => setSelectedTerm(item.value)}
              >
                {item.title}
              </span>
            ))}
          </motion.div>
          <div className="input">
            <input
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
              type="text"
            />
            <button onClick={() => handleFilter()}>Search</button>
          </div>
        </motion.div>
      )}
      {/*  ------------------------Конец  фильтрации  -------------------------------------*/}
      {loading ? (
        <React.Fragment>Loading</React.Fragment>
      ) : (
        <React.Fragment>
          <Table rows={delivery} />
          <Pagination
            pageCount={pageCount}
            setSelectedPage={setSelectedPage}
            selectedPage={selectedPage}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
