import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentUser} from "@/lib/appwrite";


const GlobalContext = createContext<{
    isLoggedIn: boolean,
    setIsLoggedIn: (value: boolean) => void,
    user: any,
    setUser: (value: any) => void,
    loading: boolean
}>(null as any)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                setIsLoggedIn(true)
                setUser(res)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);
    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            loading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider