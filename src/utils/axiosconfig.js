// export const base_url ="https://vyam-backend.onrender.com/api/";

// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// console.log("getTokenFromLocalStorage", getTokenFromLocalStorage);

// export const config = () => {
//   const token = getTokenFromLocalStorage?.token || '';
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//     },
//   };
// };


export const config =() =>{
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = user.token ||'';

  return  {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};
