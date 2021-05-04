package com.productionagribusiness.agribusiness.service;

import com.productionagribusiness.agribusiness.exception.BadRequestException;
import com.productionagribusiness.agribusiness.exception.NotFoundException;
import com.productionagribusiness.agribusiness.model.Sample;
import com.productionagribusiness.agribusiness.model.Stand;
import com.productionagribusiness.agribusiness.repository.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SampleService {

    @Autowired
    SampleRepository sampleRepository;

    @Autowired
    StandService standService;

    public Sample createSample(Integer idFarm, Integer idStand, Sample sample) {
        try {
            Stand stand = standService.getStandById(idFarm, idStand);

            sample.setStand(stand);

            Sample newSample = sampleRepository.save(sample);

            return newSample;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to create new sample");
        }
    }

    public void deleteSample(Integer id) {
        try {
            sampleRepository.deleteById(id);
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to delete sample");
        }
    }

    public Sample updateSample(Integer idFarm, Integer idStand, Integer idSample, Sample sample) {
        try {
            Stand stand = standService.getStandById(idFarm, idStand);
            Optional<Sample> optionalSample = sampleRepository.findById(idSample);
            Sample updatedSample = optionalSample.get();

            if (optionalSample.isPresent() && updatedSample.getId().equals(sample.getId())) {
                updatedSample.setMediaQuantityCerealsPlant(sample.getMediaQuantityCerealsPlant());
                updatedSample.setMediaWeight(sample.getMediaWeight());
                updatedSample.setQuantityPlant(sample.getQuantityPlant());
                updatedSample.setStand(stand);

                sampleRepository.save(updatedSample);
            } else {
                throw new NotFoundException("Sample not found with id - " + idSample);
            }

            return updatedSample;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to update sample");
        }
    }

}
