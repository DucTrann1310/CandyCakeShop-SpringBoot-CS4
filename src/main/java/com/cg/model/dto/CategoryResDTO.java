<<<<<<< Updated upstream
package com.cg.model.DTO;

public class CategoryDTO {
=======
package com.cg.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class CategoryResDTO {
>>>>>>> Stashed changes

    private Long id;

    private String name;
}
