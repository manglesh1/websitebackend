import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { getUserData } from "@/lib/data/data";
import DataTable from "../tables/DataTable";

// components/LoginButton.tsx
const HomePage = async () => {
    const user = await getUserData();
    if(user) {
        return <DataTable />;
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Link 
                    className={buttonVariants({
                        size:'lg',
                    })}
                    href='/api/auth/login' 
                >
                    Login
                </Link>
            </div>
        );
    }   
}

export default HomePage