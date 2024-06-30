"use client"
import Image from "next/image";
import Card from "@/components/Card";
import axios from "axios";
import CardMedia from '@mui/material/CardMedia';
import {FaArrowRightLong} from "react-icons/fa6";
import PopulardishesCard from "@/components/PopulardishesCard";
import {useEffect,useState} from "react";
import {useRouter} from 'next/navigation'
import Footer from "@/components/footer";
import Header from "@/components/header";
import MenuCard from "@/components/MenuCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const page = () => {
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 ,// optional, default to 1.
    partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 10, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 10,// optional, default to 1.
  }
};

  const [data,setData] = useState([]);
  const [menu,setMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
       const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json', 
        };   
         const response = await axios.get(`http://localhost:4000/user/menu`,{  
            headers
        }
        );
        console.log(response.data);
        setMenu(response.data.menu);
        console.log(data);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json', 
        };   
         const response = await axios.get(`http://localhost:4000/user/shops`,
        {  
            headers
        }
        );
        console.log(response.data);
        setData(response.data.shops);
        console.log(data);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  },[]);
  console.log(data);
  data.map(({image})=> {
     console.log(image);
  })
    const element = data.image;
    console.log(element);
    
  const router = useRouter();
  return (
    <div className="w-screen h-screen overflow-auto bg-gradient-to-b from-green-100 to-green-200">
        <div className="mb-20">

        <Header title='Explore'/>
        </div>
      <div className="px-6 py-2 flex flex-col gap-6">

        <div className="flex bg-gray-200 p-2 rounded-3xl ">
          <Image
            className="mx-4  object-contain"
            src="/search.png"
            height={25}
            width={22}
            alt="profile-img"
          />
          <span className="text-2xl text-gray-400">Search</span>
        </div>
      <div className="flex justify-between">

      <Card imgUrl="/all.png" imgName="All" name="All" />
      <Card imgUrl="/rice.png" imgName="Rice" name="Rice"/>
      <Card imgUrl="/eggRoll.png" imgName="Roll" name="Roll"/>
      <Card imgUrl="/shakes.png" imgName="Shakes" name="Shakes"/>
      </div>
      <div className="flex justify-between">

      <span className="text-2xl">Explore By Shops </span> 
      <button onClick={()=> router.push('/user/allShops')} className="text-blue-600 flex gap-4 items-center cursor-pointer">View All <FaArrowRightLong /></button>
      </div>
      <div className="flex justify-between  w-full py-2 px-4 h-40 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg">
        <div>

        <h1 className="flex self-start text-3xl text-text font-semibold mr-9">MBA ChaiWala</h1>
        <p className="text">Near B3</p>
        </div>
        <CardMedia
         component="img"
         className="rounded-lg"
         sx={{ width: 200 }}
         image='https://justguwahatithings.com/wp-content/uploads/2021/12/image_editor_output_image1529875202-1640001811888.jpg'
         alt="shop img"
       />
      </div>

      <div className="flex justify-between">

      <h2 className="text-2xl">Explore By Dishes</h2>
      <button onClick={()=> router.push('/user/allMenu')} className="text-blue-600 flex gap-4 items-center cursor-pointer">View All <FaArrowRightLong /></button>
      </div>
      <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}

  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
 
        {
          menu.map((menu,index)=> (
            <div >
            
            <MenuCard menu={menu} key={index}/>
          </div>
            ))
          }
     </Carousel>
        
      </div >
      <div className="mt-16">

      <Footer/>
      </div>
    </div>
  );
};
export default page;
