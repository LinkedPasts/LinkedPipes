<?php

require 'AltoRouter.php';

$router = new AltoRouter();
$router->setBasePath('/data');

$router->map('GET','/',  function() {
    echo 'Hallo World!';
} , 'plan2');
$router->map('GET','/[*:section]/[*:id]',  function($section,$id) {
    $uuid = $id;
    $url = "https://digits.mainzed.org/rgzmwissit/pubby/".$section."/".$uuid;
    header("HTTP/1.1 301 Moved Permanently"); header("Location: ".$url); exit;
} , 'wd');
$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
