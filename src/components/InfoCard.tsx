import React from 'react'
import { BsFillInfoCircleFill } from "react-icons/bs";

type InfoCardProps = {
    text: string;
    type: "success" | "error" | "info";
}

const InfoCard = ({ text, type }: InfoCardProps) => {
    return (
        <div className={`w-full flex items-center gap-2 rounded-lg p-2 ${type === "success" && "bg-green-200" || type === "error" && "bg-red-300" || "bg-yellow-200"}`}>
            <BsFillInfoCircleFill color={"#282828"} />
            <div className='text-md font-bold text-title'>{text}</div>
        </div>
    )
}

export default InfoCard