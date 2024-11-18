// Skeletons
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
        title: "Reflection Archive",
        description: (
            <span className="text-sm">
                Review Your Journey and Track Your Growth
            </span>
        ),
        header: <SkeletonTwo />,
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
