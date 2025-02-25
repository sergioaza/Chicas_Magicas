package com.github.chicasmagicas.Controller.rest;

import com.github.chicasmagicas.model.ChicaMagica;
import com.github.chicasmagicas.repository.ChicaMagicaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chicas-magicas")
public class ChicaMagicaRestController {
    
    @Autowired
    private ChicaMagicaRepository repository;

    @GetMapping //mostrar todas las chicas
    public List<ChicaMagica> listarTodas() {
        return repository.findAll();
    }

    @GetMapping("/{id}")  //mostrar una por el ID
    public ResponseEntity<ChicaMagica> obtenerPorId(@PathVariable Long id) {
        Optional<ChicaMagica> chicaMagica = repository.findById(id);
        return chicaMagica.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping //agregar una nueva chica
    public ResponseEntity<ChicaMagica> registrar(@RequestBody ChicaMagica chicaMagica) {
        ChicaMagica nuevaChica = repository.save(chicaMagica);
        return ResponseEntity.ok(nuevaChica);
    }

    @PutMapping("/{id}") //actualizar por ID
    public ResponseEntity<ChicaMagica> actualizar(@PathVariable Long id, @RequestBody ChicaMagica chicaMagica) {
        return repository.findById(id).map(existing -> {
            existing.setNombre(chicaMagica.getNombre());
            existing.setEdad(chicaMagica.getEdad());
            existing.setCiudadOrigen(chicaMagica.getCiudadOrigen());
            existing.setEstadoActual(chicaMagica.getEstadoActual());
            existing.setFechaContrato(chicaMagica.getFechaContrato());
            repository.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}") //eliminar una chica por el ID
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Nuevo endpoint para filtrar chicas mágicas por estado
    @GetMapping("/estado/{estado}")  //muestra la que tengan el mismo estado
    public List<ChicaMagica> obtenerPorEstado(@PathVariable String estado) {
        return repository.findByEstadoActual(estado);
    }
}