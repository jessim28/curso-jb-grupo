export type AEUser = {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
};
/**
*
* @param userName - username para creación de objeto 
usuario
* @returns - {@link AEUser}.
*
* @example
* ```ts
* const res = makeUser(cramirezh);
* ```
*/
export function makeUser(userName: string): AEUser {
  return {
    name: `dev_${userName}`,
    email: `dev_${userName}@pw.com`,
    password: "12345678",
    day: "10",
    month: "10",
    year: "1990",
    firstName: `${userName}`,
    lastName: "N.A.",
    address: "N.A.",
    country: "United States",
    state: "QC",
    city: "Montreal",
    zipcode: "H2X 1Y4",
    mobile: "123456",
  };
}
/**
* **Detail:**
* 
* Genera las credenciales de acceso (email/password) en 
base a userName.
*/
export function getAuth(userName: string) {
  return {
    email: `dev_${userName}@pw.com`,
    password: "12345678",
  };
}
