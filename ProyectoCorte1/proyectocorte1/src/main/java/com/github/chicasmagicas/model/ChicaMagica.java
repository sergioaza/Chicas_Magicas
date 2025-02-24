package com.github.chicasmagicas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chica_magica")
public class ChicaMagica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private int edad;
    private String ciudad;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private String fechaContrato;

    // Getters y Setters
}

enum Estado {
    ACTIVA,
    DESAPARECIDA,
    RESCATADA
}
