import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
let key=0;
const StarRating=(props)=>{
    const rating=props.rating;
    const ratingValue=Math.floor(rating);
    const strRating=rating.toString()
    const ratingDecimal=parseInt(strRating.split('.')[1]);
    const style={
        color:'gold'
    }
    return(
        <div>
            {[...Array(ratingValue)].map(()=><StarIcon key={++key} style={style}/>)}
            {ratingValue<5 ? ratingDecimal>=5?<StarHalfIcon style={style}/>:<StarBorderIcon style={style}/>:null}
            {ratingValue<5 && [...Array(5-ratingValue-1)].map(()=><StarBorderIcon key={++key} style={style}/>)}
        </div>
    )
}
export default StarRating