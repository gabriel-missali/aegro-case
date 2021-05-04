package com.productionagribusiness.agribusiness.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "farm")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    private String description;

    @OneToMany(mappedBy = "farm")
    private List<Stand> standsList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    public Farm() {
    }

    public Farm(Integer id, String name, String owner, String address, String description) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
    }
}
