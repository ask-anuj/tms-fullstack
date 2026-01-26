# Transportation Management System (TMS) - Backend

A comprehensive Transportation Management System built with Spring Boot and GraphQL.

## 🚀 Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring GraphQL**
- **Spring Security with JWT**
- **Spring Data JPA**
- **H2 Database** (Development)
- **PostgreSQL** (Production)
- **Lombok**
- **Maven**

## 📁 Project Structure

```
src/main/java/com/tms/
├── TmsApplication.java                 # Main application entry point
├── config/
│   ├── SecurityConfig.java            # Security & JWT configuration
│   ├── DataInitializer.java           # Sample data initialization
│   └── GraphQLExceptionHandler.java   # Global error handling
├── dto/
│   ├── ShipmentInput.java             # Input DTO for shipment
│   ├── ShipmentConnection.java        # Pagination wrapper
│   └── AuthPayload.java               # Authentication response
├── model/
│   ├── Shipment.java                  # Shipment entity
│   ├── ShipmentStatus.java            # Status enum
│   ├── User.java                      # User entity
│   └── Role.java                      # Role enum
├── repository/
│   ├── ShipmentRepository.java        # Shipment data access
│   └── UserRepository.java            # User data access
├── resolver/
│   ├── ShipmentResolver.java          # GraphQL shipment queries/mutations
│   └── AuthResolver.java              # GraphQL authentication
├── security/
│   ├── JwtService.java                # JWT token operations
│   └── JwtAuthenticationFilter.java   # JWT filter
└── service/
    ├── ShipmentService.java           # Shipment business logic
    ├── AuthService.java               # Authentication service
    └── CustomUserDetailsService.java  # User details loader

src/main/resources/
├── application.properties              # Application configuration
└── graphql/
    └── schema.graphqls                # GraphQL schema definition
```

## 🛠️ Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- (Optional) PostgreSQL for production

### 1. Clone or Create Project

If using Spring Initializr:
- Go to https://start.spring.io/
- Select: Maven, Java 17, Spring Boot 3.2.0
- Add dependencies: Spring Web, Spring Data JPA, Spring Security, Spring GraphQL, H2, PostgreSQL, Lombok, Validation

### 2. Configure Database

**For Development (H2):**
- Default configuration in `application.properties` uses H2
- No additional setup required

**For Production (PostgreSQL):**
1. Create database:
```sql
CREATE DATABASE tmsdb;
```

2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tmsdb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### 3. Build and Run

```bash
# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access GraphQL Playground

Open browser: `http://localhost:8080/graphiql`

### 5. Access H2 Console (Development)

URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:tmsdb`
- Username: `sa`
- Password: (leave empty)

## 🔐 Default Users

The application creates two default users:

| Username | Password    | Role     |
|----------|-------------|----------|
| admin    | admin123    | ADMIN    |
| employee | employee123 | EMPLOYEE |

## 📝 GraphQL API Examples

### Authentication

```graphql
mutation Login {
  login(username: "admin", password: "admin123") {
    token
    user {
      id
      username
      role
    }
  }
}
```

**Add the token to headers for authenticated requests:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

### Query Shipments (with Pagination)

```graphql
query GetShipments {
  shipments(page: 0, size: 10, sortBy: "createdAt", sortDir: "DESC") {
    content {
      id
      trackingNumber
      customerName
      origin
      destination
      status
      carrier
      cost
      deliveryDate
    }
    totalElements
    totalPages
    currentPage
  }
}
```

### Query with Filters

```graphql
query FilterShipments {
  shipments(
    page: 0
    size: 10
    status: IN_TRANSIT
    search: "New York"
  ) {
    content {
      id
      trackingNumber
      customerName
      status
    }
    totalElements
  }
}
```

### Get Single Shipment

```graphql
query GetShipment {
  shipment(id: "your-shipment-id") {
    id
    trackingNumber
    customerName
    customerEmail
    origin
    destination
    status
    carrier
    weight
    cost
    notes
  }
}
```

### Create Shipment (Requires Authentication)

```graphql
mutation CreateShipment {
  createShipment(input: {
    trackingNumber: "TRK999"
    customerName: "John Smith"
    customerEmail: "john@example.com"
    origin: "New York, NY"
    destination: "Los Angeles, CA"
    status: PENDING
    carrier: "FedEx"
    weight: 150.5
    cost: 299.99
    pickupDate: "2025-01-25"
    deliveryDate: "2025-01-28"
  }) {
    id
    trackingNumber
    customerName
  }
}
```

### Update Shipment (Admin Only)

```graphql
mutation UpdateShipment {
  updateShipment(
    id: "your-shipment-id"
    input: {
      trackingNumber: "TRK999"
      customerName: "John Smith Updated"
      status: IN_TRANSIT
      origin: "New York, NY"
      destination: "Los Angeles, CA"
    }
  ) {
    id
    trackingNumber
    status
  }
}
```

### Delete Shipment (Admin Only)

```graphql
mutation DeleteShipment {
  deleteShipment(id: "your-shipment-id")
}
```

## 🔒 Security & Authorization

### Roles and Permissions

- **ADMIN**: Full access (create, read, update, delete)
- **EMPLOYEE**: Limited access (create, read only)

### Endpoints

- `/graphql` - GraphQL API endpoint
- `/graphiql` - GraphQL playground (development)
- `/h2-console` - H2 database console (development)

## 🚀 Deployment

### Deploy to Railway

1. Create `railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "./mvnw spring-boot:run"
```

2. Set environment variables:
```
SPRING_DATASOURCE_URL=your_postgres_url
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

### Deploy to Render

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: tms-backend
    env: java
    buildCommand: ./mvnw clean install -DskipTests
    startCommand: java -jar target/transportation-management-system-1.0.0.jar
```

2. Add environment variables in Render dashboard

### Deploy to Heroku

```bash
heroku create tms-backend
heroku addons:create heroku-postgresql:mini
git push heroku main
```

## 📊 Sample Data

The application automatically creates 10 sample shipments with various statuses for testing purposes.

## 🧪 Testing

Test GraphQL queries in GraphiQL at `http://localhost:8080/graphiql`

### Test Flow:

1. Login to get JWT token
2. Add token to headers
3. Test CRUD operations
4. Test pagination and filtering
5. Test role-based access control

## 🔧 Configuration

Key configuration properties in `application.properties`:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:h2:mem:tmsdb

# JWT
jwt.secret=your_secret_key
jwt.expiration=86400000

# CORS
cors.allowed.origins=http://localhost:5173
```

## 📚 API Documentation

GraphQL Schema is self-documenting. Access the schema in GraphiQL playground.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Spring Boot and GraphQL**
