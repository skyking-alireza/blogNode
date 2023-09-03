import Image from 'next/image'
import {main_api} from '../../functions/main_api'
import { Vazirmatn } from 'next/font/google'
const Vazir = Vazirmatn({subsets:['latin']})
export const getServerSideProps = async ({params}) => {
    const id = params.id
    const {data} = await main_api(`/posts/post/?id=${id}`)
    return { props: {data} }
}
const Id = ({data}) =>{
    let info = data.post
    if(!data){
        return <p>Loading ...</p>
    }
    return <section className={`min-h-screen ${Vazir.className}`}>
        <div className='relative'>
            <Image className='object-cover max-h-screen' src={`/images/posts/${info.logo}`} width={1920} height={1080} alt={info.subject} />
            <h1 className='text-5xl text-white drop-shadow-xl text-center font-bold whitespace-normal w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{info.subject}</h1>
        </div>
        <div className='text-end p-8' dangerouslySetInnerHTML={{__html: info.body}} >
        </div>
    </section>
}
export default Id