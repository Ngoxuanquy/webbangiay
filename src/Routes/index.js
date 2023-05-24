import { HomePage, ShopPage, ChiTiet, AddCard, Login, DangKy, Index, ChiTietDonHang, Profile, CreateProduct, SelectProduct, UpdateProduct } from "../Views"




export const publicRoute = [
    { path: "/", component: <HomePage /> },
    { path: "/shop", component: <ShopPage /> },
    { path: "/chitiet/:slug/:productId", component: <ChiTiet /> },
    { path: "/card", component: <AddCard /> },
    { path: "/login", component: <Login /> },
    { path: "/profile", component: <Profile /> },
    { path: "/dangky", component: <DangKy /> },



]


export const privateRoute = [
    { path: "/api/admin", component: <Index /> },
    { path: "/chitietdonhang/:slug", component: <ChiTietDonHang /> },
    { path: "/api/create/product", component: <CreateProduct /> },
    { path: "/api/select/product", component: <SelectProduct /> },
    { path: "/api/update/product/:productId", component: <UpdateProduct /> },
]