import {
 FaBuilding,
 FaUsers
} from "react-icons/fa";

import "./DepartmentTable.css";


function DepartmentTable({
departments
}){


return(

<div className="department-grid">


{
departments.map((dept)=>(


<div 
className="department-card"
key={dept.id}
>


<div className="dept-icon">

<FaBuilding/>

</div>



<div className="dept-info">


<h3>
{dept.name}
</h3>


<p>
Total Employees
</p>


<h2>
{dept.employees}
</h2>



</div>



<div className="dept-footer">


<div className="members">

<FaUsers/>

Employees

</div>


</div>



</div>


))

}


</div>

)


}


export default DepartmentTable;