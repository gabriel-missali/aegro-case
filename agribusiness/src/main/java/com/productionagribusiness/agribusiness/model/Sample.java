package com.productionagribusiness.agribusiness.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "sample")
public class Sample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer quantityPlant;

    @Column(nullable = false)
    private Integer mediaQuantityCerealsPlant;

    @Column(nullable = false)
    private Float mediaWeight;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private Stand stand;
}
