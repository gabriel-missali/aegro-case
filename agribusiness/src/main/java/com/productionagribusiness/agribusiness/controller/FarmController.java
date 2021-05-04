package com.productionagribusiness.agribusiness.controller;

import com.productionagribusiness.agribusiness.model.Farm;
import com.productionagribusiness.agribusiness.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FarmController {

    @Autowired
    FarmService farmService;

    @GetMapping("/farms")
    public ResponseEntity<List<Farm>> getAllFarm(@RequestHeader(name="Authorization") String tokenJwt) {

        List<Farm> farmList = farmService.getAllByUser(tokenJwt);

        return new ResponseEntity<>(farmList, HttpStatus.OK);
    }

    @GetMapping("/farms/{id}")
    public ResponseEntity<Farm> getFarmById(@PathVariable Integer id) {

        Farm farm = farmService.getFarmById(id);

        return new ResponseEntity<>(farm, HttpStatus.OK);
    }

    @PostMapping("/farms")
    public ResponseEntity<Farm> createFarm(@RequestHeader(name="Authorization") String tokenJwt, @RequestBody Farm farm) {

        Farm newFarm = farmService.createFarm(tokenJwt, farm);

        return new ResponseEntity<>(newFarm, HttpStatus.CREATED);
    }

    @DeleteMapping("/farms/{id}")
    public ResponseEntity<Void> deleteFarm(@PathVariable Integer id) {
        farmService.deleteFarm(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/farms/{id}")
    public ResponseEntity<Farm> updateFarm(@PathVariable Integer id, @RequestBody Farm farm) {
        Farm updatedFarm = farmService.updateFarm(id, farm);

        return new ResponseEntity<>(updatedFarm, HttpStatus.OK);
    }

}
