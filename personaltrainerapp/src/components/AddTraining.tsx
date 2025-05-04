import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Customer } from "../types";


type AddTrainingProps = {
  fetchTrainings: () => void;
};

export default function AddTraining({ fetchTrainings }: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newTraining, setNewTraining] = useState({
    date: new Date().toISOString(),
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    fetchCustomers();
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to fetch customer data from the REST API
  const fetchCustomers = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching customers");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data._embedded.customers);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  };

  // Function to save a new training
  const handleSave = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newTraining.date,
          duration: newTraining.duration,
          activity: newTraining.activity,
          customer: newTraining.customer,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding training");
        }
        return response.json();
      })
      .then(() => {
        fetchTrainings();
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding training:", error);
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Training</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={newTraining.date}
            onChange={(event) =>
              setNewTraining({ ...newTraining, date: event.target.value })
            }
          />

          <TextField
            required
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="standard"
            value={newTraining.duration}
            onChange={(event) =>
              setNewTraining({ ...newTraining, duration: event.target.value })
            }
          />
          <TextField
            required
            label="Activity"
            fullWidth
            variant="standard"
            value={newTraining.activity}
            onChange={(event) =>
              setNewTraining({ ...newTraining, activity: event.target.value })
            }
          />
          <TextField
            required
            select
            label="Customer"
            fullWidth
            variant="standard"
            value={newTraining.customer}
            onChange={(event) =>
              setNewTraining({ ...newTraining, customer: event.target.value })
            }
          >
            {customers.map((customer) => (
              <MenuItem
                key={customer._links.self.href}
                value={customer._links.self.href}
              >
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
