// Dashborad imports
import { cn } from "@/lib/utils";
import Grid from "./grid";
import GridItem from "./grid-item";
import { items } from "./items";

export default function MainGrid() {
    // Display a grid
    return (
        <Grid className="my-10 max-w-7xl mx-auto md:auto-rows-[22rem]">
            {items.map((item, i) => (
                <GridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg]", item.className)}
                    icon={item.icon}
                />
            ))}
        </Grid>
    );
}
