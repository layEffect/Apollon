<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$objDb = new Connect;
$conn = $objDb->connection();


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case "POST":
    $item = json_decode(file_get_contents('php://input'));
    $tableName = $item->activeTab;
    $sql = "INSERT INTO `$tableName` (`id`, `section`, `title`, `description`, `img`) VALUES (NULL, :section, :title, :description, :image)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':section', $item->section);
    $stmt->bindParam(':title', $item->title);
    $stmt->bindParam(':description', $item->description);
    $stmt->bindParam(':image', $item->image);
    if ($stmt->execute()) {
      $response = ['resultCode' => 0, 'message' => 'Record created successfully'];
    } else $response = ['resultCode' => 1, 'message' => 'Failed to create record'];
    echo json_encode($response);
    break;


  case "GET":
    $tableName = $_GET['activeTab'];
    $sql = "SELECT * FROM `$tableName`";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
    break;


  case "PUT":
    $item = json_decode(file_get_contents('php://input'));
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
    } else $response = ['resultCode' => 1, 'message' => 'Failed to update record'];
    echo json_encode($response);
    break;


  case "DELETE":
    $tableName = $_GET['activeTab'];
    $id = $_GET['id'];
    $sql = "DELETE FROM `$tableName` WHERE `$tableName`.`id` = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    if ($stmt->execute()) {
      $response = ['resultCode' => 0, 'message' => 'Record deleted successfully'];
    } else $response = ['resultCode' => 1, 'message' => 'Failed to delete record'];
    echo json_encode($response);
}
