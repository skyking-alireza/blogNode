import { Inter, Vazirmatn} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const Vazir = Vazirmatn({ subsets: ['latin'] })
import { Editor } from '@tinymce/tinymce-react';
import Image from 'next/image'
import { Alert } from './components/alert';
import axios from 'axios';
const NewPost = () =>{
    const formData = new FormData();
    const OnChangeLander = (e)=>{
        formData.set([e.target.name] , e.target.value)
    }
    const OnSubmitHandler = (e) =>{
        e.preventDefault()
        axios('/api/NewPostApi',{method:'POST',data:formData,headers: {"Access-Control-Allow-Origin": "*"}})
          .then(()=>{
              Alert({color:'green',text:'عملیات موفیقت آمیز بود'})
              e.target.reset()
          })
          .catch(({response})=>{for (var e in response.data){Alert({color:'red',text:`${e} : ${response.data[e]}`})}})
    }
    return <main className={`grid grid-cols-7 min-h-screen p-12 text-sm ${inter.className}  ${Vazir.className}`}>
        <div className={'fixed overflow-y-auto max-h-screen z-50 right-0'} id={'select_alert'}>
        </div>
        <form onSubmit={OnSubmitHandler} className='col-span-3 col-start-3 flex flex-col gap-y-6'>
            <input onChange={OnChangeLander} className='p-4 outline-none border-[0.25px] focus:border-white focus:shadow-lg duration-300 hover:border-white hover:shadow-lg text-right border-slate-500 rounded-xl' type='text' placeholder='عنوان' name='subject' />
            <input onChange={OnChangeLander} className='p-4 outline-none border-[0.25px] focus:border-white focus:shadow-lg duration-300 hover:border-white hover:shadow-lg text-right border-slate-500 rounded-xl' type='text' placeholder='توضیحات' name='descriptions' />
            <div className='col-span-3'>
                <Editor
                    tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                    onChange={(value,editor) => formData.set('body',editor.getContent())}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools help charmap quickbars emoticons',
                    imagetools_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    toolbar_sticky: true,
                    }}
                />
            </div>
            <label className='w-fit cursor-pointer mx-auto'>
                <input onChange={(e)=>{
                let setImage = document.querySelector('#setimage')
                let setImageOld = document.querySelector('#setimageold')
                setImage.src = URL.createObjectURL(e.target.files[0])
                setImage.classList.remove('hidden')
                setImageOld.classList.add('hidden')
                formData.set('logo' ,e.target.files[0])
          }} type='file' name='image' accept='images/*' className='hidden' />
                <div className='border-2 border-blue-600 p-1 border-dashed rounded-2xl'>
                    <div className='w-[400px] h-[300px] m-auto'>
                        <img id='setimage' src=' ' width={800} height={600} className='object-cover w-[400px] p-5 rounded-3xl h-[300px] hidden' alt='hidden image' />
                        <Image id='setimageold' className='object-cover' src='/images/no_image_to_show_.jpg' width={800} height={600} alt='preview image' />
                    </div>
                    <p className='text-center'>برای آپلود تصویر <span className='text-blue-600 text-base'>کلیک کنید</span></p>
                </div>
            </label>
            <input className='bg-green-500/80 p-5 text-base text-white rounded-xl cursor-pointer duration-300 hover:bg-green-500' type='submit' value={'ذخیره'} />
        </form>
    </main>
}
export default NewPost