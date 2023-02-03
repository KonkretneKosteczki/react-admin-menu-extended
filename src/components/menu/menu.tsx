import React from "react";
import {Menu as RaMenu} from "react-admin";

export const Menu: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return (
        <RaMenu>{children}</RaMenu>
    )
}
