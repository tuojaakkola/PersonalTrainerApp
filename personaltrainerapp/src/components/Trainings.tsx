import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Training } from "../types";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  // Define the column definitions for the AgGridReact component
  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: "activity", filter: true, width: 300, headerName: "Activity" },
    { field: "date", filter: true, width: 300, headerName: "Date" },
    {
      field: "duration",
      filter: true,
      width: 200,
      headerName: "Duration (min)",
    },
    { field: "customername", filter: true, width: 300, headerName: "Customer" },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          onClick={() => handleDeleteTraining(params.data)}
          size="small"
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
    },
  ]);

  // Function to fetch trainings and their associated customer data
  const fetchTrainings = async () => {
    try {
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings"
      );
      const data = await response.json();
      const trainingsRaw = data._embedded.trainings;

      // Format trainings and fetch customers name from the data for each training
      const formattedTrainings = await Promise.all(
        trainingsRaw.map(async (training: Training) => {
          const customerResponse = await fetch(training._links.customer.href);
          const customerData = await customerResponse.json();
          const customername = `${customerData.firstname} ${customerData.lastname}`;
          const trainingId = training._links.self.href.split("/").pop();

          return {
            id: trainingId,
            activity: training.activity,
            date: dayjs(training.date).format("DD/MM/YYYY HH:mm"), // Formatting date using dayjs
            duration: training.duration,
            customername: customername,
          };
        })
      );

      setTrainings(formattedTrainings);
    } catch (error) {
      console.error("Error fething trainings or customers:");
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Function to delete a training
  const handleDeleteTraining = async (training: Training) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${training.activity} on ${training.date}?`
      )
    ) {
      try {
        await fetch(
          `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${training.id}`,
          {
            method: "DELETE",
          }
        );
        fetchTrainings();
      } catch (error) {
        console.error("Error deleting training:", error);
      }
    }
  };

  return (
    <div style={{ margin: "0 auto", width: "80%", height: 750 }}>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <AddTraining fetchTrainings={fetchTrainings} />
      </div>
      
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}
