import MyTokens from "../pages/MyTokens";
import AllTokens from "../pages/AllTokens";
import TokenIdPage from "../pages/TokenIdPage"
import ViteConnectBox from "../pages/ViteConnectBox";

export const privateRoutes = [
    {path: '/mytokens', component: MyTokens, exact: true},
    {path: '/alltokens', component: AllTokens, exact: true},
    {path: '/mytokens/:id', component: TokenIdPage, exact: true, props: true}
]

export const publicRoutes = [
    {path: '/connect', component: ViteConnectBox, exact: true},
]