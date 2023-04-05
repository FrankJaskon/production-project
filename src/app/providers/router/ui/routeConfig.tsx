import { AboutPage } from 'pages/AboutPage'
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { EditArticlePage } from 'pages/EditArticlePage'
import { MainPage } from 'pages/MainPage'
import { NotFound } from 'pages/NotFound'
import { ProfilePage } from 'pages/ProfilePage'
import { RouteProps } from 'react-router-dom'
import { RoutePaths } from 'shared/config/RoutePaths/RoutPaths'

export type AuthRouteProps = RouteProps & {
	authOnly?: boolean
}

export const routerConfig: AuthRouteProps[] = [
	{
		path: RoutePaths.main,
		element: <MainPage />
	},
	{
		path: RoutePaths.about,
		element: <AboutPage />
	},
	{
		path: `${RoutePaths.profiles}:id`,
		element: <ProfilePage />,
		authOnly: true
	},
	{
		path: RoutePaths.articles,
		element: <ArticlesPage />,
		authOnly: true
	},
	{
		path: `${RoutePaths.articles_details}:id`,
		element: <ArticleDetailsPage />,
		authOnly: true
	},
	{
		path: RoutePaths.articles_details_edit,
		element: <EditArticlePage />,
		authOnly: true
	},
	{
		path: RoutePaths.articles_details_new,
		element: <EditArticlePage />,
		authOnly: true
	},

	// last
	{
		path: RoutePaths.not_found,
		element: <NotFound />
	}
]