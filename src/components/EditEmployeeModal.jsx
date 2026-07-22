import { useState } from "react";

import {
    FaTimes,
    FaUserEdit
} from "react-icons/fa";

import "./EditEmployeeModal.css";


function EditEmployeeModal({

    employee,

    closeModal,

    onSave

}) {


const [formData,setFormData] = useState({


    id: employee.id,


    employee_id:
    employee.employee_id || "",


    firstName:
    employee.firstName || "",


    lastName:
    employee.lastName || "",


    gender:
    employee.gender || "Male",


    department:
    employee.department || "Human Resources",


    position:
    employee.position || "",


    email:
    employee.email || "",


    phone:
    employee.phone || "",


    salary:
    employee.salary || "",


    status:
    employee.status || "Active"


});





const handleChange = (e)=>{


    const {
        name,
        value
    } = e.target;


    setFormData({

        ...formData,

        [name]:value

    });


};






const handleSubmit=(e)=>{


    e.preventDefault();



    onSave({

        ...formData,

        salary:Number(formData.salary)

    });


};






return (

<div className="modal-overlay">


<div className="employee-modal">





<div className="modal-header">


<div className="modal-title">


<FaUserEdit />


<h2>
Edit Employee
</h2>


</div>





<button

className="close-modal"

type="button"

onClick={closeModal}

>

<FaTimes />

</button>


</div>








<form onSubmit={handleSubmit}>


<div className="form-grid">







<div>


<label>
Employee ID
</label>


<input

name="employee_id"

value={formData.employee_id}

onChange={handleChange}

required

/>

</div>









<div>


<label>
First Name
</label>


<input

name="firstName"

value={formData.firstName}

onChange={handleChange}

required

/>

</div>









<div>


<label>
Last Name
</label>


<input

name="lastName"

value={formData.lastName}

onChange={handleChange}

required

/>

</div>









<div>


<label>
Email
</label>


<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

required

/>

</div>









<div>


<label>
Phone
</label>


<input

name="phone"

value={formData.phone}

onChange={handleChange}

required

/>

</div>









<div>


<label>
Gender
</label>


<select

name="gender"

value={formData.gender}

onChange={handleChange}

>


<option value="Male">
Male
</option>


<option value="Female">
Female
</option>


</select>


</div>









<div>


<label>
Department
</label>


<select

name="department"

value={formData.department}

onChange={handleChange}

>


<option>
Human Resources
</option>


<option>
Information Technology
</option>


<option>
Finance
</option>


<option>
Marketing
</option>


<option>
Sales
</option>


</select>


</div>









<div>


<label>
Position
</label>


<input

name="position"

value={formData.position}

onChange={handleChange}

required

/>

</div>









<div>


<label>
Salary
</label>


<input

type="number"

name="salary"

value={formData.salary}

onChange={handleChange}

required

/>

</div>









<div>


<label>
Status
</label>


<select

name="status"

value={formData.status}

onChange={handleChange}

>


<option value="Active">
Active
</option>


<option value="Inactive">
Inactive
</option>


<option value="On Leave">
On Leave
</option>


</select>


</div>





</div>








<div className="modal-footer">


<button

type="button"

className="cancel-btn"

onClick={closeModal}

>

Cancel

</button>







<button

type="submit"

className="save-btn"

>

Update Employee

</button>





</div>






</form>





</div>


</div>


);


}


export default EditEmployeeModal;