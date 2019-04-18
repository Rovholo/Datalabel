<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\connect
 */
class connectTest extends PHPUnit_Framework_TestCase{
  protected $connect;

  public function setUp(){//this part of the code initiates the hello variable
    $this->connect = new \Rovholo\datalabel\connect();
  }
  /*
   * @covers ::connectDetail
   */
  public function testConnectDetail(){
     $this->assertNotNull($this->connect->connectDetail());
  }
}
?>
