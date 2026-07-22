import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import EmployeeToolbar from "../components/EmployeeToolbar";
import EmployeeTable from "../components/EmployeeTable";

import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import DeleteEmployeeModal from "../components/DeleteEmployeeModal";

import "./Employees.css";


function Employees(){

    const API =
    "http://localhost/novahr/server/api/employees.php";


    // ===========================
    // STATES
    // ===========================

    const [employees,setEmployees] = useState([]);

    const [search,setSearch] = useState("");

    const [showAdd,setShowAdd] = useState(false);

    const [editEmployee,setEditEmployee] = useState(null);

   const [deleteEmployee,setDeleteEmployee] = useState(null);

const [viewEmployee,setViewEmployee] = useState(null);



    // ===========================
    // LOAD EMPLOYEES
    // ===========================

    const fetchEmployees = async()=>{

        try{

            const response = await fetch(API);

            const data = await response.json();


            if(Array.isArray(data)){

                setEmployees(data);

            }else{

                setEmployees([]);

            }


        }
        catch(error){

            console.error(
                "Fetch Employees Error:",
                error
            );

            setEmployees([]);

        }

    };



    useEffect(()=>{

        fetchEmployees();

    },[]);
    // ===========================
// SEARCH EMPLOYEES
// ===========================

const filteredEmployees = employees.filter((employee)=>{

    const keyword = search
    .toLowerCase()
    .trim();


    return(

        String(employee.employee_id || "")
        .toLowerCase()
        .includes(keyword)


        ||

        String(employee.firstName || "")
        .toLowerCase()
        .includes(keyword)


        ||

        String(employee.lastName || "")
        .toLowerCase()
        .includes(keyword)


        ||

        String(employee.department || "")
        .toLowerCase()
        .includes(keyword)


        ||

        String(employee.position || "")
        .toLowerCase()
        .includes(keyword)

    );

});





// ===========================
// ADD EMPLOYEE
// ===========================

const handleAddEmployee = async(employee)=>{


    try{


        // ===========================
        // DUPLICATE CHECK
        // ===========================


        const duplicateID = employees.some(
            (emp)=>

            String(emp.employee_id)
            .toLowerCase()
            ===
            String(employee.id)
            .toLowerCase()

        );


        if(duplicateID){

            alert(
                "Employee ID already exists."
            );

            return;

        }





        const duplicateName = employees.some(
            (emp)=>

            String(emp.firstName)
            .toLowerCase()
            ===
            String(employee.firstName)
            .toLowerCase()

            &&

            String(emp.lastName)
            .toLowerCase()
            ===
            String(employee.lastName)
            .toLowerCase()

        );


        if(duplicateName){

            alert(
                "Employee name already exists."
            );

            return;

        }




        // ===========================
        // POST MYSQL
        // ===========================


        const response = await fetch(

            API,

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:JSON.stringify({

                    employee_id:
                    employee.id,


                    firstName:
                    employee.firstName,


                    lastName:
                    employee.lastName,


                    gender:
                    employee.gender,


                    department:
                    employee.department,


                    position:
                    employee.position,


                    email:
                    employee.email,


                    phone:
                    employee.phone,


                    salary:
                    Number(employee.salary),


                    status:
                    employee.status

                })

            }

        );



        const data =
        await response.json();



        if(data.success){


            alert(
                "Employee added successfully."
            );


            setShowAdd(false);


            fetchEmployees();



        }
        else{


            alert(
                data.message
            );


        }



    }
    catch(error){


        console.error(
            "Add Employee Error:",
            error
        );


        alert(
            "Cannot connect to server."
        );


    }


};
// ===========================
// EDIT EMPLOYEE
// ===========================

const handleEditEmployee = async(employee)=>{


    try{


        // ===========================
        // DUPLICATE CHECK
        // ===========================


        const duplicate = employees.some(
            (emp)=>

            String(emp.id)
            !==
            String(employee.id)

            &&

            (

                String(emp.employee_id)
                .toLowerCase()
                ===
                String(employee.employee_id)
                .toLowerCase()


                ||

                (

                    String(emp.firstName)
                    .toLowerCase()
                    ===
                    String(employee.firstName)
                    .toLowerCase()


                    &&


                    String(emp.lastName)
                    .toLowerCase()
                    ===
                    String(employee.lastName)
                    .toLowerCase()

                )

            )

        );



        if(duplicate){

            alert(
                "Employee ID or Employee Name already exists."
            );

            return;

        }





        const response = await fetch(

            API,

            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:JSON.stringify({

                    id:
                    employee.id,


                    employee_id:
                    employee.employee_id,


                    firstName:
                    employee.firstName,


                    lastName:
                    employee.lastName,


                    gender:
                    employee.gender,


                    department:
                    employee.department,


                    position:
                    employee.position,


                    email:
                    employee.email,


                    phone:
                    employee.phone,


                    salary:
                    Number(employee.salary),


                    status:
                    employee.status

                })

            }

        );



        const data =
        await response.json();




        if(data.success){


            alert(
                "Employee updated successfully."
            );


            setEditEmployee(null);


            fetchEmployees();


        }
        else{


            alert(
                data.message
            );


        }




    }
    catch(error){


        console.error(
            "Update Employee Error:",
            error
        );


    }


};





