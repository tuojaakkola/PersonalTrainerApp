import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Customer } from "../types";
import { Button } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "firstname", filter: true, headerName: "First Name" },
    { field: "lastname", filter: true, headerName: "Last Name" },
    { field: "email", filter: true, headerName: "Email" },
    { field: "phone", filter: true, headerName: "Phone" },
    { field: "streetaddress", filter: true, headerName: "Street Address" },
    { field: "postcode", filter: true, headerName: "Postcode" },
    { field: "city", filter: true, headerName: "City" },
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDeleteCustomer(params.data)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  // Function to fetch customer data from the REST API
  const fetchCustomers = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching customer data");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data._embedded.customers);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  };

  // Function to delete a customer
  const handleDeleteCustomer = (customer: Customer) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`
      )
    ) {
      fetch(customer._links.self.href, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error deleting customer");
          }
          return response.json();
        })
        .then(() => fetchCustomers()) // Refresh the customer list after deletion
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    }
  };

  // Function to reset the database
  const handleResetDatabase = () => {
    if (window.confirm("Are you sure you want to reset the database?")) {
      fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset",
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error resetting the database");
          }
          return response.json();
        })
        .then(() => fetchCustomers()) 
        .catch((error) => {
          console.error("Error resetting the database:", error);
        });
    }
  };

  // Render the component and fetch customer data on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ margin: "0 auto", width: "80%", height: 750 }}>
      <div
        style={{
          marginBottom: "16px",
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={handleResetDatabase}
        >
          Reset Database
        </Button>
        <AddCustomer fetchCustomers={fetchCustomers} />
      </div>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        defaultColDef={{
          resizable: true,
          flex: 1, 
          minWidth: 100, 
        }}
      />
    </div>
  );
}
