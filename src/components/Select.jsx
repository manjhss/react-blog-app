import React, { useId } from "react";
import { Label } from "./ui/label";

const Select = ({ options, label, className, ...props }, ref) => {
	const id = useId();

	return (
		<div>
			{label && <Label htmlFor={id}></Label>}

			<select
				id={id}
				ref={ref}
				className={`px-2 py-1 rounded-lg dark:bg-black dark:text-white border-[2px] duration-200 focus:border-green-700 ${className}`}
				{...props}
			>
				{options?.map((option) => (
					<option
						key={option}
						value={option}
						className="focus:bg-slate-500"
					>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default React.forwardRef(Select);
