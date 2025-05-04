import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Customer } from "../types";
import { useState } from "react";

type AddCustomerProps = {
  fetchCustomers: () => void;
};

export default function AddCustomer({ fetchCustomers }: AddCustomerProps) {
  const [newCustomer, setNewCustomer] = useState<Customer>({} as Customer);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding the customer");
        }
        return response.json();
      })
      .then(() => fetchCustomers()) 
      .then(() => handleClose())
      .catch((error) => {
        console.error("Error adding customer", error);
      });
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Customer</DialogTitle>
        <DialogContent>
          <TextField
            required
            name="firstname"
            value={newCustomer.firstname}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, firstname: event.target.value })
            }
            label="First Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            name="lastname"
            value={newCustomer.lastname}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, lastname: event.target.value })
            }
            label="Last Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            name="streetaddress"
            value={newCustomer.streetaddress}
            onChange={(event) =>
              setNewCustomer({
                ...newCustomer,
                streetaddress: event.target.value,
              })
            }
            label="Street Address"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            name="postcode"
            value={newCustomer.postcode}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, postcode: event.target.value })
            }
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            name="city"
            value={newCustomer.city}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, city: event.target.value })
            }
            label="City"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            name="email"
            value={newCustomer.email}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, email: event.target.value })
            }
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            name="phone"
            value={newCustomer.phone}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, phone: event.target.value })
            }
            label="Phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
