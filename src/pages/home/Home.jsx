import Banner from './Banner'
import BistroBoss from './BistroBoss/BistroBoss'
import CallUs from './callUs/CallUs'
import ChefRecommends from './chef-recommends/ChefRecommends'
import Featured from './featuredMenu/Featured'
import Order from './order seciton/Order'
import PopularMenu from './popularMenu/PopularMenu'
import Testimonials from './testimonial/Testimoials'

const Home = () => {
  return (
    <div className='space-y-14 pb-14 '>
      <Banner />
      <div className='max-w-[90vw] mx-auto space-y-14'>
        <Order />
        <BistroBoss />
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
