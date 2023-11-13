import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // for snow theme


export const CreateListing = () => {
  const {currentUser} = useSelector(state => state.user)
  const navigate = useNavigate();
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 0,
    bathrooms: 0,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(formData)
  const handleImageSubmit = (e) =>{
    e.preventDefault();
    if(files.length > 0 && files.length < 7){
        setUploading(true)
        setImageUploadError(false)
        const promises = []

        for (let i = 0; i < files.length; i++){
            promises.push(storeImage(files[i]))
        }
        Promise.all(promises)
        .then((urls)=>{
            setFormData({
                ...formData,
                 imageUrls: formData.imageUrls.concat(urls),                 
                });
                setImageUploadError(false);
                setUploading(false)
                
        })
        .catch((err) => {
            setImageUploadError('Image upload failed (2mb max per image')
            setUploading(false)
        })
    }   else{
            setImageUploadError('You can only upload 6 images per listing')
            setUploading(false)
        }             
  }


  const storeImage = async (file) =>{
    return new Promise((resolve, reject) =>{
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done`)
            },
            (error)=>{
                reject(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL)=>{
                    resolve(getDownloadURL)
                })
            }
        )
    })
  }

  const handleRemoveImage = (index) =>{
    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index)
    })
  };

  const handleChange = (e) =>{
    if(
        e.target.id === 'sale' || 
        e.target.id === 'rent'){
        setFormData({
            ...formData,
            type: e.target.id
        })
    }

    if(
        e.target.id === 'parking' || 
        e.target.id === 'furnished' || 
        e.target.id === 'offer' ){
        setFormData({
            ...formData,
            [e.target.id] : e.target.checked //se añaden los [] para recuperar la variable en vez del valor de la variable
        })
    }
    if(
        e.target.type === 'number' ||
        e.target.type === 'text' ||
        e.target.type === 'textarea'    
    ){
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        })
    }    
  };
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        if(formData.imageUrls.length < 1) return setError('You must upload at least 1 image')
        if(+formData.discountPrice > +formData.regularPrice) return setError('Discount price must be lower than regular price')//Se añade + delante de las variables para transformarlas en numuero
        setLoading(true);
        setError(false);
        const res = await fetch('/api/listing/create',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                userRef: currentUser._id,
            }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false){
            setError(data.message);
        }
        navigate(`/listing/${data._id}`)        
    } catch (error) {
        setError(error.message);
        setLoading(false)        
    }

  }
  
  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
            Crear Blog
        </h1>
        <form onSubmit={handleSubmit} className='flex-col sm:flex-row gap-4'>
            <div className=' flex-col gap-4 flex-1'>
                <p>Titulo del Blog</p>
                <input type="text" 
                        placeholder='Título del Blog' 
                        id='name' 
                        maxLength='62' 
                        minLength='10' 
                        required 
                        onChange={handleChange}
                        value = {formData.name}
                        className='border p-3 rounded-lg' 
                        />
                <p>Contenido del Blog</p>
                    <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={handleQuillChange}
                        placeholder="Enter the description here..."
                    />
                
                <div className='flex gap-6 flex-wrap'>                                                                                                                   
                </div>
                <div className='flex flex-wrap gap-6'>                                                                             
                </div>
            </div>
            <div>                             
                <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>
                    Imagenes:
                    <span className='font-normal text-gray-600 ml-2'>La primera imagen sera la portada, máximo 6 imagenes. Solo se permiten archivos de imagen</span>
                </p>
                <div className="flex gap-4">
                    <input type="file" 
                            id='images' 
                            onChange={(e) => setFiles(e.target.files)} 
                            accept='image/*' 
                            multiple 
                            className='p-3 border-gray-300 rounded w-full'
                            />
                    <button onClick={handleImageSubmit}
                            disabled={uploading} 
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                            {uploading ? 'Uploading...' : 'Subir '}
                    </button>
                </div>
                <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                      <div key={url} className="flex justify-between p-3 border-items-center">
                        <img src={url} 
                            alt="listing image" 
                            className='w-20 h-20 object-contain rounded-lg' 
                        />
                        <button type="button" 
                                onClick={() => handleRemoveImage(index)} 
                                className='p-3 text-red-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Delete
                        </button>
                      </div>  
                    ))
                }     
            </div>
                <button disabled = {loading || uploading} 
                className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Creating' : 'Crear'}
                </button>
                {error && <p className='text-red-700'>{error}</p>}

            </div>                   
        </form>        
    </main>
  )
}
