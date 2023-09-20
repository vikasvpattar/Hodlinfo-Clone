import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setdata] = useState([]);

  // useeffect is used to fetch data from backend
  useEffect(() => {
    fetch("http://localhost:4000/api", { method: "GET" })
      .then((response) => response.json())
      .then((info) => {
        // the data is stored in the data state
        setdata(info);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="tabledata container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Last</th>
              <th>Buy/Sell</th>
              <th>Sell</th>
              <th>Volume</th>
              <th>Base Unit</th>
            </tr>
          </thead>
          <tbody>
            {/* the data is fetched from data and rendered into table */}
            {data.map((i, j) => {
              return (
                <tr key={j}>
                  <td>{j + 1}</td>
                  <td>{i.name}</td>
                  <td>{i.last}</td>
                  <td>₹ {i.buy}</td>
                  <td>₹ {i.sell}</td>
                  <td>{i.volume}</td>
                  <td>{i.base_unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
