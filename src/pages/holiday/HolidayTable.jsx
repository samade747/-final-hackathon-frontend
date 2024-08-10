import "./HoliDay.scss";
import { useEffect, useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import HolidayTableAction from "./HoliDayTableAction";
import axios from "axios";
import { URL } from "../../Utils/url";
// import HolidayTableAction from "./HolidayTableAction";
// import HolidayTableAction from "./HolidayTableAction.jsx";
// import HoliDayTableAction from "./HolidayTableAction";

const TABLE_HEADS = ["Day", "Reason", "Action"];
const api = axios.create({
  baseURL: URL,
});
const HoliDaysList = () => {
  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

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

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const res = await api.get("/holiday");
        if (Array.isArray(res.data.data)) {
          setData(res.data.data);
          console.log(res.data.data);
        } else {
          console.error("Expected an array but got:", res.data);
          setData([]);
        }
      } catch (err) {
        console.log(err);
        setData([]); // Set to an empty array in case of error
      }
    };

    fetchHoliday();
  }, []);
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
              {filteredData?.map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    <td>{dataItem.Date.slice(0, 10)}</td>
                    <td>{dataItem.Name}</td>


                    <td className="dt-cell-action">
                      <HolidayTableAction data={dataItem} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HoliDaysList;
