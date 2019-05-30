<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\register
 */
class registerTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\register();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE users (user_name varchar(255),user_email varchar(255),password varchar(255))");
  }
  /**
   * @covers ::register
   */
  public function testinit(){
    $this->assertEquals($this->result->register("","email","pass"),'invalid input');
    $this->assertEquals($this->result->register("user","","pass"),'invalid input');
    $this->assertEquals($this->result->register("user","email",""),'invalid input');
    $this->assertEquals($this->result->register("","",""),'invalid input');
    $this->assertEquals($this->result->register("user","email","pass"),'invalid email');
    $this->assertTrue($this->result->register("user","email@domain.com","pass"));
  }
}
?>
