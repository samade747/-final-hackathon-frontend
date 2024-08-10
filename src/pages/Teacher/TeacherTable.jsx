import TeacherTableAction from "./TeacherTableAction";
import "./Teacher.scss";
// import { AreaTop } from "../../components";
import { useState,useEffect } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import { URL } from "../../Utils/url.js";
import axios from "axios";

const TABLE_HEADS = ["Name", "Email", "teacherOf", "Teacher Id", "Action"];

const api = axios.create({
  baseURL: URL,
});

const TeacherList = () => {
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
    const fetchTeacher = async () => {
      try {
        const res = await api.get("/teacher");
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

    fetchTeacher();
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
                    <td>{dataItem.TeacherName}</td>
                    <td>{dataItem.Email}</td>

                    <td>
                      <div className="dt-status">
                        <span
                        // className={`dt-status-dot dot-${dataItem.Batch}`}
                        ></span>
                        <span className="dt-status-text">
                          {dataItem.TeacherOf}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="dt-status">
                        <span
                        // className={`dt-status-dot dot-${dataItem.Batch}`}
                        ></span>
                        <span className="dt-status-text">
                          {dataItem.TeacherId}
                        </span>
                      </div>
                    </td>

                    <td className="dt-cell-action">
                      <TeacherTableAction dataItem={dataItem}/>
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

export default TeacherList;
