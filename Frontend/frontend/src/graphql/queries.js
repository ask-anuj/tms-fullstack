import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        role
        firstName
        lastName
      }
    }
  }
`;

export const GET_SHIPMENTS = gql`
  query GetShipments(
    $page: Int
    $size: Int
    $sortBy: String
    $sortDir: String
    $status: ShipmentStatus
    $search: String
  ) {
    shipments(
      page: $page
      size: $size
      sortBy: $sortBy
      sortDir: $sortDir
      status: $status
      search: $search
    ) {
      content {
        id
        trackingNumber
        customerName
        customerEmail
        customerPhone
        origin
        destination
        status
        carrier
        weight
        cost
        pickupDate
        deliveryDate
        createdAt
      }
      totalElements
      totalPages
      currentPage
    }
  }
`;

export const GET_SHIPMENT = gql`
  query GetShipment($id: ID!) {
    shipment(id: $id) {
      id
      trackingNumber
      customerName
      customerEmail
      customerPhone
      origin
      destination
      status
      carrier
      weight
      cost
      pickupDate
      deliveryDate
      notes
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: ShipmentInput!) {
    createShipment(input: $input) {
      id
      trackingNumber
      customerName
      status
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $input: ShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      trackingNumber
      customerName
      status
    }
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`;