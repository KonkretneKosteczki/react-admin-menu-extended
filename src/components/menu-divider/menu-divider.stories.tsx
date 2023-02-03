import React from 'react';
import {Admin, Datagrid, List, Resource, Show, SimpleShowLayout, TextField} from 'react-admin';
import fakeRestDataProvider from 'ra-data-fakerest';
import { Menu } from '../menu';
import {MenuItem} from "../menu-item";
import {MenuDivider} from "./menu-divider";

const dataProvider = fakeRestDataProvider(
    {
        events: Array.from({length: 5}, (_, id) => ({id})),
        users: Array.from({length: 5}, (_, id) => ({id}))
    }
);

const ListView: React.FC = () => (
    <List>
        <Datagrid>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

const ShowView: React.FC = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id"/>
        </SimpleShowLayout>
    </Show>
);

export const Divider: React.FC<{
    userSectionLabel: string;
    eventSectionLabel: string;
    footerSectionLabel: string;
}> = ({
                                userSectionLabel,
                                eventSectionLabel,
                                footerSectionLabel
                            }) => (
    <Admin
        dataProvider={dataProvider}
        menu={() => (
            <Menu>
                <MenuDivider label={userSectionLabel} />
                <MenuItem name="users" />
                <MenuItem to="/users/1/show" primaryText="User #1" />
                <MenuItem to="/users/2/show" primaryText="User #2" />
                <MenuDivider label={eventSectionLabel} />
                <MenuItem name="events" />
                <MenuItem to="/events/1/show" primaryText="Event #1" />
                <MenuItem to="/events/2/show" primaryText="Event #2" />
                <MenuDivider label={footerSectionLabel} />
            </Menu>
        )}
    >
        <Resource name="events" list={ListView} show={ShowView} options={{label: "Events resource"}}/>
        <Resource name="users" list={ListView} show={ShowView} options={{label: "Users resource"}}/>
    </Admin>
);

export default {
    title: 'react-admin-menu-extended/Divider',
    args: {
        userSectionLabel: "User Section",
        eventSectionLabel: "Event Section",
        footerSectionLabel: ""
    },
    component: Divider
};


