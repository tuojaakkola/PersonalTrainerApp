export type CustomerData = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
  };

  export type TrainingData = {
    id: number;
    activity: string;
    date: Date;
    duration: number;
    customername: string; 
  };