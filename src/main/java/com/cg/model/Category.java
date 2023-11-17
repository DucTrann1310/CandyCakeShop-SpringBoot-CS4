package com.cg.model;

import com.cg.model.dto.CategoryResDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public CategoryResDTO toCategoryResDTO(){
        return new CategoryResDTO()
                .setId(id)
                .setName(name);
    }
}
