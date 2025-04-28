import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { CustomerData } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  const [columnDefs] = useState<ColDef<CustomerData>[]>([
    { field: "firstname", filter: true, headerName: "First Name" },
    { field: "lastname", filter: true, headerName: "Last Name" },
    { field: "email", filter: true, headerName: "Email" },
    { field: "phone", filter: true, headerName: "Phone" },
    { field: "streetaddress", filter: true, headerName: "Street Address" },
    { field: "postcode", filter: true, headerName: "Postcode" },
    { field: "city", filter: true, headerName: "City" },
  ]);

  // Fetch customer data from the REST API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
        );
        const data = await response.json();
        setCustomers(data._embedded.customers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div style={{ margin: "0 auto", width: "80%", height: 750 }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}
