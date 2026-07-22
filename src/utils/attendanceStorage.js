const STORAGE_KEY = "attendance";


export const getAttendance = () => {

const data = localStorage.getItem(STORAGE_KEY);

return data ? JSON.parse(data) : [];

};



export const saveAttendance = (attendance)=>{

localStorage.setItem(

STORAGE_KEY,

JSON.stringify(attendance)

);

};