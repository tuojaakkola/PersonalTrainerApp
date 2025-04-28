import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { TrainingData } from "../types";
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Trainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);

  const [columnDefs] = useState<ColDef<TrainingData>[]>([
    { field: "activity", filter: true, width: 300, headerName: "Activity" },
    { field: "date", filter: true, width: 300, headerName: "Date" },
    { field: "duration", filter: true, width: 200, headerName: "Duration (min)" },
    { field: "customername", filter: true, width: 300, headerName: "Customer" },
  ]);

  // Fetching training data from the API
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
        );
        const data = await response.json();

        const formattedTrainings = data.map((training: any) => ({
          ...training,
          date: dayjs(training.date).format('DD/MM/YYYY HH:mm'), // Change date to dayjs object
          customername: `${training.customer.firstname} ${training.customer.lastname}`, // Set customer name from customer object
        }));

        setTrainings(formattedTrainings);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchTrainings();
  }, []);

   return(
          <div style={{ margin: "0 auto", width: "80%", height: 750 }}>
          <AgGridReact
            rowData={trainings}
            columnDefs={columnDefs}
            pagination={true}
            paginationAutoPageSize={true}
          />
          </div>
    );
}
