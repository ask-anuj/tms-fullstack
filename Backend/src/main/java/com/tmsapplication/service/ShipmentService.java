package com.tmsapplication.service;



import com.tmsapplication.dto.ShipmentConnection;
import com.tmsapplication.dto.ShipmentInput;
import com.tmsapplication.model.Shipment;
import com.tmsapplication.model.ShipmentStatus;
import com.tmsapplication.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;

    @Transactional(readOnly = true)
    public ShipmentConnection getShipments(
            Integer page,
            Integer size,
            String sortBy,
            String sortDir,
            ShipmentStatus status,
            String search
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Shipment> shipmentPage;

        if (status != null || search != null) {
            shipmentPage = shipmentRepository.findByStatusAndSearch(status, search, pageable);
        } else {
            shipmentPage = shipmentRepository.findAll(pageable);
        }

        return new ShipmentConnection(
                shipmentPage.getContent(),
                shipmentPage.getTotalElements(),
                shipmentPage.getTotalPages(),
                shipmentPage.getNumber()
        );
    }

    @Transactional(readOnly = true)
    public Shipment getShipmentById(String id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipment not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public Shipment getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Shipment not found with tracking number: " + trackingNumber));
    }

    @Transactional
    public Shipment createShipment(ShipmentInput input) {
        Shipment shipment = new Shipment();
        updateShipmentFromInput(shipment, input);
        shipment.setCreatedBy(getCurrentUsername());
        return shipmentRepository.save(shipment);
    }

    @Transactional
    public Shipment updateShipment(String id, ShipmentInput input) {
        Shipment shipment = getShipmentById(id);
        updateShipmentFromInput(shipment, input);
        shipment.setUpdatedBy(getCurrentUsername());
        return shipmentRepository.save(shipment);
    }

    @Transactional
    public Boolean deleteShipment(String id) {
        if (!shipmentRepository.existsById(id)) {
            throw new RuntimeException("Shipment not found with id: " + id);
        }
        shipmentRepository.deleteById(id);
        return true;
    }

    private void updateShipmentFromInput(Shipment shipment, ShipmentInput input) {
        shipment.setTrackingNumber(input.getTrackingNumber());
        shipment.setCustomerName(input.getCustomerName());
        shipment.setCustomerEmail(input.getCustomerEmail());
        shipment.setCustomerPhone(input.getCustomerPhone());
        shipment.setOrigin(input.getOrigin());
        shipment.setDestination(input.getDestination());
        shipment.setStatus(input.getStatus());
        shipment.setCarrier(input.getCarrier());
        shipment.setWeight(input.getWeight());
        shipment.setCost(input.getCost());
        shipment.setPickupDate(input.getPickupDate());
        shipment.setDeliveryDate(input.getDeliveryDate());
        shipment.setNotes(input.getNotes());
    }

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
