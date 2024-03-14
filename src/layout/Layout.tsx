import { Layout, LayoutProps } from 'react-admin';
import { MyAppBar } from './AppBarr';
import Menu from './Menu';

export const MyLayout = (props: LayoutProps) => (
    <Layout {...props} appBar={MyAppBar} menu={Menu} />
);