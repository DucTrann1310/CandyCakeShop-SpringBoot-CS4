package com.cg.controller.rest;

import com.cg.repository.RoleRepository;
import com.cg.service.dto.response.SelectOptionResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
@AllArgsConstructor
public class RoleAPI {

    private final RoleRepository roleRepository;

    @GetMapping
    public List<SelectOptionResponse> getSelectOption() {
        return roleRepository.findAll().stream().map(role -> new SelectOptionResponse(role.getId().toString(), role.getName())).collect(Collectors.toList());
    }


}
