import { cn } from "@/lib/utils";

export default function GridItem({
    className,
    title,
    description,
    header,
    icon,
}) {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-none p-4 bg-black border-white/[0.2] border justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-xs text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
}
