package com.github.chicasmagicas.Controller.advice;

import com.github.chicasmagicas.service.exception.ChicaMagicaNotFoundException;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ControllerAdvice
public class ChicaMagicaNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(ChicaMagicaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String chicaMagicaNotFoundHandler(ChicaMagicaNotFoundException ex) {
        return ex.getMessage();
    }
}
