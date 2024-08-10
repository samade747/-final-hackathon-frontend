import StudentTableAction from "./StudentTableAction";
import "./Student.scss";
import { useEffect, useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import { URL } from "../../Utils/url.js";
import axios from "axios";

const TABLE_HEADS = ["Name", "Course", "Roll Number", "Batch", "Action"];

const api = axios.create({
  baseURL: URL,
});

const StudentList = () => {
  const [data, setData] = useState([]);
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

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/student");
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

    fetchStudents();
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
                {TABLE_HEADS.map((head, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      handleSort(head.toLowerCase().replace(" ", "_"))
                    }
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dataItem) => (
                <tr key={dataItem.RollNumber}>
                  <td>{dataItem.FullName}</td>
                  <td>{dataItem.CourseName}</td>
                  <td>{dataItem.RollNumber}</td>
                  <td>
                    <div className="dt-status">
                      <span className="dt-status-text">
                        {dataItem.BatchNumber}
                      </span>
                    </div>
                  </td>
                  <td className="dt-cell-action">
                    <StudentTableAction student={dataItem} />
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

export default StudentList;
