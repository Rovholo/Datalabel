<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\init
 */
class initTest extends PHPUnit_Framework_TestCase{
  protected $hello;
  protected $name;
  public function setUp(){//this part of the code initiates the hello variable
    $this->hello = new \Rovholo\datalabel\init();
    $this->name = new \Rovholo\datalabel\init();
  }
  /**
   * @covers ::world
   */
  public function testinit(){//this part of the code checks if the value returned by the world() method is equal to word
    $this->assertSame('world',$this->hello->world());
    $this->assertSame('myname',$this->name->myname())
  }

}
?>
