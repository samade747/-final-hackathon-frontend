import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import axios from "axios";
import { URL } from "../../../Utils/url";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: URL,
});

const AreaCards = () => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const [studentPercentage, setStudentPercentage] = useState(0);
  const [teacherPercentage, setTeacherPercentage] = useState(0);
  const [coursesPercentage, setCoursesPercentage] = useState(0);

  const maxValue = 5; // Replace this with the actual maximum value if you have one

  useEffect(() => {
    const fetchTotalStudent = async () => {
      const { data } = await api.get("/student");
      const studentCount = data?.data?.length || 0;
      setTotalStudent(studentCount);
      setStudentPercentage((studentCount / maxValue) * 100);
    };

    const fetchTotalTeacher = async () => {
      const { data } = await api.get("/teacher");
      const teacherCount = data?.data?.length || 0;
      setTotalTeacher(teacherCount);
      setTeacherPercentage((teacherCount / maxValue) * 100);
    };

    const fetchTotalCourses = async () => {
      const { data } = await api.get("/course");
      const courseCount = data?.data?.length || 0;
      setTotalCourses(courseCount);
      setCoursesPercentage((courseCount / maxValue) * 100);
    };

    fetchTotalStudent();
    fetchTotalTeacher();
    fetchTotalCourses();
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={teacherPercentage} // Use calculated percentage
        cardInfo={{
          title: "Total Teacher",
          value: totalTeacher,
          text: "",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={studentPercentage} // Use calculated percentage
        cardInfo={{
          title: "Total Students",
          value: totalStudent,
          text: "",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={coursesPercentage} // Use calculated percentage
        cardInfo={{
          title: "Total Courses",
          value: totalCourses,
          text: "",
        }}
      />
    </section>
  );
};

export default AreaCards;
