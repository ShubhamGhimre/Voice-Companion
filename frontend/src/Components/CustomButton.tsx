import { Button } from "@mui/material";
import React, { FC } from "react";

interface CustomButtonProps {
    label?: string;
    icon?: React.ReactElement;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    // input?: string;
    onError?: (error: any) => void;
  }

const CustomButton: FC<CustomButtonProps> = ({
  label,
  onClick,
  className,
  icon,
  disabled,
  onError,
  // input
}) => {
  return (
    <Button className={className} disabled= {disabled} onClick={onClick}>
        {icon}
      {label}
    </Button>
  );
};

export default CustomButton;
