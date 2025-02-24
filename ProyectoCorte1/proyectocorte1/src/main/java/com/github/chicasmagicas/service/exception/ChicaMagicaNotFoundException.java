package com.github.chicasmagicas.service.exception;

public class ChicaMagicaNotFoundException extends RuntimeException {
    public ChicaMagicaNotFoundException(Long id) {
        super("No se encontró la chica mágica con ID: " + id);
    }
}

