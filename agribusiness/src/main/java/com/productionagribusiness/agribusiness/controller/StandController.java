package com.productionagribusiness.agribusiness.controller;

import com.productionagribusiness.agribusiness.model.Stand;
import com.productionagribusiness.agribusiness.service.StandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class StandController {

    @Autowired
    StandService standService;

    @PostMapping("/farms/{idFarm}/stands")
    public ResponseEntity<Stand> createNewStand(@PathVariable Integer idFarm, @RequestBody Stand stand) {
        Stand newStand = standService.createStand(idFarm, stand);

        return new ResponseEntity<>(newStand, HttpStatus.OK);
    }

    @DeleteMapping("/stands/{id}")
    public ResponseEntity<Void> deleteStand(@PathVariable Integer id) {
        standService.deleteStand(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/farms/{idFarm}/stands/{idStand}")
    public ResponseEntity<Stand> updateStand(@PathVariable Integer idFarm, @PathVariable Integer idStand, @RequestBody Stand stand) {
        Stand updatedStand = standService.updateStand(idFarm, idStand, stand);

        return new ResponseEntity<>(updatedStand, HttpStatus.OK);
    }

    @GetMapping("/farms/{idFarm}/stands/{idStand}")
    public ResponseEntity<Stand> getStandById(@PathVariable Integer idFarm, @PathVariable Integer idStand){
        Stand stand = standService.getStandById(idFarm, idStand);

        return new ResponseEntity<>(stand, HttpStatus.OK);
    }

}
