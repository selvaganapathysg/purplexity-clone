import { createClient } from "@/lib/client"
import { BACKEND_URL } from "@/lib/config";
import type { User } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

const supabase = createClient()

export default function Dashboard(){
    const navigate = useNavigate();

    const[user,SetUser] = useState<User | null>(null);

    useEffect(() => {
        async function getInfo(){
            const { data, error } = await supabase.auth.getUser()
            if(data.user){
                SetUser(data.user);
            }
        }
        getInfo();
    },[])

    useEffect(() => {
        async function getExistingconversation(){
            if(user){

            const {data:{session}} = await supabase.auth.getSession()
            const jwt = session?.access_token 
            const response = await axios.get(`${BACKEND_URL}/conversations`,{
                headers:{
                    Authorization: jwt
                }
            })

            console.log(response.data)
        }
    }
        getExistingconversation();
    },[user])



    return(
    <div>

        {!user && <button onClick={() => {
            navigate("/auth")
        }}>sign in</button>}

        {user && <div>
            {user.email}
            <button onClick={() => { 
                supabase.auth.signOut(); 
                SetUser(null)
                }}>sign out</button>
            </div>
        }

    </div>)
}