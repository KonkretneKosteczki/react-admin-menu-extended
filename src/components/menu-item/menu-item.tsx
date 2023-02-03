import React, {useState} from "react";
import {
    Menu as RaMenu,
    MenuItemLink,
    useSidebarState,
    useTranslate,
    useResourceDefinitions
} from "react-admin";
import ViewListIcon from "@mui/icons-material/ViewList";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import {To} from "@remix-run/router/history";

export interface MenuItemProps {
    to?: To;
    name?: string;
    primaryText?: string;
    children?: React.ReactNode;
    leftIcon?: React.ReactElement;
    openedIcon?: React.ReactElement;
    closedIcon?: React.ReactElement;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    // submenu
    if (props.children) {
        return (<SubMenu {...props}>{props.children}</SubMenu>)
    }
    // menu link
    if (props.to)
        return (
            <MenuItemLink
                to={props.to}
                leftIcon={props.leftIcon ?? <ViewListIcon />}
                {...props}
            />
        )
    // menu resource
    if (props.name) return <RaMenu.ResourceItem name={props.name}/>;

    // custom button
    return <div>TEXT</div>
}

const SubMenu: React.FC<MenuItemProps & {children: NonNullable<MenuItemProps["children"]>}> = (
    {
        children,
        openedIcon,
        closedIcon,
        ...props
    }) => {
    const resources = useResourceDefinitions();
    const [sidebarIsOpen] = useSidebarState();
    const [isOpen, setOpen] = useState(false);

    const resourceIcon = props.name ? resources[props.name]?.icon ?? <ViewListIcon /> : <ViewListIcon />;
    const arrayChildren = Array.isArray(children) ? children : [children];
    return (
        <div>
            <div onClick={() => setOpen(!isOpen)}>
                <MenuItem
                    {...props}
                    leftIcon={isOpen ? openedIcon ?? resourceIcon : closedIcon ?? resourceIcon}
                />
            </div>
            <Collapse in={isOpen} timeout="auto" unmountOnExit onExit={() => setOpen(false)}>
                <List disablePadding style={{paddingLeft: sidebarIsOpen ? 4 : 0}}>
                    {arrayChildren.map((child, id) =>
                        React.cloneElement(child, {parentname: props.name, key: child.props.name ?? id})
                    )}
                </List>
            </Collapse>
        </div>
    );
}
