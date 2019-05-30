<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\output
 */
class registerTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\register();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE users (user_id int NOT NULL,user_name varchar(255),password varchar(255))");
  }
  /**
   * @covers ::upload
   */
  public function testinit(){
    $this->assertTrue($this->result->upload("","","","","",""));
  }
}
?>
