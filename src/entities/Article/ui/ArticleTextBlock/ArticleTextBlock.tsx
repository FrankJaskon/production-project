import { FC, memo, useMemo } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text'
import cls from './ArticleTextBlock.module.scss'
import { VStack } from 'shared/ui/Stack'

export interface ArticleTextBlockProps {
	className?: string
	paragraphs?: string[]
	title?: string
}

export const ArticleTextBlock: FC<ArticleTextBlockProps> = memo((props: ArticleTextBlockProps) => {
	const {
		className,
		paragraphs,
		title,
	} = props

	const content = useMemo(() => (
		paragraphs?.map(p => <Text
			className={cls.paragraph}
			content={p}
			key={p}
			align='justify'
		/>)
	), [paragraphs])

	return (
		<VStack
			className={classNames('', {}, [className])}
			gap='gap12'
		>
			{title && <Text
				title={title}
			/>}
			{content}
		</VStack>
	)
})