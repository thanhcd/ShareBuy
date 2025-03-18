import discount from "@/app/(root)/(navigations)/discount";
import icons from "./icons";
import images from "./images";

export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.newYork,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.japan,
  },
];

export const featuredCards = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.newYork,
    category: "house",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.japan,
    category: "flat",
  },
];

export const sizeShow = [
  {title: "6"},
  {title: "6.5"},

  {title: "7"},
  {title: "7.5"},
  {title: "8"},
  {title: "8.5"},

]

export const colorOptions = [
  {color: "#FFC833"},
  {color: "#40BFFF"},
  {color: "#FB7181"},
  {color: "#53D1B6"},
  {color: "#5C61F4"},
  {color: "#223263"},

]

export const categories = [
  { title: "Áo nam", category: "Duplexes" , icon:icons.shirt},
  { title: "Váy", category: "Studios", icon:icons.dress },
  { title: "Trang phục công sở", category: "All", icon:icons.manbag },
  { title: "Túi xách nữ", category: "Condos", icon:icons.womanbag },
  { title: "Túi xách nữ", category: "Condos", icon:icons.womanbag },
  { title: "Túi xách nữ", category: "Condos", icon:icons.womanbag },
  { title: "Túi xách nữ", category: "Condos", icon:icons.womanbag },
];

export const categories_man = [
  { title: "Áo", icon:icons.shirt},
  { title: "Trang phục công sở", category: "All", icon:icons.manbag },
  { title: "Áo thun nam",  icon:icons.tshirt },
  { title: "Giày nam", icon:icons.manshoe },
  { title: "Quần nam", icon:icons.manpant },
  { title: "Đồ lót nam",  icon:icons.manunderwear },


];

export const categories_lady = [
  { title: "Váy", icon:icons.dress },
  { title: "Áo thun nữ",  icon:icons.womanTshirt },
  { title: "Quần nữ",  icon:icons.womanpant },
  { title: "Váy ngắn",  icon:icons.skirt },
  { title: "Túi xách nữ",  icon:icons.womanbag },
  { title: "Giày cao gót",  icon:icons.womanshoe },
  { title: "Đồ lót", icon:icons.bikini },

];


export const normalProduct = [
  {id: "1",image: images.imageProduct1, name: 'Blue Laminate', price: '300.00', discount:'150.00', describe:"The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience."},
  {id: "2",image: images.imageProduct2, name: 'Red Laminate', price: '300.00', discount:'150.00', describe:"The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience."},
  {id: "3",image: images.imageProduct3, name: 'Yellow Laminate', price: '300.00', discount:'150.00', describe:"The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience."},
  {id: "4",image: images.imageProduct4, name: 'Black Laminate', price: '300.00', discount:'150.00', describe:"The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience."}

]

export const megasale = [
  {id: "1",image: images.imageProduct1, name: 'Blue Laminate', price: '300.00', discount:'150.00'},
  {id: "2",image: images.imageProduct2, name: 'Red Laminate', price: '300.00', discount:'150.00'},
  {id: "3",image: images.imageProduct3, name: 'Yellow Laminate', price: '300.00', discount:'150.00'},
  {id: "4",image: images.shoe1, name: 'Black Laminate', price: '300.00', discount:'150.00'}

]

export const flashsale = [
  {id: "1",image: images.imageProduct1, name: 'Blue Laminate', price: '300.00', discount:'150.00'},
  {id: "2",image: images.imageProduct2, name: 'Red Laminate', price: '300.00', discount:'150.00'},
  {id: "3",image: images.imageProduct3, name: 'Yellow Laminate', price: '300.00', discount:'150.00'},
  {id: "4",image: images.shoe1, name: 'Black Laminate', price: '300.00', discount:'150.00'}

]

export const cartData = [
  {id: "1",image: images.imageProduct1, name: 'Blue Laminate', price: '300.00', discount:'150.00'},
  {id: "2",image: images.imageProduct2, name: 'Red Laminate', price: '300.00', discount:'150.00'},
  {id: "3",image: images.imageProduct3, name: 'Yellow Laminate', price: '300.00', discount:'150.00'},
  {id: "4",image: images.shoe1, name: 'Black Laminate', price: '300.00', discount:'150.00'},
  
  {id: "5",image: images.imageProduct1, name: 'Blue Laminate', price: '300.00', discount:'150.00'},
  {id: "6",image: images.imageProduct2, name: 'Red Laminate', price: '300.00', discount:'150.00'},
  {id: "7",image: images.imageProduct3, name: 'Yellow Laminate', price: '300.00', discount:'150.00'},
  {id: "8",image: images.shoe1, name: 'Black Laminate', price: '300.00', discount:'150.00'},

]

export const orderData = [
  {id: "1",image: images.imageProduct1, name: 'Blue Laminate', price: '300.00', discount:'150.00'},
  {id: "2",image: images.imageProduct2, name: 'Red Laminate', price: '300.00', discount:'150.00'},



]

export const classify = [
  { title: "Áo", icon:icons.shirt},
  { title: "Đồ lót", icon:icons.bikini },
  { title: "Váy", icon:icons.dress },
  { title: "Thời trang công sở", icon:icons.manbag },
  { title: "Quần nam", icon:icons.manpant },
  { title: "Giày nam", icon:icons.manshoe },
  { title: "Đồ lót nam",  icon:icons.manunderwear },
  { title: "Áo thun nam",  icon:icons.tshirt },
  { title: "Túi xách nữ",  icon:icons.womanbag },
  { title: "Quần nữ",  icon:icons.womanpant },
  { title: "Giày cao gót",  icon:icons.womanshoe },
  { title: "Áo thun nữ",  icon:icons.womanTshirt },
  { title: "Váy ngắn",  icon:icons.skirt },
];



export const CreditCard = [
  {id: "1", idcard: "1234 5678 0000 0000", name: "Lailyfa Febrina",  date: "12/2026"},
  {id: "2", idcard: "1234 5678 0000 0000", name: "Lailyfa Febrina", date: "12/2026", color: "blue"}
]


export const AddressData = [
  {id: "1", name: "Khánh An", place: "IUH",  phone: "+99 12345567890"},
  {id: "2", name: "Khang", place: "Suối tiên",  phone: "+99 12345567890"},
]

export const filterConditions = [
  { id: "1", title: "Mới" },
  { id: "2", title: "Đã sử dụng" },
];

export const filterbuyForm = [
  { id: "1", title: "All Listing" },
  { id: "2", title: "Accepts Offers" },
  { id: "3", title: "Auction" },
  { id: "4", title: "Buy It Now" },
  { id: "5", title: "Classified Ads" },

];

export const filterPosition = [
  { id: "1", title: "US Only" },
  { id: "2", title: "North America" },
  { id: "3", title: "Europe" },
  { id: "4", title: "Asia" },

];

export const filterLook = [
  { id: "1", title: "Free Returns" },
  { id: "2", title: "Returns Accepted" },
  { id: "3", title: "Authorized Seller" },
  { id: "4", title: "Completed Items" },
  { id: "5", title: "Sold Items" },
  { id: "6", title: "Deals & Savings" },
  { id: "7", title: "Sale Items" },
  { id: "8", title: "Listed as Lots" },
  { id: "9", title: "Search in Description" },
  { id: "10", title: "Benefits charity" },
  { id: "11", title: "Authenticity Verified" },

];

