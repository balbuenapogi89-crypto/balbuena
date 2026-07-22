import {
  FaSearch,
  FaPlus
} from "react-icons/fa";

import "./EmployeeToolbar.css";


function EmployeeToolbar({
  search,
  setSearch,
  onAdd
}) {

  return (

    <div className="employee-toolbar">

      <div className="employee-search">

        <FaSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>


      <button
        className="add-employee-btn"
        onClick={onAdd}
      >

        <FaPlus/>

        Add Employee

      </button>


    </div>

  );

}


export default EmployeeToolbar;