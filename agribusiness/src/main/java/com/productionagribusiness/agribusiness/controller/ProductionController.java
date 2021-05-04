package com.productionagribusiness.agribusiness.controller;

import com.productionagribusiness.agribusiness.model.Production;
import com.productionagribusiness.agribusiness.model.Report;
import com.productionagribusiness.agribusiness.service.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductionController {

    @Autowired
    ProductionService productionService;

    @PostMapping("/farms/{idFarm}/stands/{idStand}/productions")
    public ResponseEntity<Production> createProduction(@PathVariable Integer idFarm, @PathVariable Integer idStand,
                                                      @RequestBody Production production) {

        Production newProduction = productionService.createProduction(idFarm, idStand, production);

        return new ResponseEntity<>(newProduction, HttpStatus.OK);
    }

    @DeleteMapping("/productions/{id}")
    public ResponseEntity<Void> deleteSample(@PathVariable Integer id) {
        productionService.deleteProduction(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/farms/{idFarm}/stands/{idStand}/productions/{idProduction}")
    public ResponseEntity<Production> updateSample(@PathVariable Integer idFarm, @PathVariable Integer idStand,
                                               @PathVariable Integer idProduction, @RequestBody Production production) {

        Production updatedProduction = productionService.updateProduction(idFarm, idStand, idProduction, production);

        return new ResponseEntity<>(updatedProduction, HttpStatus.OK);

    }

    @GetMapping("/report/{id}")
    public ResponseEntity<List<Report>> reportFarm(@PathVariable Integer id) {
        List<Report> reportList = productionService.generateReport(id);

        return new ResponseEntity<>(reportList,HttpStatus.OK);
    }

}
