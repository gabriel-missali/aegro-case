package com.productionagribusiness.agribusiness.repository;

import com.productionagribusiness.agribusiness.model.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SampleRepository extends JpaRepository<Sample, Integer> {

}
