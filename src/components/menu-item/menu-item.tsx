import React, {useState} from "react";
import {
    Menu as RaMenu,
    MenuItemLink,
    useSidebarState,
    useResourceDefinitions
} from "react-admin";
import ViewListIcon from "@mui/icons-material/ViewList";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import MaterialMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {To} from "@remix-run/router/history";

// TODO: config option for at most one menu item opened
// TODO: arrows for closing rather than automatically close when trying to view list
// TODO: allow custom elements not menu item as children
// TODO: for resource submenu hide submenu items if resource list view is not defined

export interface MenuItemProps {
    to?: To;
    name?: string;
    primaryText?: string;
    children?: React.ReactNode;
    leftIcon?: React.ReactElement;
    openedIcon?: React.ReactElement;
    closedIcon?: React.ReactElement;
    onClick?: () => void;
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

    // menu button & menu folder
    return (
        <MaterialMenuItem onClick={props.onClick}>
            <ListItemIcon style={{minWidth: "40px"}}>
                {props.leftIcon ?? <ViewListIcon />}
            </ListItemIcon>
            <Typography variant="inherit" color="textSecondary">
                {props.primaryText}
            </Typography>
        </MaterialMenuItem>
    )
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

    const leftIcon = props.leftIcon ?? <ViewListIcon />;
    const resourceIcon = props.name ? resources[props.name]?.icon ?? leftIcon : leftIcon;
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
