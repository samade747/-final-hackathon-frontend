import React, { useEffect, useState } from "react";
import axios from "axios";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import { URL } from "../../Utils/url.js";
import SlotsTableAction from "./SlotsTableAction";
import "./Slot.scss";

const api = axios.create({
  baseURL: URL,
});

const TABLE_HEADS = ["Course", "Time", "ID", "Batch", "Action"];

const SlotsList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await api.get("/slot");

        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };

    fetchSlots();
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data?.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">
            <input
              type="text"
              placeholder="Search Data"
              value={searchTerm}
              onChange={handleSearch}
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
              {filteredData?.map((dataItem) => (
                <tr key={dataItem.id}>
                  <td>{dataItem.CourseName}</td>
                  <td>{dataItem.StartTime} to {dataItem.EndTime}</td>
                  <td>{dataItem.SlotId}</td>
                  <td>
                    <div className="dt-status">
                      <span></span>
                      <span className="dt-status-text">
                        {dataItem.BatchNumber}
                      </span>
                    </div>
                  </td>
                  <td className="dt-cell-action">
                    <SlotsTableAction data={dataItem} />
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

export default SlotsList;