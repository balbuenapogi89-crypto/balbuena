<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json");

include("../config/database.php");

$method = $_SERVER["REQUEST_METHOD"];

/* ===========================
   GET EMPLOYEES
=========================== */

if($method == "GET"){

    $sql = "SELECT * FROM employees ORDER BY id DESC";

    $result = $conn->query($sql);

    $employees = [];

    while($row = $result->fetch_assoc()){

        $employees[] = [

            "id" => $row["id"],
            "employee_id" => $row["employee_id"],
            "firstName" => $row["first_name"],
            "lastName" => $row["last_name"],
            "gender" => $row["gender"],
            "department" => $row["department"],
            "position" => $row["position"],
            "email" => $row["email"],
            "phone" => $row["phone"],
            "salary" => $row["salary"],
            "status" => $row["status"]

        ];

    }

    echo json_encode($employees);
    exit();

}

/* ===========================
   ADD EMPLOYEE
=========================== */

if($method == "POST"){

    $data = json_decode(file_get_contents("php://input"), true);

    $employee_id = trim($data["employee_id"] ?? "");
    $first_name = trim($data["firstName"] ?? "");
    $last_name = trim($data["lastName"] ?? "");
    $gender = trim($data["gender"] ?? "");
    $department = trim($data["department"] ?? "");
    $position = trim($data["position"] ?? "");
    $email = trim($data["email"] ?? "");
    $phone = trim($data["phone"] ?? "");
    $salary = $data["salary"] ?? 0;
    $status = trim($data["status"] ?? "Active");

    // Required Fields
    if(
        empty($employee_id) ||
        empty($first_name) ||
        empty($last_name)
    ){

        echo json_encode([
            "success" => false,
            "message" => "Employee ID, First Name and Last Name are required."
        ]);

        exit();

    }

    /* ===========================
       DUPLICATE CHECK
    =========================== */

    $check = $conn->prepare("
        SELECT id
        FROM employees
        WHERE employee_id = ?
           OR (
                LOWER(first_name)=LOWER(?)
                AND
                LOWER(last_name)=LOWER(?)
           )
        LIMIT 1
    ");

    $check->bind_param(
        "sss",
        $employee_id,
        $first_name,
        $last_name
    );

    $check->execute();
    $check->store_result();

    if($check->num_rows > 0){

        echo json_encode([
            "success" => false,
            "message" => "Employee ID or Employee Name already exists."
        ]);

        exit();

    }

    /* ===========================
       INSERT
    =========================== */

    $stmt = $conn->prepare("

        INSERT INTO employees(

            employee_id,
            first_name,
            last_name,
            gender,
            department,
            position,
            email,
            phone,
            salary,
            status

        )

        VALUES(?,?,?,?,?,?,?,?,?,?)

    ");

    $stmt->bind_param(

        "ssssssssis",

        $employee_id,
        $first_name,
        $last_name,
        $gender,
        $department,
        $position,
        $email,
        $phone,
        $salary,
        $status

    );

    if($stmt->execute()){

        echo json_encode([
            "success" => true,
            "message" => "Employee added successfully."
        ]);

    }else{

        echo json_encode([
            "success" => false,
            "message" => $stmt->error
        ]);

    }

    exit();

}
/* ===========================
   UPDATE EMPLOYEE
=========================== */

if($method == "PUT"){

    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data["id"] ?? 0;

    $employee_id = trim($data["employee_id"] ?? "");
    $first_name = trim($data["firstName"] ?? "");
    $last_name = trim($data["lastName"] ?? "");
    $gender = trim($data["gender"] ?? "");
    $department = trim($data["department"] ?? "");
    $position = trim($data["position"] ?? "");
    $email = trim($data["email"] ?? "");
    $phone = trim($data["phone"] ?? "");
    $salary = $data["salary"] ?? 0;
    $status = trim($data["status"] ?? "");

    /* ===========================
       DUPLICATE CHECK
    =========================== */

    $check = $conn->prepare("
        SELECT id
        FROM employees
        WHERE
        (
            employee_id = ?
            OR (
                LOWER(first_name)=LOWER(?)
                AND LOWER(last_name)=LOWER(?)
            )
        )
        AND id <> ?
        LIMIT 1
    ");

    $check->bind_param(
        "sssi",
        $employee_id,
        $first_name,
        $last_name,
        $id
    );

    $check->execute();
    $check->store_result();

    if($check->num_rows > 0){

        echo json_encode([
            "success" => false,
            "message" => "Employee ID or Employee Name already exists."
        ]);

        exit();

    }

    /* ===========================
       UPDATE
    =========================== */

    $stmt = $conn->prepare("

        UPDATE employees SET

            employee_id = ?,
            first_name = ?,
            last_name = ?,
            gender = ?,
            department = ?,
            position = ?,
            email = ?,
            phone = ?,
            salary = ?,
            status = ?

        WHERE id = ?

    ");

    $stmt->bind_param(

        "ssssssssisi",

        $employee_id,
        $first_name,
        $last_name,
        $gender,
        $department,
        $position,
        $email,
        $phone,
        $salary,
        $status,
        $id

    );

    if($stmt->execute()){

        echo json_encode([
            "success" => true,
            "message" => "Employee updated successfully."
        ]);

    }else{

        echo json_encode([
            "success" => false,
            "message" => $stmt->error
        ]);

    }

    exit();

}


/* ===========================
   DELETE EMPLOYEE
=========================== */

if($method == "DELETE"){

    $id = $_GET["id"] ?? 0;

    $stmt = $conn->prepare("DELETE FROM employees WHERE id=?");

    $stmt->bind_param("i", $id);

    if($stmt->execute()){

        echo json_encode([
            "success" => true,
            "message" => "Employee deleted successfully."
        ]);

    }else{

        echo json_encode([
            "success" => false,
            "message" => $stmt->error
        ]);

    }

    exit();

}


/* ===========================
   CLOSE CONNECTION
=========================== */

$conn->close();

?>