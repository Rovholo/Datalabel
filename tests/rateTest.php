<?php
/**
 * @coversDefaultClass \Rovholo\datalabel\rate
 */
class rateTest extends PHPUnit_Framework_TestCase{
  protected $result;
  
  public function setUp(){//this part of the code initiates the hello variable
    $this->result = new \Rovholo\datalabel\login();
    $link = mysqli_connect("localhost","user","password","database1");
    mysqli_query($link,"CREATE TABLE users (user_id int NOT NULL,user_name varchar(255),password varchar(255),user_rating int)");
    mysqli_query($link,"INSERT INTO users (user_id,user_name,password,user_rating) values('1','user','name','0')");
  }
  /**
   * @covers ::rate
   */
  public function testinit(){//this part of the code checks if the value returned by the world() method is equal to word
    $this->assertTrue( $this->result->rate(5,1) );
  }
}
?>
