package com.productionagribusiness.agribusiness.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "stand")
public class Stand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Float area;

    @OneToMany(mappedBy = "stand")
    private List<Production> productionList;

    @OneToMany(mappedBy = "stand")
    private List<Sample> sampleList;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private Farm farm;

    public Stand() {
    }

    public Stand(Integer id, Float area) {
        this.id = id;
        this.area = area;
    }
}
