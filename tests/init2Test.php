<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\init2
 */
class init2Test extends PHPUnit_Framework_TestCase{
  protected $connect;

  public function setUp(){//this part of the code initiates the hello variable
    $this->connect = new \Rovholo\datalabel\init2();
  }
  /*
   * @covers ::connectDetail
   */
  public function testConnectDetail(){
     $this->assertNotNull($this->connect->connectDetail());
  }
}
?>
