package com.cg.controller.rest;

import com.cg.repository.GenderRepository;
import com.cg.service.dto.response.SelectOptionResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/genders")
@AllArgsConstructor
public class GenderAPI {

    private final GenderRepository genderRepository;

    @GetMapping
    public List<SelectOptionResponse> getSelectOption() {
        return genderRepository.findAll().stream().map(gender -> new SelectOptionResponse(gender.getId().toString(), gender.getName())).collect(Collectors.toList());
    }
}
