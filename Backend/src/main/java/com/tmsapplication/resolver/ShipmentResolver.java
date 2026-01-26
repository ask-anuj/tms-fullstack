package com.tmsapplication.resolver;



import com.tmsapplication.dto.ShipmentConnection;
import com.tmsapplication.dto.ShipmentInput;
import com.tmsapplication.model.Shipment;
import com.tmsapplication.model.ShipmentStatus;
import com.tmsapplication.service.ShipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ShipmentResolver {

    private final ShipmentService shipmentService;

    @QueryMapping
    public ShipmentConnection shipments(
            @Argument Integer page,
            @Argument Integer size,
            @Argument String sortBy,
            @Argument String sortDir,
            @Argument ShipmentStatus status,
            @Argument String search
    ) {
        return shipmentService.getShipments(
                page != null ? page : 0,
                size != null ? size : 10,
                sortBy != null ? sortBy : "createdAt",
                sortDir != null ? sortDir : "DESC",
                status,
                search
        );
    }

    @QueryMapping
    public Shipment shipment(@Argument String id) {
        return shipmentService.getShipmentById(id);
    }

    @QueryMapping
    public Shipment shipmentByTrackingNumber(@Argument String trackingNumber) {
        return shipmentService.getShipmentByTrackingNumber(trackingNumber);
    }

    @MutationMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public Shipment createShipment(@Argument @Valid ShipmentInput input) {
        return shipmentService.createShipment(input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Shipment updateShipment(@Argument String id, @Argument @Valid ShipmentInput input) {
        return shipmentService.updateShipment(id, input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Boolean deleteShipment(@Argument String id) {
        return shipmentService.deleteShipment(id);
    }
}