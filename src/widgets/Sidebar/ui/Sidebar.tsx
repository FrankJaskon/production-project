import { FC, memo, useMemo, useState } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import { AppButton, ButtonShape, ButtonSize, ButtonVariant } from 'shared/ui/AppButton'
import { LanguageToggler } from 'features/LanguageToggler'
import { ThemeToggler } from 'features/ThemeToggler'
import cls from './Sidebar.module.scss'
import { SidebarLink } from './SidebarLink/SidebarLink'
import { useSelector } from 'react-redux'
import { getSidebarItem } from '../model/selectors/getSidebarItem'
import { HStack, VStack } from 'shared/ui/Stack'

interface SidebarProps {
	className?: string
}

export const Sidebar: FC<SidebarProps> = memo((props: SidebarProps) => {
	const { className } = props
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
	const sidebarLinks = useSelector(getSidebarItem)

	const toggleSidebar = () => {
		setIsCollapsed(prev => !prev)
	}

	const renderLinks = useMemo(() => {
		return (
			sidebarLinks.map((item) => {
				return <SidebarLink
					key={item.path}
					item={item}
					collapsed={isCollapsed}
				/>
			})
		)
	}, [isCollapsed, sidebarLinks])

	return <aside
		data-testid='sidebar'
		className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [className])}>
		<VStack
			align={isCollapsed ? 'center' : 'start'}
			className={cls.menu}
			innerWidth={isCollapsed ? undefined : 'full'}
		>
			{renderLinks}
		</VStack>
		<AppButton
			data-testid='sidebar-toggler'
			className={cls.toggler}
			variant={ButtonVariant.CUSTOM}
			size={ButtonSize.L}
			shape={ButtonShape.SQUARE}
			onClick={toggleSidebar}>
			{isCollapsed ? '>' : '<'}
		</AppButton>
		{isCollapsed
			? <VStack
				justify='center'
				align='center'
				className={cls.buttonGroup}
			>
				<ThemeToggler className={cls.themeToggler} />
				<LanguageToggler
					className={classNames(
						cls.languageToggler,
						{ [cls.collapsed]: isCollapsed })}
					short={isCollapsed}
				/>
			</VStack>
			: <HStack
				justify='center'
				align='center'
				className={cls.buttonGroup}
			>
				<ThemeToggler className={cls.themeToggler} />
				<LanguageToggler
					className={classNames(
						cls.languageToggler,
						{ [cls.collapsed]: isCollapsed })}
					short={isCollapsed}
				/>
			</HStack>
		}
	</aside>
})