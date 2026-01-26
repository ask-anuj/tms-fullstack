package com.tmsapplication.repository;



import com.tmsapplication.model.Shipment;
import com.tmsapplication.model.ShipmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, String> {

    Optional<Shipment> findByTrackingNumber(String trackingNumber);

    Page<Shipment> findByStatus(ShipmentStatus status, Pageable pageable);

    @Query("SELECT s FROM Shipment s WHERE " +
            "(:status IS NULL OR s.status = :status) AND " +
            "(:search IS NULL OR " +
            "LOWER(s.trackingNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.customerName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.origin) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.destination) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Shipment> findByStatusAndSearch(
            @Param("status") ShipmentStatus status,
            @Param("search") String search,
            Pageable pageable
    );
}
