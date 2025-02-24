package com.github.chicasmagicas.repository;

import com.github.chicasmagicas.model.ChicaMagica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChicaMagicaRepository extends JpaRepository<ChicaMagica, Long> {
    
    // Buscar chicas mágicas por estado
    List<ChicaMagica> findByEstadoActual(String estadoActual);

    // Buscar chicas mágicas por ciudad de origen
    List<ChicaMagica> findByCiudadOrigen(String ciudadOrigen);
}
