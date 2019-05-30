<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\labeling
 */
class labellingTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\labeling();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE labels (label_id int,label_name varchar(255),label_data varchar(255));");
  }
  /**
   * @covers ::labels
   */
  public function testinit(){
    $this->assertTrue($this->result->labels() != false);
  }
}
?>
