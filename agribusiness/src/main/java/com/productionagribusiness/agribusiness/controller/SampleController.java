package com.productionagribusiness.agribusiness.controller;

import com.productionagribusiness.agribusiness.model.Sample;
import com.productionagribusiness.agribusiness.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SampleController {

    @Autowired
    SampleService sampleService;

    @PostMapping("/farms/{idFarm}/stands/{idStand}/samples")
    public ResponseEntity<Sample> createSample(@PathVariable Integer idFarm, @PathVariable Integer idStand,
                                               @RequestBody Sample sample) {

        Sample newSample = sampleService.createSample(idFarm, idStand, sample);

        return new ResponseEntity<>(newSample, HttpStatus.OK);
    }

    @DeleteMapping("/samples/{id}")
    public ResponseEntity<Void> deleteSample(@PathVariable Integer id) {
        sampleService.deleteSample(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/farms/{idFarm}/stands/{idStand}/samples/{idSample}")
    public ResponseEntity<Sample> updateSample(@PathVariable Integer idFarm, @PathVariable Integer idStand,
                                               @PathVariable Integer idSample, @RequestBody Sample sample) {

        Sample updatedSample = sampleService.updateSample(idFarm, idStand, idSample, sample);

        return new ResponseEntity<>(updatedSample, HttpStatus.OK);

    }

}
