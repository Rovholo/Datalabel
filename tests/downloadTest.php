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
    $this->assertFalse($this->result->request());
  }
}
?>
