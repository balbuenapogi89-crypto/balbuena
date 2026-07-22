const STORAGE_KEY = "payroll";


export const getPayroll = () => {

const data = localStorage.getItem(STORAGE_KEY);

return data ? JSON.parse(data) : [];

};



export const savePayroll = (data)=>{

localStorage.setItem(

STORAGE_KEY,

JSON.stringify(data)

);

};