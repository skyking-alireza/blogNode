import { useRouter } from "next/router";
const Home = () =>{
    const router = useRouter()
    console.log(router.query.id);
    return <main>

    </main>
}
export default Home