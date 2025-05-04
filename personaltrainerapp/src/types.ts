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