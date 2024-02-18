<?php
class Connect
{
  private $server = 'localhost';
  private $dbname = 'apollon1_0';
  private $user = 'root';
  private $pass = '';

  public function connection()
  {
    try {
      $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $conn;
    } catch (\Exception $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }
}
