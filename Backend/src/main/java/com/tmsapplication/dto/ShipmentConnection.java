package com.tmsapplication.dto;



import com.tmsapplication.model.Shipment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentConnection {
    private List<Shipment> content;
    private Long totalElements;
    private Integer totalPages;
    private Integer currentPage;
}
