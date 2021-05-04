package com.productionagribusiness.agribusiness.service;

import com.productionagribusiness.agribusiness.exception.BadRequestException;
import com.productionagribusiness.agribusiness.exception.NotFoundException;
import com.productionagribusiness.agribusiness.jwt.JwtInMemoryUserDetailsService;
import com.productionagribusiness.agribusiness.model.Farm;
import com.productionagribusiness.agribusiness.model.Stand;
import com.productionagribusiness.agribusiness.repository.StandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class StandService {

    @Autowired
    JwtInMemoryUserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    StandRepository standRepository;

    @Autowired
    FarmService farmService;

    public Stand createStand(Integer idFarm, Stand stand) {
        try {
            Farm farm = farmService.getFarmById(idFarm);
            stand.setFarm(farm);

            Stand newStand = standRepository.save(stand);

            return newStand;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to create new stand");
        }
    }

    public void deleteStand(Integer id) {
        try {
            standRepository.deleteById(id);
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to delete stand");
        }
    }

    public Stand updateStand(Integer idFarm, Integer idStand, Stand stand) {
        try {
            Farm farm = farmService.getFarmById(idFarm);
            Stand updatedStand = getStandById(idFarm, idStand);

            if (Objects.nonNull(updatedStand)) {
                updatedStand.setArea(stand.getArea());
                stand.setFarm(farm);
                updatedStand = standRepository.save(stand);
            }

            return updatedStand;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to update stand");
        }
    }

    public Stand getStandById(Integer idFarm, Integer idStand) {
        try {
            Optional<Stand> stand = standRepository.findById(idStand);

            if (!stand.isPresent() && stand.get().getFarm().getId().equals(idFarm)) {
                throw new NotFoundException("Stand not found with id - " + idStand);
            }

            return stand.get();
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to find stand by ID");
        }
    }

}
