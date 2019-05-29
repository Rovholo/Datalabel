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
    $result = $this->result->login("user");
    $password = "name";
    $this->assertTrue(json_decode($result)[0]->user_password == $password);
  }
}
?>
