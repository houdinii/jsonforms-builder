import { type ControlProps, isDateControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DateRenderer = ({
  data: date,
  path,
  visible,
  description,
  handleChange
}: Omit<ControlProps, "data"> & { data?: Date }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 mb-2">
      <Label htmlFor="dateInput">{description}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dateInput"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal ",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{description}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(val) =>
              val ? handleChange(path, format(val, "yyyy-MM-dd")) : null
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const tester = rankWith(2, isDateControl);

const renderer = withJsonFormsControlProps(DateRenderer);

renderer.displayName = "Date Input";

export default { tester, renderer };
