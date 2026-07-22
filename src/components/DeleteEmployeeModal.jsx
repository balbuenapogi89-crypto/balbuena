import { FaTrash, FaTimes } from "react-icons/fa";
import "./DeleteEmployeeModal.css";


function DeleteEmployeeModal({
    employee,
    closeModal,
    onConfirm
}) {


    return (

        <div className="modal-overlay">


            <div className="delete-modal">


                <div className="delete-icon">

                    <FaTrash />

                </div>


                <h2>
                    Delete Employee?
                </h2>


                <p>

                    Are you sure you want to delete

                    <br />

                    <strong>
                        {employee.firstName} {employee.lastName}
                    </strong>

                    ?

                </p>



                <div className="delete-actions">


                    <button

                        className="cancel-delete"

                        onClick={closeModal}

                    >

                        <FaTimes />

                        Cancel

                    </button>




                    <button

                        className="confirm-delete"

                        onClick={onConfirm}

                    >

                        <FaTrash />

                        Delete

                    </button>



                </div>



            </div>


        </div>

    );

}


export default DeleteEmployeeModal;