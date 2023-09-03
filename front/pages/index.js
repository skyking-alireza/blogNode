import Image from 'next/image'
import { Inter } from 'next/font/google'
import {main_api} from '../functions/main_api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import PostCard from './components/PostCard'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [posts , setPosts] = useState([])
  useEffect(()=>{
    main_api('posts/allposts/',{headers: {"Access-Control-Allow-Origin": "*"}})
    .then(({data})=>{
      const NewData = data.allposts
      NewData.reverse()
      setPosts(NewData);
    })
  },[])
    return (
    <main className={`min-h-screen text-center p-12 ${inter.className}`}>
      <h1 className='text-6xl'>Blogs</h1>
      {posts.length ?<div>
        <main className='p-8 flex gap-4 justify-end'>
          {posts.map((e,i)=>{return <PostCard key={i} data={e} />})}
        </main>
        <Link href={'/NewPost'} className='m-8 p-4 bg-slate-500 rounded-lg w-fit text-white mx-auto cursor-pointer duration-300 hover:bg-slate-700'>click to add a blog</Link>
      </div>  : <main>
          <p className='text-red-600 text-sm p-4'>blog not found</p>
          <Link href={'/NewPost'} className='m-2 p-4 bg-slate-500 rounded-lg w-fit text-white mx-auto cursor-pointer duration-300 hover:bg-slate-700'>click to add a blog</Link>
        </main>}
        <div className={'fixed overflow-y-auto max-h-screen z-50 right-0'} id={'select_alert'}>
      </div>
    </main>
  )
}
