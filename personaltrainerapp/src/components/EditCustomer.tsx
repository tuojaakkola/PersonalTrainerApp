import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Customer } from "../types";
import { useState } from "react";

type EditCustomerProps = {
  data: Customer;
  fetchCustomers: () => void;
};

export default function EditCustomer({ data: customer, fetchCustomers }: EditCustomerProps) {
    const [editedCustomer, setEditedCustomer] = useState<Customer>({} as Customer);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setEditedCustomer({
            firstname: customer.firstname,
            lastname: customer.lastname,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
            email: customer.email,
            phone: customer.phone,
            _links: customer._links
        });
      };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleUpdate = async () => {
        fetch(customer._links.self.href, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedCustomer)
        })
            .then((Response) => {
                if (!Response.ok) throw new Error("Error updating the Customer");
                return Response.json();
            })
            .then(() => fetchCustomers())
            .then(() => handleClose())
            .catch((error) => {
                console.error("Error updating the Customer", error);
              });
    };

    return (
        <>
          <Button size="small" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
                <TextField
                required
                name="firstname"
                value={editedCustomer.firstname}
                onChange={(event) => setEditedCustomer({ ...editedCustomer, firstname: event.target.value })}
                label="First Name"
                fullWidth
                variant="standard"
                />
                <TextField
                    required
                    name="lastname"
                    value={editedCustomer.lastname}
                    onChange={(event) => setEditedCustomer({ ...editedCustomer, lastname: event.target.value })}
                    label="Last Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    name="streetaddress"
                    value={editedCustomer.streetaddress}
                    onChange={(event) => setEditedCustomer({ ...editedCustomer, streetaddress: event.target.value })}
                    label="Street Address"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    name="postcode"
                    value={editedCustomer.postcode}
                    onChange={(event) => setEditedCustomer({ ...editedCustomer, postcode: event.target.value })}
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    name="city"
                    value={editedCustomer.city}
                    onChange={(event) => setEditedCustomer({ ...editedCustomer, city: event.target.value })}
                    label="City"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    name="email"
                    value={editedCustomer.email}
                    onChange={(event) => setEditedCustomer({ ...editedCustomer, email: event.target.value })}
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    name="phone"
                    value={editedCustomer.phone}
                    onChange={(event) => setEditedCustomer({ ...editedCustomer, phone: event.target.value })}
                    label="Phone"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    );
}