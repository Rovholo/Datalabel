<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\login
 */
class loginTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\login();
  }
  /**
   * @covers ::request
   */
  public function testinit(){//this part of the code checks if the value returned by the world() method is equal to word
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE images2 (img_id int,img_name varchar(255),img_data varchar(255));");
    $this->assertTrue($this->result->request("user","password") != false);
  }
}
?>
