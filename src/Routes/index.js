import { HomePage, ShopPage, ChiTiet, AddCard, Login, DangKy, Index, ChiTietDonHang } from "../Views"




export const publicRoute = [
    { path: "/", component: <HomePage /> },
    { path: "/shop", component: <ShopPage /> },
    { path: "/chitiet/:slug/:id", component: <ChiTiet /> },
    { path: "/card", component: <AddCard /> },
    { path: "/login", component: <Login /> },
    { path: "/dangky", component: <DangKy /> },


]


export const privateRoute = [
    { path: "/api/admin", component: <Index /> },
    { path: "/chitietdonhang/:slug", component: <ChiTietDonHang /> },


]