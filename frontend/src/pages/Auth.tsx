import { createClient } from "@/lib/client"

const supabase = createClient();





export default function Auth(){


    async function login(provider: "google" | "github"){
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider
          })

    }
    return(
        <div>
            <button onClick={() => login("google")}>Login with google</button>
            <button onClick={() => login("github")}>Login with github</button>
        </div>
    )
}