import { createContext, useState } from 'react';
export const DataContextProvider = createContext()

const DataContext = ({children}) => {
    const [selected, setSelected] = useState("latest")
    const dataContent = {
        selected, setSelected
    }
    return (
        <DataContextProvider.Provider value={dataContent}>
            {children}
        </DataContextProvider.Provider>
    );
};

export default DataContext;