<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../connect.php';

$objDb = new Connect;
$conn = $objDb->connection();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  if (isset($_GET['activeTab'], $_GET['id'])) {
    $tableName = $_GET['activeTab'];
    $id = $_GET['id'];
    $sql = "DELETE FROM `$tableName` WHERE `$tableName`.`id` = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
      $response = ['resultCode' => 0, 'message' => 'Record deleted successfully'];
    } else $response = ['resultCode' => 1, 'message' => 'Failed to delete record'];
    echo json_encode($response);
  } else {
    echo json_encode(['resultCode' => 1, 'message' => 'Invalid request']);
  }
} else {
  echo json_encode(['resultCode' => 1, 'message' => 'Invalid request method']);
}
