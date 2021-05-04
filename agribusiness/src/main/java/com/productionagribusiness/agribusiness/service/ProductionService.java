package com.productionagribusiness.agribusiness.service;

import com.productionagribusiness.agribusiness.exception.BadRequestException;
import com.productionagribusiness.agribusiness.exception.NotFoundException;
import com.productionagribusiness.agribusiness.model.Farm;
import com.productionagribusiness.agribusiness.model.Production;
import com.productionagribusiness.agribusiness.model.Report;
import com.productionagribusiness.agribusiness.model.Stand;
import com.productionagribusiness.agribusiness.repository.Productionrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductionService {

    @Autowired
    Productionrepository productionrepository;

    @Autowired
    StandService standService;

    @Autowired
    FarmService farmService;

    public Production createProduction(Integer idFarm, Integer idStand, Production production) {
        try {
            Stand stand = standService.getStandById(idFarm, idStand);

            production.setStand(stand);

            Production newProduction = productionrepository.save(production);

            return newProduction;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to create new production");
        }
    }

    public void deleteProduction(Integer id) {
        try {
            productionrepository.deleteById(id);
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to delete production");
        }
    }

    public Production updateProduction(Integer idFarm, Integer idStand, Integer idProduction, Production production) {
        try {
            Stand stand = standService.getStandById(idFarm, idStand);
            Optional<Production> optionalProduction = productionrepository.findById(idProduction);
            Production updatedProduction = optionalProduction.get();

            if (optionalProduction.isPresent() && updatedProduction.getId().equals(production.getId())) {

                updatedProduction.setQuantity(production.getQuantity());
                updatedProduction.setDate(production.getDate());
                updatedProduction.setStand(stand);

                productionrepository.save(updatedProduction);
            } else {
                throw new NotFoundException("Sample not found with id - " + idProduction);
            }

            return updatedProduction;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to update production");
        }
    }

    public List<Report> generateReport(Integer id) {
        try {
            Set<Integer> stands = new HashSet<>();
            Farm farm = farmService.getFarmById(id);

            farm.getStandsList().forEach(stand -> {
                stands.add(stand.getId());
            });

            return productionrepository.getReport(stands);
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to generate report");
        }
    }


}
