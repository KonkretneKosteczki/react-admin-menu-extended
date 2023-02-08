import React from 'react';
import {Admin, Datagrid, List, Resource, Show, SimpleShowLayout, TextField} from 'react-admin';
import fakeRestDataProvider from 'ra-data-fakerest';
import subFromDate from 'date-fns/sub';
import { Menu } from '../menu';
import {MenuItem} from "./menu-item";

export default {title: 'react-admin-menu-extended/MenuItemLayout'};

const today = new Date();
const dataProvider = fakeRestDataProvider(
    {
        events: [
            {
                id: 1,
                resource: 'products',
                action: 'create',
                date: subFromDate(today, {seconds: 30}).toISOString(),
                payload: {data: {id: 123, name: 'SkyLine Poster'}},
                author: {
                    id: 123,
                    fullName: 'Thomas A. Anderson',
                    avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
                },
            },
            {
                id: 2,
                resource: 'orders',
                action: 'create',
                date: subFromDate(today, {days: 1}).toISOString(),
                payload: {data: {id: 456, reference: '#123456'}},
                author: {
                    id: 789,
                    fullName: 'Takeshi Kovacs',
                    avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
                },
            },
            {
                id: 3,
                resource: 'products',
                action: 'update',
                date: subFromDate(today, {weeks: 1}).toISOString(),
                payload: {
                    id: 789,
                    data: {id: 789, name: 'NewYork SkyLine Poster'},
                    previousData: {id: 789, name: 'SkyLine Poster'},
                },
                author: {
                    id: 789,
                    fullName: 'Takeshi Kovacs',
                    avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
                },
            },
            {
                id: 4,
                resource: 'reviews',
                action: 'updateMany',
                date: subFromDate(today, {months: 2}).toISOString(),
                payload: {
                    ids: [234, 345, 567],
                },
                author: {
                    id: 890,
                    fullName: 'Henry Dorsett Case',
                },
            },
        ],
        users: [
            {
                id: 123,
                fullName: 'Thomas A. Anderson',
                avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
            },
            {
                id: 789,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
            {
                id: 890,
                fullName: 'Henry Dorsett Case',
            },
        ],
    },
    true
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

export const ResourceItemsAndLinks: React.FC = () => (
    <Admin
        dataProvider={dataProvider}
        menu={() => (
            <Menu>
                <MenuItem name="users" />
                <MenuItem name="events" />
                <MenuItem to="/events/1/show" primaryText="Event #1" />
                <MenuItem to="/events/2/show" primaryText="Event #2" />
            </Menu>
        )}
    >
        <Resource name="events" list={ListView} show={ShowView} options={{label: "Events resource"}}/>
        <Resource name="users" list={ListView} options={{label: "Users resource"}}/>
    </Admin>
);

export const SubMenu: React.FC = () => (
    <Admin
        dataProvider={dataProvider}
        menu={() => (
            <Menu>
                <MenuItem name="users" />
                <MenuItem name="events">
                    <MenuItem to="/events/1/show" primaryText="Event #1" />
                    <MenuItem to="/events/2/show" primaryText="Event #2" />
                </MenuItem>
                <MenuItem to="/events" primaryText="Events Link">
                    <MenuItem to="/events/1/show" primaryText="Event #1" />
                    <MenuItem to="/events/2/show" primaryText="Event #2" />
                </MenuItem>
                <MenuItem primaryText="Folder with no action">
                    <MenuItem to="/events/1/show" primaryText="Event #1" />
                    <MenuItem to="/events/2/show" primaryText="Event #2" />
                </MenuItem>
                <MenuItem primaryText="Button with onClick" onClick={() => alert("Pressed Button")} />
            </Menu>
        )}
    >
        <Resource name="events" list={ListView} show={ShowView} options={{label: "Events resource"}}/>
        <Resource name="users" list={ListView} show={ShowView} options={{label: "Users resource"}}/>
    </Admin>
)
