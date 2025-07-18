import { useEffect, useState } from 'react'
import img1 from '/1.jpg'
import img2 from '/2.jpg'
import img4 from '/4.jpg'
import img5 from '/5.jpg'
import img6 from '/6.jpg'
const ImageSlider = () => {
    
    const images = [img1 ,img2 , img4 , img5 , img6]
    const [currentIndex , setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1 
            )
        } , 3000)
        return () => clearInterval(interval)

    },[])

    const handleImageSlide = (index) => {
        setCurrentIndex(index) 
    }

    return (
        <>
            <div className=" relative w-full sm:w-[70%] h-[40%] sm:h-[70%] rounded-xl  mx-auto overflow-hidden ">
                <div className='flex  object-cover h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)]'
                style={{transform : `translateX(-${currentIndex * 100}%)`}}>
                    {images.map((img , index) => (
                        <img key={index} src={img} alt={`image - ${currentIndex}`} className='w-[100%]   object-cover flex-shrink-0' />
                    ))}
                </div>
            </div>
            <div className='flex justify-center gap-2 mx-auto  mt-5'>
                {images.map((_ , index) => (
                    <div key={index} className={`w-3 h-3 cursor-pointer rounded-full ${currentIndex === index ? "bg-orange-400" : "bg-gray-300"} `} onClick={() => handleImageSlide(index)} ></div>
                ))}
                </div>
        </>
    )
}

export default ImageSlider 
