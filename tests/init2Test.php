<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\init
 */
class init2Test extends PHPUnit_Framework_TestCase{
  protected $connect;

  public function setUp(){//this part of the code initiates the hello variable
    $this->connect = new \Rovholo\datalabel\init2();
  }
  /**
   * @covers ::world
   */
  public function testinit2(){//this part of the code checks if the value returned by the world() method is equal to word
    $this->assertSame('name',$this->connect->connectDB());
  }
}
?>
