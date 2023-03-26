import { ArticleType } from '../../model/types/ArticleDetailsScheme'
import { FC, memo, useCallback } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ValueOf } from 'shared/config/types/types'
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton'

export interface ArticleListProps {
	className?: string
	articles: ArticleType[]
	isLoading?: boolean
	view?: ViewVariantType
	limit?: number
}

export const ViewVariant = {
	GRID: 'grid',
	LIST: 'list'
} as const

export type ViewVariantType = ValueOf<typeof ViewVariant>

export const ArticleList: FC<ArticleListProps> = memo((props: ArticleListProps) => {
	const {
		className,
		articles,
		view = ViewVariant.GRID,
		isLoading,
		limit = view === ViewVariant.GRID ? 9 : 3
	} = props

	const renderArticle = useCallback((article: ArticleType) => (
		<ArticleListItem
			key={article.id}
			article={article}
			view={view}
		/>
	), [view])

	const getSkeletons = useCallback((view: ViewVariantType) => {
		return new Array(limit)
			.fill(0).map((_, index) => <ArticleListItemSkeleton
				key={index}
				view={view}
			/>)
	}, [limit])

	return (
		<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
			{articles && articles.length > 0
				? articles.map(renderArticle)
				: null
			}
			{isLoading && getSkeletons(view)}
		</div>
	)
})