import React from "react";
import {useSidebarState} from "react-admin";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export const MenuDivider: React.FC<{label?: string}> = ({label}) => {
    const [sidebarIsOpen] = useSidebarState();
    return (
        <Divider flexItem textAlign="left" style={{width: "100%"}}>
            {label && sidebarIsOpen && (
                <Typography variant="caption" color="textSecondary">
                    {label}
                </Typography>
            )}
        </Divider>
    );
};
