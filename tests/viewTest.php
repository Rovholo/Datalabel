
<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\view
 */
class viewTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\view();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE label_img ( user_id int,img_id int,img_name varchar(255),img_type varchar(255),img_data varchar(255),img_labels varchar(255) )");
    mysqli_query($link,"INSERT INTO label_img (user_id, img_id, img_name, img_type, img_data,img_labels) VALUES ('1','input','input', 'input', 'input','input')");
  }
  /**
   * @covers ::download
   */
  public function testinit(){
    $this->assertTrue($this->result->download(1) != false);
  }
}
?>
