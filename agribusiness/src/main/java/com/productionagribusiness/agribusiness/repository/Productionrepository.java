package com.productionagribusiness.agribusiness.repository;

import com.productionagribusiness.agribusiness.model.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface Productionrepository extends JpaRepository<Production, Integer> {

    @Query(value="SELECT YEAR(p.date) as year, MONTH(p.date) as month, SUM(p.quantity) as total " +
            "FROM production p " +
            "WHERE stand_id IN (:ids) " +
            "GROUP BY YEAR(p.date), MONTH(p.date)",
            nativeQuery=true)
    List getReport(@Param("ids") Set<Integer> ids);

}
