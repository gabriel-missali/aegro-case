package com.productionagribusiness.agribusiness.service;

import com.productionagribusiness.agribusiness.exception.BadRequestException;
import com.productionagribusiness.agribusiness.exception.NotFoundException;
import com.productionagribusiness.agribusiness.jwt.JwtInMemoryUserDetailsService;
import com.productionagribusiness.agribusiness.jwt.JwtUserDetails;
import com.productionagribusiness.agribusiness.model.Farm;
import com.productionagribusiness.agribusiness.model.User;
import com.productionagribusiness.agribusiness.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FarmService {

    @Autowired
    private JwtInMemoryUserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    FarmRepository farmRepository;

    public List<Farm> getAllByUser(String tokenJwt) {
        try {
            JwtUserDetails jwtUserDetails = this.jwtInMemoryUserDetailsService.getUserDetails(tokenJwt);

            Optional<List<Farm>> farmList = Optional.ofNullable(farmRepository.findAllByUserId(jwtUserDetails.getId()));

            if (!farmList.isPresent()) {
                throw new NotFoundException("Farm not found with user id - " + jwtUserDetails.getId());
            }

            return farmList.get();
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to find all farm");
        }
    }

    public Farm getFarmById(Integer id) {
        try {
            Optional<Farm> farm = farmRepository.findById(id);

            if (!farm.isPresent()) {
                throw new NotFoundException("Farm not found with id - " + id);
            }

            return farm.get();
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to find farm by ID");
        }
    }

    public Farm createFarm(String tokenJwt, Farm farm) {
        try {
            JwtUserDetails jwtUserDetails = this.jwtInMemoryUserDetailsService.getUserDetails(tokenJwt);

            farm.setUser(new User(jwtUserDetails.getId(), jwtUserDetails.getName(), jwtUserDetails.getUsername()));

            Farm newFarm = farmRepository.save(farm);

            return newFarm;
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to create new farm");
        }
    }

    public void deleteFarm(Integer id) {
        try {
            farmRepository.deleteById(id);
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to delete farm");
        }
    }

    public Farm updateFarm(Integer id, Farm farm) {
        try {
            Farm updatedFarm = getFarmById(id);

            if (Objects.nonNull(updatedFarm)) {
                updatedFarm.setName(farm.getName());
                updatedFarm.setAddress(farm.getAddress());
                updatedFarm.setDescription(farm.getDescription());

                updatedFarm = farmRepository.save(updatedFarm);
            }

            return updatedFarm;
        } catch (BadRequestException badRequestException){
            throw new BadRequestException("Error to update farm");
        }
    }

}
