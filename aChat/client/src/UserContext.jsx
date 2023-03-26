import { useState } from "react";
import { createContext } from "react";
export const Context = createContext({});

// export function UserContextPorvider({ children }) {
//   const [username, setUsername] = useState(null);
//   const [id, setId] = useState(null);
//   return (
//     <UserContextPorvider value={{ username, setUsername, id, setId }}>
//       {children}
//     </UserContextPorvider>
//   );
// }
