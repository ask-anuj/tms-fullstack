package com.tmsapplication.config;



import com.tmsapplication.model.Role;
import com.tmsapplication.model.Shipment;
import com.tmsapplication.model.ShipmentStatus;
import com.tmsapplication.model.User;
import com.tmsapplication.repository.ShipmentRepository;
import com.tmsapplication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ShipmentRepository shipmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create default users if they don't exist
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@tms.com");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);

            User employee = new User();
            employee.setUsername("employee");
            employee.setPassword(passwordEncoder.encode("employee123"));
            employee.setEmail("employee@tms.com");
            employee.setFirstName("John");
            employee.setLastName("Doe");
            employee.setRole(Role.EMPLOYEE);
            employee.setEnabled(true);

            userRepository.saveAll(Arrays.asList(admin, employee));
            System.out.println("Default users created:");
            System.out.println("Admin - Username: admin, Password: admin123");
            System.out.println("Employee - Username: employee, Password: employee123");
        }

        // Create sample shipments if they don't exist
        if (shipmentRepository.count() == 0) {
            Shipment[] shipments = {
                    createShipment("TRK001", "Acme Corporation", "acme@corp.com", "555-0101",
                            "New York, NY", "Los Angeles, CA", ShipmentStatus.IN_TRANSIT,
                            "FedEx", 150.5, 299.99, LocalDate.now().minusDays(2), LocalDate.now().plusDays(1)),

                    createShipment("TRK002", "Tech Solutions Inc", "tech@solutions.com", "555-0102",
                            "Chicago, IL", "Miami, FL", ShipmentStatus.DELIVERED,
                            "UPS", 75.0, 149.99, LocalDate.now().minusDays(5), LocalDate.now().minusDays(1)),

                    createShipment("TRK003", "Global Traders", "info@globaltraders.com", "555-0103",
                            "Seattle, WA", "Boston, MA", ShipmentStatus.PENDING,
                            "DHL", 200.0, 399.99, LocalDate.now().plusDays(1), LocalDate.now().plusDays(4)),

                    createShipment("TRK004", "Fashion Retail Co", "contact@fashionretail.com", "555-0104",
                            "Dallas, TX", "Denver, CO", ShipmentStatus.IN_TRANSIT,
                            "FedEx", 120.0, 249.99, LocalDate.now().minusDays(1), LocalDate.now().plusDays(2)),

                    createShipment("TRK005", "Electronics World", "support@electronicsworld.com", "555-0105",
                            "San Francisco, CA", "Phoenix, AZ", ShipmentStatus.DELIVERED,
                            "UPS", 90.0, 179.99, LocalDate.now().minusDays(7), LocalDate.now().minusDays(3)),

                    createShipment("TRK006", "Furniture Plus", "info@furnitureplus.com", "555-0106",
                            "Houston, TX", "Atlanta, GA", ShipmentStatus.IN_TRANSIT,
                            "FedEx", 300.0, 599.99, LocalDate.now(), LocalDate.now().plusDays(3)),

                    createShipment("TRK007", "Book Depot", "orders@bookdepot.com", "555-0107",
                            "Portland, OR", "Philadelphia, PA", ShipmentStatus.PENDING,
                            "USPS", 45.0, 89.99, LocalDate.now().plusDays(2), LocalDate.now().plusDays(6)),

                    createShipment("TRK008", "Sports Equipment Ltd", "sales@sportsequip.com", "555-0108",
                            "Minneapolis, MN", "Las Vegas, NV", ShipmentStatus.DELIVERED,
                            "DHL", 175.0, 349.99, LocalDate.now().minusDays(10), LocalDate.now().minusDays(5)),

                    createShipment("TRK009", "Medical Supplies Co", "med@supplies.com", "555-0109",
                            "San Diego, CA", "Austin, TX", ShipmentStatus.IN_TRANSIT,
                            "FedEx", 85.0, 169.99, LocalDate.now().minusDays(1), LocalDate.now().plusDays(1)),

                    createShipment("TRK010", "Garden Essentials", "garden@essentials.com", "555-0110",
                            "Detroit, MI", "Nashville, TN", ShipmentStatus.PENDING,
                            "UPS", 110.0, 219.99, LocalDate.now().plusDays(1), LocalDate.now().plusDays(5))
            };

            shipmentRepository.saveAll(Arrays.asList(shipments));
            System.out.println("Sample shipments created: " + shipments.length + " records");
        }
    }

    private Shipment createShipment(String trackingNumber, String customerName, String email,
                                    String phone, String origin, String destination,
                                    ShipmentStatus status, String carrier, Double weight,
                                    Double cost, LocalDate pickupDate, LocalDate deliveryDate) {
        Shipment shipment = new Shipment();
        shipment.setTrackingNumber(trackingNumber);
        shipment.setCustomerName(customerName);
        shipment.setCustomerEmail(email);
        shipment.setCustomerPhone(phone);
        shipment.setOrigin(origin);
        shipment.setDestination(destination);
        shipment.setStatus(status);
        shipment.setCarrier(carrier);
        shipment.setWeight(weight);
        shipment.setCost(cost);
        shipment.setPickupDate(pickupDate);
        shipment.setDeliveryDate(deliveryDate);
        shipment.setCreatedBy("system");
        return shipment;
    }
}
