import Banner from './Banner'
import Featured from './featuredMenu/Featured'
import Order from './order seciton/Order'
import PopularMenu from './popularMenu/PopularMenu'

const Home = () => {
  return (
    <div className=' '>
      <Banner />
      <Order />
      <PopularMenu />
      <Featured />
    </div>
  )
}

export default Home
