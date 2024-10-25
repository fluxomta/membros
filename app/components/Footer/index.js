// components/Footer/index.js
"use client";

import { usePathname } from "next/navigation";
import { shouldShowLayout } from "@/utils/routeValidation";
import Image from "next/image";

export default function Footer() {
    const pathname = usePathname();
    if (!shouldShowLayout(pathname)) return null;

    return (
        <div className="flex flex-col w-full h-fit bg-secondary-500 text-[#e5e7eb] px-9 py-9">
            <div className="container mx-auto flex flex-row">
                <div className="flex flex-col gap-2 justify-center w-[35%] w-[35%]">
                    <div className="flex items-center w-full gap-4">
                        LOGO
                    </div>
                    SOCIAL
                </div>
                <div className="flex flex-row w-[65%] justify-end gap-16 text-nowrap">
                    <div className="grid grid-cols-2 gap-11">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold uppercase text-[#9ca3af] pb-3">Comany</div> <a href="#xxx" className="hover:underline">About Us</a>  <a href="#xxx" className="hover:underline">Contact</a>  <a href="#xxx" className="hover:underline">Support</a>  <a href="#xxx" className="hover:underline">News</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold uppercase text-[#9ca3af] pb-3">Legal</div> <a href="#xxx" className="hover:underline">Imprint</a>  <a href="#xxx" className="hover:underline">Privacy Policy</a>  <a href="#xxx" className="hover:underline">Terms of Use</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold uppercase text-[#9ca3af] pb-3">Newsletter</div>
                        <p className="text-[#e5e7eb] mb-2">Subscribe to our newsletter.</p>
                        NEWSLETTER
                    </div>
                </div>
            </div>
            <div className="w-full border-t border-gray-500 my-8"></div>
            <div className="text-center">© 2024 Your Companys - All rights reserved.</div>
        </div>

    );
}
