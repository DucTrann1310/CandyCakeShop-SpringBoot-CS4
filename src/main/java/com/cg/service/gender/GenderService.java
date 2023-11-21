package com.cg.service.gender;


import com.cg.repository.GenderRepository;
import com.cg.service.dto.response.SelectOptionResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GenderService {

    private GenderRepository genderRepository;
    public List<SelectOptionResponse> findAll(){
        return genderRepository.findAll().stream()
                .map(gender -> new SelectOptionResponse(gender.getId().toString(), gender.getName()))
                .collect(Collectors.toList());
    }
}
