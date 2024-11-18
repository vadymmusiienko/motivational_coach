// Skeletons
import Link from "next/link";
import {
    SkeletonOne,
    SkeletonTwo,
    SkeletonThree,
    SkeletonFour,
} from "./grid-skeletons";

// Icons
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

export const items = [
    {
        // title: "Log a New Reflection",
        // description: (
        //     <span className="text-sm">
        //         Capture Your Thoughts and Progress for Today
        //     </span>
        // ),
        header: <SkeletonOne />,
        className: "md:col-span-1 m-0",
        //icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: <Link href="/dashboard/quotes">My Quotes</Link>,
        description: (
            <Link href="/dashboard/quotes">
                <span className="text-sm">
                    Browse Your Previously Generated Quotes
                </span>
            </Link>
        ),
        header: (
            <Link href="/dashboard/quotes">
                <SkeletonTwo />
            </Link>
        ),
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Click me!",
        description: <span className="text-sm">Get motivated right now</span>,
        header: <SkeletonThree />,
        className: "md:row-span-2",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Choose your coach",
        description: (
            <span className="text-sm">
                Find the Inspiration to Reach Your Goals
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
];
