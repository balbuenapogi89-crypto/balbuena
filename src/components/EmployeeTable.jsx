import "./EmployeeTable.css";

import {
    FaEdit,
    FaTrash,
    FaEye
} from "react-icons/fa";


function EmployeeTable({

    employees = [],

    onEdit,

    onDelete,

    onView

}) {


return (

<div className="table-container">


<table className="employee-table">


<thead>

<tr>

<th>Employee Name</th>

<th>ID</th>

<th>Department</th>

<th>Position</th>

<th>Email</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>





<tbody>


{

employees.length === 0 ?


(

<tr>

<td
colSpan="7"
className="no-data"
>

No Employees Found

</td>

</tr>

)



:


employees.map((employee)=>(


<tr key={employee.id}>


{/* NAME */}

<td>

<div className="employee-name">


<h4>

{
employee.firstName
}

{" "}

{
employee.lastName
}


</h4>


</div>

</td>






{/* EMPLOYEE ID */}

<td>


{
employee.employee_id
}


</td>







{/* DEPARTMENT */}

<td>

{
employee.department
}

</td>







{/* POSITION */}

<td>

{
employee.position
}

</td>







{/* EMAIL */}

<td>

{
employee.email
}

</td>







{/* STATUS */}

<td>


<span

className={

employee.status === "Active"

?

"status-dot active"

:

"status-dot inactive"

}


>


</span>


</td>







{/* ACTION */}

<td>


<div className="action-buttons">





<button

className="view-btn"

onClick={()=>{

if(onView){

onView(employee);

}

}}

>

<FaEye />

</button>







<button

className="edit-btn"

onClick={()=>{

onEdit(employee);

}}

>

<FaEdit />

</button>







<button

className="delete-btn"

onClick={()=>{

onDelete(employee.id);

}}

>

<FaTrash />

</button>





</div>


</td>





</tr>


))


}


</tbody>



</table>


</div>


);


}


export default EmployeeTable;