package com.github.chicasmagicas.Repositorio;

import com.github.chicasmagicas.model.ChicaMagica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChicaMagicaRepositorio extends JpaRepository<ChicaMagica, Long> {
}