// ===========================
// DELETE EMPLOYEE
// ===========================

const handleDeleteEmployee = async()=>{


    if(!deleteEmployee)
    return;



    try{


        const response = await fetch(

            `${API}?id=${deleteEmployee.id}`,

            {

                method:"DELETE"

            }

        );



        const data =
        await response.json();




        if(data.success){


            alert(
                "Employee deleted successfully."
            );


            setDeleteEmployee(null);


            fetchEmployees();


        }
        else{


            alert(
                data.message
            );


        }



    }
    catch(error){


        console.error(
            "Delete Employee Error:",
            error
        );


    }


};
return(

<div className="dashboard-layout">


    <Sidebar />



    <div className="main-content">


        {/* ===========================
            PAGE HEADER
        =========================== */}

        <div className="page-header">

            <h1>
                Employees
            </h1>


            <p>
                Manage employee information
            </p>

        </div>





        {/* ===========================
            EMPLOYEE SUMMARY
        =========================== */}


        <div className="employee-stats">


            <div className="stat-box">

                <h3>
                    Total Employees
                </h3>

                <span>
                    {employees.length}
                </span>

            </div>





            <div className="stat-box">

                <h3>
                    Active Employees
                </h3>

                <span>

                {
                    employees.filter(
                        (emp)=>
                        emp.status === "Active"
                    ).length
                }

                </span>

            </div>





            <div className="stat-box">

                <h3>
                    Departments
                </h3>

                <span>

                {
                    new Set(

                        employees.map(
                            (emp)=>
                            emp.department
                        )

                    ).size
                }

                </span>

            </div>


        </div>






        {/* ===========================
            EMPLOYEE TABLE
        =========================== */}



        <div className="employee-container">


            <EmployeeToolbar

                search={search}

                setSearch={setSearch}

                onAdd={()=>setShowAdd(true)}

            />






            <EmployeeTable


                employees={filteredEmployees}



                onEdit={(employee)=>{

                    setEditEmployee(employee);

                }}



                onDelete={(id)=>{


                    const employee =
                    employees.find(

                        (emp)=>

                        String(emp.id)
                        ===
                        String(id)

                    );


                    setDeleteEmployee(employee);


                }}



                onView={(employee)=>{

    setViewEmployee(employee);

}}



            />


        </div>









        {/* ===========================
            ADD MODAL
        =========================== */}



        {
            showAdd &&


            <AddEmployeeModal


                onClose={()=>setShowAdd(false)}


                onSave={handleAddEmployee}


            />

        }









        {/* ===========================
            EDIT MODAL
        =========================== */}



        {
            editEmployee &&


            <EditEmployeeModal


                employee={editEmployee}



                closeModal={()=>{

                    setEditEmployee(null);

                }}



                onSave={handleEditEmployee}


            />

        }









        {/* ===========================
            DELETE MODAL
        =========================== */}



        {
            deleteEmployee &&


            <DeleteEmployeeModal


                employee={deleteEmployee}



                closeModal={()=>{

                    setDeleteEmployee(null);

                }}



                onConfirm={handleDeleteEmployee}


            />

        }
         

        {
viewEmployee &&


<div className="modal-overlay">


<div className="employee-modal view-modal">


<div className="modal-header">


<h2>
Employee Details
</h2>


<button

className="close-modal"

onClick={()=>setViewEmployee(null)}

>

×


</button>


</div>





<div className="view-content">


<p>

<strong>
Employee ID:
</strong>

{" "}

{viewEmployee.employee_id}

</p>



<p>

<strong>
Name:
</strong>

{" "}

{viewEmployee.firstName}

{" "}

{viewEmployee.lastName}

</p>



<p>

<strong>
Email:
</strong>

{" "}

{viewEmployee.email}

</p>



<p>

<strong>
Phone:
</strong>

{" "}

{viewEmployee.phone}

</p>



<p>

<strong>
Gender:
</strong>

{" "}

{viewEmployee.gender}

</p>



<p>

<strong>
Department:
</strong>

{" "}

{viewEmployee.department}

</p>



<p>

<strong>
Position:
</strong>

{" "}

{viewEmployee.position}

</p>



<p>

<strong>
Salary:
</strong>

{" ₱"}

{Number(viewEmployee.salary)
.toLocaleString()}

</p>



<p>

<strong>
Status:
</strong>

{" "}

{viewEmployee.status}

</p>



</div>


</div>


</div>


}

    </div>


</div>


);


}


export default Employees;