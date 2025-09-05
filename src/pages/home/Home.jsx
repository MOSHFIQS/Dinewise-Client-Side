import { Helmet } from 'react-helmet-async'
import Banner from './Banner'
import CallUs from './callUs/CallUs'
import ChefRecommends from './chef-recommends/ChefRecommends'
import Featured from './featuredMenu/Featured'
import Order from './order seciton/Order'
import PopularMenu from './popularMenu/PopularMenu'
import Testimonials from './testimonial/Testimoials'

const Home = () => {
  return (
    <div className='space-y-10 pb-10 '>
      
      <Helmet>
        <title>Dinewise || Home</title>
      </Helmet>
      <Banner />
      <div className='container mx-auto space-y-10'>
        <Order />
        <PopularMenu />
        <CallUs />
        <ChefRecommends />
      </div>
      <Featured />
      <Testimonials />
    </div>
  )
}

export default Home
