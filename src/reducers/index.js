export const initialState={
    products:[],
    cart:[],
    sel_product:null,
    searched_products:null,
    username:'Guest',
    token:'',
    user_id:null,
    isUser:false,
    isAuth:false,
    isAdmin:false,
    email:'',
    shippingAddress:null,
    paymentMethod:null,
    allOrders:[],
    createdOrder:[],
    successPay:false,
    adminRequest:null,
    reviews:null
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'get_all_products':
            return{
                ...state,
                products:action.payload
            }
        case 'get_all_products':
            return{
                ...state,
                products:[...state.products,action.payload]
            }
        case 'get_all_products':
            return{
                ...state,
                products:action.payload
            }
        case 'search_products':
            return{
                ...state,
                searched_products:action.payload
            }
        case 'add_to_cart':
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
        case 'remove_from_cart':
            return{
                    ...state,
                    cart:state.cart.filter((each)=>action.payload._id!=each._id)
            }
        case 'sel_product':
            return{
                ...state,
                sel_product:action.payload
            }
        case 'all_reviews':
            return{
                ...state,
                reviews:action.payload
            }
        case 'add_review':
            return{
                ...state,
                reviews:[action.payload,...state.reviews]
            }
        case 'user_login':
            return{
                ...state,
                username:action.payload.user.username,
                user_id:action.payload.user._id,
                token:action.payload.token,
                cart:action.payload.user.cart,
                email:action.payload.user.email,
                isAdmin:action.payload.user.isAdmin,
                isSeller:action.payload.user.isSeller,
                isUser:true,
                isAuth:true
            }
        case 'save_shipping_address':
            return{
                ...state,
                shippingAddress:action.payload
            }
        case 'payment_method':
            return{
                ...state,
                paymentMethod:action.payload
            }
        case 'create_order_success':
            return{
                ...state,
                createdOrder:action.payload,
                cart:[]
            }
        case 'order_pay_success':
            return{
                ...state,
                createdOrder:action.payload,
                successPay:true
            }
        case 'get_orders_of_user':
            return{
                ...state,
                allOrders:action.payload,
            }
        case 'admin_request':
            return{
                ...state,
                adminRequest:action.payload
            }
        case 'log_out':
            return{
                ...state,
                username:'Guest',
                token:null,
                user_id:null,
                isUser:false,
                isAuth:false,
                isAdmin:false,
                isSeller:false,
                email:'',
                shippingAddress:null,
                paymentMethod:null,
                order:[],
                cart:[]
            }
        default:
            return state

    }
}

export default reducer;

export const getTotalBill=(cart)=>{
    let amount=0;
    for(let i of cart){
        amount=i.current_price*i.quantity+amount
    }
    return amount;
}

export const totalNoItems=(cart)=>{
    let items=0;
    for(let i of cart){
        items=i.quantity+items
    }
    return items;
}