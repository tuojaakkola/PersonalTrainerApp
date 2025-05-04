// This type is used to represent the customer data from the API
export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
      self: {
        href: string;
      };
      customer: {
        href: string;
      };
      trainings: {
        href: string;
      };
    };
  };

// This type is used to represent the training data from the API
export type Training = {
    id: number;
    activity: string;
    date: Date;
    duration: number;
    customername: string; 
    _links: {
      self: {
        href: string;
      };
      training: {
        href: string;
      };
      customer: {
        href: string;
      };
    };
  };

// This type is used to represent the events in the calendar
export type CalendarEvent = {
    id: string;
    activity: string;
    date: string; 
    duration: number;
    customername: string;
    start: Date;
    end: Date;
    title: string;
  };

  