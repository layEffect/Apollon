<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../connect.php';

$objDb = new Connect;
$conn = $objDb->connection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['activeTab'])) {
    $tableName = $_GET['activeTab'];
    $sql = "SELECT DISTINCT `section` FROM `$tableName`";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
  } else {
    echo json_encode(['resultCode' => 1, 'message' => 'Invalid request']);
  }
} else {
  echo json_encode(['resultCode' => 1, 'message' => 'Invalid request method']);
}