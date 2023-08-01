import { Switch as SwitchReact } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type SwitchProps = {
    className?: string;
    value: boolean;
    setValue: any;
};

const Switch = ({ className, value, setValue }: SwitchProps) => (
    <div className={`inline-flex shrink-0 ${className}`}>
        <SwitchReact
            checked={value}
            onChange={setValue}
            className={`relative inline-flex items-center w-10 h-6 pl-0.75 cursor-pointer rounded-sm border border-n-1 transition-colors outline-none dark:border-white ${
                value ? "bg-purple-1" : "bg-purple-3"
            }`}
        >
            <span
                aria-hidden="true"
                className={twMerge(
                    `pointer-events-none inline-block w-4 h-4 transition-all ${
                        value
                            ? "translate-x-4 bg-n-1"
                            : "translate-x-0 bg-purple-1"
                    }`
                )}
            />
        </SwitchReact>
    </div>
);

export default Switch;
