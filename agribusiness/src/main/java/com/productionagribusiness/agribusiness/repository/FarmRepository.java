package com.productionagribusiness.agribusiness.repository;

import com.productionagribusiness.agribusiness.model.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Integer> {

    List<Farm> findAllByUserId(Integer userId);

}
