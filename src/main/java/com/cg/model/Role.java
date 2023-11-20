package com.cg.model;

import com.cg.model.dto.CategoryResDTO;
import com.cg.model.dto.RoleResDTO;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
@Accessors(chain = true)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name")
    private String roleName;

    public RoleResDTO toRoleResDTO(){
        return new RoleResDTO()
                .setId(id)
                .setRoleName(roleName);
    }
}
