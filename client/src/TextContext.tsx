import React from "react";

const TextContext = React.createContext({text: "", setText: (text: string) => {}})

export default TextContext;
