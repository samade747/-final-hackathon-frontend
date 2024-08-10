import { useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";

const TABLE_HEADS = ["ID", "Student Name", "Batch No", "Teacher Name", "Timing", "Days"];

const TABLE_DATA = [
  {
    ID: 909090,
    StudentName: "Samad Bhai",
    BatchNo: "10",
    TeacherName: "Innosufiyan", 
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",

    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "Sami",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",


    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "Shahzad",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",

    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "Tofee",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",

    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "Ahtasham",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",

    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "Umair",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",

    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "Kamil",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",
    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "yumna",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",
    
    
    Batch: "10",
  },
  {
    ID: 909090,
    StudentName: "marya",
    BatchNo: "10",
    TeacherName: "Innosufiyan",
    Timing: "10:00 am - 11:00 am",
    Days: "Saturday, Monday, Wednesday",
    
    
    Batch: "10",
  },
];

const SlotsList = () => {
  const [data, setData] = useState(TABLE_DATA);

  return (
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">
          </h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
               {TABLE_HEADS?.map((th, index) => (
                  <th
                    key={index}
                  >
                    {th}
                  </th>
                ))}
              </tr>
              <tr>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.ID}</td>
                  <td>{item?.StudentName}</td>
                  <td>{item?.BatchNo}</td>
                  <td>{item?.TeacherName}</td>
                  <td>{item?.Timing}</td>
                  <td align="center">{item?.Days}</td>
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
