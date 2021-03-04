import React from "react";
import style from "./Header.module.css";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { searchStudent } from "../action/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function Header() {
  const directToNewStudent = () => window.location.replace("/NewStudent");
  const studentList = useSelector((state) => state.students.studentList); 
  const dispatch = useDispatch();
  const [currentSearch, setcurrentSearch] = useState("");

  const handleCurrentSearch = (event) => {
    console.log(event.target.value);
    setcurrentSearch(event.target.value);
  };
  const handleSeachStudent = (value) => {
    const searchedItem = studentList.filter(
      (student) =>
        student.name.indexOf(value) >= 0 ||
        student.phoneNumber.indexOf(value) >= 0
    );
    if (searchedItem) dispatch(searchStudent(searchedItem));
    else dispatch(searchStudent([]));
  };
  return (
    <div className={style.header}>
      <div className={style.top_area}>
        <h2>Quản lý sinh viên</h2>
        <button onClick={directToNewStudent}>
          <AddIcon className={style.plus} />
          <span>Thêm mới</span>
        </button>
      </div>
      <div className={style.search_area}>
        <input
          type="text"
          value={currentSearch}
          onChange={(e) => handleCurrentSearch(e)}
        />
        <SearchIcon
          className={style.search_button}
          onClick={() => handleSeachStudent(currentSearch)}
        />
      </div>
    </div>
  );
}
