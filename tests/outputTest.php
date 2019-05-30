<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\output
 */
class outputTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\output();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE images2 (img_id int,img_name varchar(255),img_data varchar(255));");
  }
  /**
   * @covers ::upload
   */
  public function testinit(){
    $this->assertTrue($this->result->upload("","","","","",""));
  }
}
?>
