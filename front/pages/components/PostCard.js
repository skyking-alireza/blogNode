import Image from "next/image";
import { Inter,Vazirmatn} from 'next/font/google'
import Link from "next/link";
const inter = Inter({subsets:['latin']})
const Vazir = Vazirmatn({subsets:['latin']})
const PostCard = ({data})=>{
    return <Link href={`/Post/${data._id}`} className={`shadow-md block duration-500 hover:shadow-xl rounded-2xl w-96 text-right ${inter.className} ${Vazir.className}`}>
        <div className="w-96">
            <Image src={`/images/posts/${data.logo}`} className="object-cover rounded-t-2xl" alt={data.subject} width={1920} height={1080} />    
        </div>
        <div className="p-4 space-y-4">
            <p className="text-base">{data.subject}</p>
            <p className="text-sm">{data.descriptions}</p>
        </div>
    </Link>
}
export default PostCard