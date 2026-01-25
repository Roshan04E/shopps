import { Nav } from "@/types";

export const mainNav: Nav[] = [
    {
        menu: "Menu",
        link: "/menu"
    },
    {
        menu: "Our Story",
        link: "/our-story"
    },
    
]

export const userNav: Nav[] = [
    {
        menu: "Profile",
         link: "/user/profile"
    },
    {
        menu: "Orders",
        link: "/user/orders"
    },
]

export const adminNav: Nav[] = [
    {
        menu: "Overview",
         link: "/admin/overview"
    },
    {
        menu: "Products",
        link: "/admin/products"
    },{
        menu: "Orders",
         link: "/admin/orders"
    },
    {
        menu: "Users",
        link: "/admin/users"
    }
]