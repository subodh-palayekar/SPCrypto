import { createContext ,useContext,useEffect,useState} from "react";

const Crypto = createContext();

const CryptoContext = ({children})=>{

    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("INR");
    const [symbol,setSymbol] = useState("₹");
    const [days,setDays] = useState(1);

    useEffect(()=>{
        if(currency==="USD") setSymbol("$")
        else if(currency==="INR") setSymbol("₹")
    },[currency])

    return(
        <Crypto.Provider 
        value={{
            page,setPage,
            currency,setCurrency,
            symbol,setSymbol,
            days,setDays
        }}>
            {children}
        </Crypto.Provider>
    )

}

export default CryptoContext;

export const CryptoState = ()=>{
    return useContext(Crypto);
}


