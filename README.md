# React Admin Menu Extended

Free, Open-Source alternative to react-admin enterprise edition MultiLevelMenu utility

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation
React-admin-menu-extended is available from npm. You can install it using:
```
npm install @konkretnekosteczki/react-admin-menu-extended
#or
yarn add @konkretnekosteczki/react-admin-menu-extended
```

## One component to rule them all

At the core of the library lies a single component that takes care of all your menuing needs.

``` js
<Admin
    dataProvider={dataProvider}
    menu={() => (
        <Menu>
            {/*base level menu item created via passing of the resource name*/}
            <MenuItem name="users" />

            {/*base level menu item created via passing of the link parameters*/}
            <MenuItem to="/users" primaryText="Events">
            
            {/*base level menu item created via passing of onClick handler*/}
            <MenuItem onClick={() => alert("Pressed Button")} primaryText="Alert">

            {/*multi level menu item created via passing of the resource name*/}
            <MenuItem name="events">
                <MenuItem to="/events/1/show" primaryText="Event #1" />
                <MenuItem to="/events/2/show" primaryText="Event #2" />
            </MenuItem>

            {/*multi level menu item created via passing of the link parameters*/}
            <MenuItem to="/events" primaryText="Events Link">
                <MenuItem to="/events/1/show" primaryText="Event #1" />
                <MenuItem to="/events/2/show" primaryText="Event #2" />
            </MenuItem>
            
            {/*multi level menu item with no extra action, just serving the purpose of a folder*/}
            <MenuItem primaryText="Folder #1">
                <MenuItem to="/events/1/show" primaryText="Event #1" />
                <MenuItem to="/events/2/show" primaryText="Event #2" />
            </MenuItem>

            {/*multi level menu item inside a multi level menu item*/}
            <MenuItem to="/events" primaryText="Events Link">
                <MenuItem to="/events/1/show" primaryText="Event #1">
                    <MenuItem to="/events/1/edit" primaryText="Event #1 (Edit)" />
                </MenuItem>
            </MenuItem>

            {/*soon to be added: menu item button support*/}
            <MenuItem onClick={handleClick} primaryText="Menu Button">
        </Menu>
    )}
>
    ...
</Admin>
```

## Customizable menu icons

By default menu item will try to pull the icon to use from the resource definition, if not found it will fallback to the default ViewList icon. However the icon can be changed by passing a prop `leftIcon` for lowest level menu items, or `openedIcon` and `closedIcon` for higher level items.

``` js
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';

...

<Menu>
    {/*This will use icon from resource definition or fallback*/}
    <MenuItem name="users" /> 

    {/*This uses passed icons*/}
    <MenuItem name="events" closedIcon={<FolderIcon />} openedIcon={<FolderOpenIcon />} >
        <MenuItem to="/events/1/show" primaryText="Event #1" leftIcon={<EventIcon />} />
        <MenuItem to="/events/2/show" primaryText="Event #2" leftIcon={<EventBusyIcon />} />
    </MenuItem>
</Menu>
```

## Extra divider component

Application also exports a custom menu divider component that can help in sorting the menu items. Component accepts a label prop for customization purposes.

```html
<Menu>
    <MenuDivider label="Users Section" />

    <MenuItem name="users" />
    <MenuItem to="/users/1/show" primaryText="User #1" />
    <MenuItem to="/users/2/show" primaryText="User #2" />

    <MenuDivider label="Events Section" />

    <MenuItem name="events" />
    <MenuItem to="/events/1/show" primaryText="Event #1" />
    <MenuItem to="/events/2/show" primaryText="Event #2" />

    <MenuDivider />
</Menu>
```
