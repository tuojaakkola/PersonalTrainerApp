import { Button } from "@mui/material";
import Papa from "papaparse";
import { Customer } from "../types";

type ExportCSVProps = {
  customers: Customer[];
};

export default function ExportCSV({ customers }: ExportCSVProps) {
  const handleExport = () => {
    // Filter out unnecessary fields
    const filteredData = customers.map((customer) => ({
      FirstName: customer.firstname,
      LastName: customer.lastname,
      Email: customer.email,
      Phone: customer.phone,
      StreetAddress: customer.streetaddress,
      Postcode: customer.postcode,
      City: customer.city,
    }));

    // Convert data to CSV using PapaParse
    const csv = Papa.unparse(filteredData);

    // Create a Blob and download the CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button size="small" variant="contained" color="primary" onClick={handleExport}>
      Export Customers to CSV file
    </Button>
  );
}