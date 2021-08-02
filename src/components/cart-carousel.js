import React from 'react'
import '../styles/home.css';
const CartCarousel = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
           <div className="carousel-item">
             <img className="d-block w-100 cart-carousel" 
            src="https://www.10wallpaper.com/wallpaper/1920x1080/1303/nescafe_mug_coffee_fragrance_vigor-Brand_advertising_wallpaper_1920x1080.jpg" alt="First slide"/> 
          </div> 
          <div className="carousel-item">
            <img className="d-block w-100 cart-carousel" 
             src="https://i.kinja-img.com/gawker-media/image/upload/s--4-v_yy9w--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/182h9cqe4lacdjpg.jpg" alt="Second slide"/> 
          </div>
          <div className="carousel-item active">
             <img className="d-block w-100 cart-carousel" 
             src="http://www.designyourway.net/blog/wp-content/uploads/2010/11/Nike-Print-Ads-8.jpg" alt="Third slide"/> 
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
}

export default CartCarousel
