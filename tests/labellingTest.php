
<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\labellong
 */
class labellingTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\labelling();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE labels (label_id int,label_name varchar(255),label_data varchar(255));");
  }
  /**
   * @covers ::label
   */
  public function testinit(){
    $this->assertTrue($this->result->label() != false);
  }
}
?>
