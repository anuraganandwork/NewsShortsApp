// export type TypeOfEmail = {
//   email: string;
// };
const isEmailValid = (email) => {
  if (!email && email.includes("@") && email.includes(".")) return true;
};

export default isEmailValid;
