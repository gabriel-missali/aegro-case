package com.productionagribusiness.agribusiness.repository;

import com.productionagribusiness.agribusiness.model.Stand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StandRepository extends JpaRepository<Stand, Integer> {

}
