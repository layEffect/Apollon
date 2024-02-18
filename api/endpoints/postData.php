<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../connect.php';

$objDb = new Connect;
$conn = $objDb->connection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $item = json_decode(file_get_contents('php://input'));

  if (isset($item->activeTab, $item->section, $item->title, $item->description, $item->image)) {
    $tableName = $item->activeTab;
    $sql = "INSERT INTO `$tableName` (`id`, `section`, `title`, `description`, `img`) VALUES (NULL, :section, :title, :description, :image)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':section', $item->section);
    $stmt->bindParam(':title', $item->title);
    $stmt->bindParam(':description', $item->description);
    $stmt->bindParam(':image', $item->image);

    if ($stmt->execute()) {
      $response = ['resultCode' => 0, 'message' => 'Record created successfully'];
    } else {
      $response = ['resultCode' => 1, 'message' => 'Failed to create record'];
    }
    echo json_encode($response);
  } else {
    echo json_encode(['resultCode' => 1, 'message' => 'Invalid request']);
  }
} else {
  echo json_encode(['resultCode' => 1, 'message' => 'Invalid request method']);
}
