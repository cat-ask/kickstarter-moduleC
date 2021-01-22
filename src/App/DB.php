<?php

namespace App;

class DB{
    static $db = null;
    static function getDB(){
        if(self::$db == null){
            self::$db = new \PDO("mysql:host=localhost;dbname=kickstarter;charset=utf8mb4","root","",[
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ,
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
            ]);
        }

        return self::$db;
    }

    static function query($sql,$data=[]){
        $q = self::getDB()->prepare($sql);
        $q->execute($data);
        return $q;
    }

    static function fetch($sql,$data=[]){
        return self::query($sql,$data)->fetch();
    }

    static function fetchAll($sql,$data=[]){
        return self::query($sql,$data)->fetchAll();
    }

    static function find($table,$id){
        return self::fetch("SELECT * FROM `$table` WHERE id = ?",[$id]);
    }

    static function who($user_email){
        return self::fetch("SELECT * FROM user WHERE user_email = ?",[$user_email]);
    }
}