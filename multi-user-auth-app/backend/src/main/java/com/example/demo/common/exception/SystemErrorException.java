package com.example.demo.common.exception;

public class SystemErrorException extends  RuntimeException{

    public SystemErrorException(String message){
        super(message);
    }
}
