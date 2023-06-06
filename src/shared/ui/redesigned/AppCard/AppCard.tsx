import { HTMLAttributes, memo, ReactNode } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
import cls from './AppCard.module.scss'

export type CardVariant = 'normal' | 'outlined' | 'light'
export type CardPadding = '0' | '8' | '16' | '24'
export type CardBorder = 'small' | 'big' | 'bigger'

interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string
	children: ReactNode
	variant?: CardVariant
	max?: boolean
	padding?: CardPadding
	radius?: CardBorder
}

const mapPaddingToClass: Record<CardPadding, string> = {
	'0': 'gap_0',
	'8': 'gap_8',
	'16': 'gap_16',
	'24': 'gap_24',
}

export const AppCard = memo((props: AppCardProps) => {
	const {
		className,
		children,
		variant = 'normal',
		max,
		padding = '8',
		radius = 'small',
		...otherProps
	} = props

	const paddingClass = mapPaddingToClass[padding]

	return (
		<div
			className={classNames(cls.Card, { [cls.max]: max }, [
				className,
				cls[variant],
				cls[paddingClass],
				cls[radius],
			])}
			{...otherProps}
		>
			{children}
		</div>
	)
})