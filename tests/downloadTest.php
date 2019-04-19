<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\download
 */
class downloadTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\download();
  }
  /**
   * @covers ::request
   */
  public function testinit(){//this part of the code checks if the value returned by the world() method is equal to word
    $link = mysqli_connect("localhost","user","password","database1");
    $result = mysqli_query($link,"CREATE TABLE images2 (img_id int,img_name varchar(255),img_data varchar(255));");
    
    $this->assertFalse($this->result->request());
  }
}
?>
