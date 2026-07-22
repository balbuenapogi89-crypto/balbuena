import {

FaEdit,
FaTrash

} from "react-icons/fa";


import "./EmployeeRow.css";



function EmployeeRow({

employee,

onEdit,

onDelete

}){


return (


<tr>


<td>

EMP-{employee.id}

</td>



<td>


<div className="employee-profile">


<div className="employee-avatar">

{

employee.first_name
?.charAt(0)

}

</div>



<div>


<h4>

{
employee.first_name
}

{
" "
}

{
employee.last_name
}

</h4>


<span>

{
employee.employee_id
}

</span>


</div>


</div>


</td>




<td>

{
employee.email
}

</td>



<td>

<span className="department-badge">

{
employee.department
}

</span>

</td>




<td>

{
employee.position
}

</td>



<td>

₱{

Number(employee.salary)
.toLocaleString()

}

</td>




<td>


<span

className={

employee.status === "Active"

?

"status active"

:

"status inactive"

}

>

{

employee.status

}


</span>


</td>




<td>


<div className="employee-actions">


<button

className="edit-btn"

onClick={()=>onEdit(employee)}

>

<FaEdit/>

</button>



<button

className="delete-btn"

onClick={()=>onDelete(employee.id)}

>

<FaTrash/>

</button>


</div>


</td>


</tr>


);


}


export default EmployeeRow;