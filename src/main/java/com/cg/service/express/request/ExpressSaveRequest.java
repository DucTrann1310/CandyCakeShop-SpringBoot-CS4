package com.cg.service.express.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ExpressSaveRequest {
    private String name;
    private String phone;
}
