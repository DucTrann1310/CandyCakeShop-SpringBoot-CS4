package com.cg.service.express.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class ExpressDetailResponse {
    private Long id;
    private String name;
    private String phone;

}
