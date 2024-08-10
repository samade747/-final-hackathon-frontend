import React, { useEffect, useState } from "react";
import BatchTableAction from "./BatchTableAction";
import "./Batch.scss";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import Format from "date-fns/format";
const TABLE_HEADS = [
  "BatchNumber",
  "CourseName",
  "Started From",
  "EndTime",
  "Action",
];

const api = axios.create({
  baseURL: URL,
});

const BatchList = () => {
  const [data, setData] = useState([]);

  const getBatch = async () => {
    try {
      const response = await api.get("/batch");
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBatch();
  }, []);

  // const handleSort = (key) => {
  //   let direction = "ascending";
  //   if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
  //     direction = "descending";
  //   }
  //   setSortConfig({ key, direction });

  //   const sortedData = [...data].sort((a, b) => {
  //     if (a[key] < b[key]) {
  //       return direction === "ascending" ? -1 : 1;
  //     }
  //     if (a[key] > b[key]) {
  //       return direction === "ascending" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  //   setData(sortedData);
  // };

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const filteredData = data.filter((item) =>
  //   Object.values(item).some((val) =>
  //     val.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  return (
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">
            <input
              type="text"
              placeholder="Search Data"
              // value={searchTerm}
              // onChange={handleSearch}
            />
          </h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      handleSort(th.toLowerCase().replace(" ", "_"))
                    }
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((dataItem, index) => (
                <tr key={index}>
                  <td>{dataItem.BatchNumber}</td>
                  <td>{dataItem.CourseName}</td>
                  <td>
                    <div className="dt-status">
                      <span className="dt-status-text">
                        {Format(new Date(dataItem.StartedFrom), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="dt-status">
                      <span className="dt-status-text">
                        {Format(new Date(dataItem.EndDate), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </td>
                  <td className="dt-cell-action">
                    <BatchTableAction dataItem={dataItem} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default BatchList;
