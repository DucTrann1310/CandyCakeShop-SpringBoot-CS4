package com.cg.service.role;


import com.cg.repository.RoleRepository;
import com.cg.service.dto.response.SelectOptionResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoleService {

    private RoleRepository roleRepository;
    public List<SelectOptionResponse> findAll(){
        return roleRepository.findAll().stream()
                .map(role -> new SelectOptionResponse(role.getId().toString(), role.getName()))
                .collect(Collectors.toList());
    }

}
