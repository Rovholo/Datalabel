<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\init
 */
class initTest extends PHPUnit_Framework_TestCase{
  protected $myname;

  public function setUp(){//this part of the code initiates the hello variable
    $this->myname = new \Rovholo\datalabel\init();
  }
  /**
   * @covers ::world
   */
  public function testinit(){//this part of the code checks if the value returned by the world() method is equal to word
    $this->assertSame('name',$this->myname->name());
  }
}
?>
