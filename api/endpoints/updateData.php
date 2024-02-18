<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../connect.php';

$objDb = new Connect;
$conn = $objDb->connection();

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $item = json_decode(file_get_contents('php://input'));

  if (isset($item->activeTab, $item->section, $item->title, $item->description)) {
    $tableName = $item->activeTab;

    $sql = "UPDATE `$tableName` SET `section` = :section, `title` = :title, `description` = :description";
    if (isset($item->image)) {
      $sql .= ", `img` = :image";
    }
    $sql .= " WHERE `$tableName`.`id` = :id";


    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $item->id);
    $stmt->bindParam(':section', $item->section);
    $stmt->bindParam(':title', $item->title);
    $stmt->bindParam(':description', $item->description);
    if (isset($item->image)) {
      $stmt->bindParam(':image', $item->image);
    }

    if ($stmt->execute()) {
      $response = ['resultCode' => 0, 'message' => 'Record updated successfully'];
    } else {
      $response = ['resultCode' => 1, 'message' => 'Failed to update record'];
    }

    echo json_encode($response);
  } else {
    echo json_encode(['resultCode' => 1, 'message' => 'Invalid request']);
  }
} else {
  echo json_encode(['resultCode' => 1, 'message' => 'Invalid request method']);
}
