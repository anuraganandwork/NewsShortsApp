import { Ionicons } from "@expo/vector-icons";
import React from "react";

// type myIcon = {
//   focused: boolean,
//   color: string,
//   size: number,
//   HighlightedName: string,
//   Normalname: string,
// };

const Myicon = ({ focused, size, color, HighlightedName, Normalname }) => {
  return (
    <Ionicons
      name={focused ? HighlightedName : Normalname}
      color={color}
      size={size}
    />
  );
};

export default Myicon;
