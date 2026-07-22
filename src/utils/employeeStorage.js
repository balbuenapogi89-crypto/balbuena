const STORAGE_KEY = "employees";


// GET EMPLOYEES

export const getEmployees = () => {

    const employees =
    localStorage.getItem(STORAGE_KEY);


    return employees
    ?
    JSON.parse(employees)
    :
    [];

};




// ADD EMPLOYEE

export const addEmployee = (employee) => {


    const employees = getEmployees();


    employees.push(employee);


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(employees)
    );


};




// UPDATE EMPLOYEE

export const updateEmployee = (updatedEmployee) => {


    const employees = getEmployees();


    const updatedEmployees =
    employees.map((employee)=>{


        if(employee.id === updatedEmployee.id){

            return updatedEmployee;

        }


        return employee;


    });



    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedEmployees)
    );


};




// DELETE EMPLOYEE

export const deleteEmployee = (id) => {


    const employees = getEmployees();


    const filteredEmployees =

    employees.filter(
        (employee)=> 
        employee.id !== id
    );



    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filteredEmployees)
    );


};