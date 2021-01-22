<?php

use App\Router;

// page All
Router::get("/","ViewController@index");
Router::get("/index","ViewController@index");
Router::get("/investor","ViewController@investor");
Router::get("/view","ViewController@view");

Router::post("/fundListLoad","ActionController@fundListLoad");

// page guest
Router::get("/join","ViewController@join","guest");
Router::post("/join","ActionController@join","guest");
Router::get("/login","ViewController@login","guest");
Router::post("/login","ActionController@login","guest");

// page user
Router::get("/logout","ActionController@logout","user");
Router::get("/register","ViewController@register","user");
Router::post("/register","ActionController@register","user");
Router::get("/user","ViewController@user","user");
Router::post("/user","ActionController@userPageList","user");
Router::post("/fundEnd","ActionController@fundDelete","user");
Router::post("/viewFund","ActionController@investorsAdd","user");
Router::post("/viewBusiness","ActionController@viewBusiness","user");

Router::start();