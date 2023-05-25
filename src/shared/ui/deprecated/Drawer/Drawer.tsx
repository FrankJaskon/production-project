import { memo, ReactNode, useCallback, useEffect } from 'react'
import useTheme from '@/shared/config/theme/useTheme'
import classNames from '@/shared/lib/classNames/classNames'
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider'
import { ToggleFeatures } from '@/shared/lib/features'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal'
import cls from './Drawer.module.scss'

/**
 * This component was deprecated. It is recommended to use component from the redesigned folder
 * @deprecated
 */

interface DrawerProps {
	className?: string
	children: ReactNode
	isOpen?: boolean
	onClose?: () => void
}

const height = window.innerHeight - 100

export const DrawerContent = memo((props: DrawerProps) => {
	const { Spring, Gesture } = useAnimationLibs()
	const [{ y }, api] = Spring.useSpring(() => ({ y: height }))
	const { theme } = useTheme()
	const { className, children, onClose, isOpen } = props

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false })
	}, [api])

	useEffect(() => {
		if (isOpen) {
			openDrawer()
		}
	}, [api, isOpen, openDrawer])

	const close = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onClose,
		})
	}

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
			if (my < -70) cancel()

			if (last) {
				if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
					close()
				} else {
					openDrawer()
				}
			} else {
				api.start({ y: my, immediate: true })
			}
		},
		{
			from: () => [0, y.get()],
			filterTaps: true,
			bounds: { top: 0 },
			rubberband: true,
		}
	)

	if (!isOpen) {
		return null
	}

	const display = y.to(py => (py < height ? 'block' : 'none'))

	return (
		<ToggleFeatures
			feature='isAppRedesigned'
			on={
				<Portal>
					<Spring.a.div>
						<div
							className={classNames(cls.Drawer, {}, [
								className,
								theme,
								'app_drawer',
								'App-redesign',
							])}
						>
							<Overlay onClick={() => close()} />
							<Spring.a.div
								className={cls.sheet}
								style={{
									display,
									bottom: `calc(-100vh + ${height - 100}px)`,
									y,
								}}
								{...bind()}
							>
								{children}
							</Spring.a.div>
						</div>
					</Spring.a.div>
				</Portal>
			}
			off={
				<Portal>
					<Spring.a.div>
						<div
							className={classNames(cls.Drawer, {}, [
								className,
								theme,
								'app_drawer',
								'App',
							])}
						>
							<Overlay onClick={() => close()} />
							<Spring.a.div
								className={cls.sheet}
								style={{
									display,
									bottom: `calc(-100vh + ${height - 100}px)`,
									y,
								}}
								{...bind()}
							>
								{children}
							</Spring.a.div>
						</div>
					</Spring.a.div>
				</Portal>
			}
		/>
	)
})

const DrawerAsync = (props: DrawerProps) => {
	const { isLoaded } = useAnimationLibs()

	if (!isLoaded) {
		return null
	}

	return <DrawerContent {...props} />
}

export const Drawer = (props: DrawerProps) => {
	return (
		<AnimationProvider>
			<DrawerAsync {...props} />
		</AnimationProvider>
	)
}
