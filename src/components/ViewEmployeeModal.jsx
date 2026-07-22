import "./ViewEmployeeModal.css";


function ViewEmployeeModal({
    employee,
    onClose
}){


return(

<div className="modal-overlay">


<div className="view-modal">


<div className="modal-header">

<h2>
Employee Details
</h2>


<button onClick={onClose}>
×
</button>

</div>



<div className="employee-details">


<p>
<strong>Name:</strong>

{" "}

{employee.firstName}

{" "}

{employee.lastName}

</p>


<p>
<strong>ID:</strong>

{" "}

{employee.id}

</p>


<p>
<strong>Email:</strong>

{" "}

{employee.email}

</p>


<p>
<strong>Department:</strong>

{" "}

{employee.department}

</p>


<p>
<strong>Position:</strong>

{" "}

{employee.position}

</p>


<p>
<strong>Status:</strong>

{" "}

{employee.status}

</p>


<p>
<strong>Salary:</strong>

{" "}

₱ {employee.salary}

</p>



</div>



</div>


</div>

)


}


export default ViewEmployeeModal;