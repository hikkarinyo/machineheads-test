import { Redirect, Route, Switch } from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router'
import AuthorsPage from 'pages/AuthorsPage'
import LoginPage from 'pages/LoginPage'
import PostsPage from 'pages/PostsPage/PostsPage'
import TagsPage from 'pages/TagsPage'

import Dashboard from 'components/dashboard/Dashboard'

import PrivateRoutes from 'routes/PrivateRoutes'
import { RoutesEnum } from 'routes/RoutesEnum'
import { useAppSelector } from 'store/store'
import { history } from 'store/store'


const RootRouter = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/">
                    {isAuthenticated ? <Redirect to={RoutesEnum.Posts} /> : <Redirect to={RoutesEnum.Auth} />}
                </Route>

                <Route path={RoutesEnum.Auth}>
                    <LoginPage />
                </Route>

                <Route
                    path={RoutesEnum.Posts}
                    render={() => (
                        <PrivateRoutes>
                            <Dashboard>
                                <PostsPage />
                            </Dashboard>
                        </PrivateRoutes>
                    )}
                />

                <Route
                    path={RoutesEnum.Authors}
                    render={() => (
                        <PrivateRoutes>
                            <Dashboard>
                                <AuthorsPage />
                            </Dashboard>
                        </PrivateRoutes>
                    )}
                />

                <Route
                    path={RoutesEnum.Tags}
                    render={() => (
                        <PrivateRoutes>
                            <Dashboard>
                                <TagsPage />
                            </Dashboard>
                        </PrivateRoutes>
                    )}
                />

                <Route path={RoutesEnum.Another}>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </ConnectedRouter>
    )
}

export default RootRouter
