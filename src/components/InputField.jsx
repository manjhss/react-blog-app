import React, { useId } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const InputField = React.forwardRef(function InputField(
	{ label, type, className = "", ...props },
	ref
) {
	const id = useId();

	return (
		<div className="space-y-2">
			{label && <Label htmlFor={id}>{label}</Label>}

			<Input
				className={className}
				type={type}
				ref={ref}
				id={id}
				{...props}
			/>
		</div>
	);
});

export default InputField;
