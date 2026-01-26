package com.tmsapplication.dto;


import com.tmsapplication.model.ShipmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentInput {

    @NotBlank(message = "Tracking number is required")
    private String trackingNumber;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerEmail;

    private String customerPhone;

    @NotBlank(message = "Origin is required")
    private String origin;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Status is required")
    private ShipmentStatus status;

    private String carrier;

    private Double weight;

    private Double cost;

    private LocalDate pickupDate;

    private LocalDate deliveryDate;

    private String notes;
}
