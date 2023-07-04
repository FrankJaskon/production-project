import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useHover,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	useDelayGroup,
	useDelayGroupContext,
	useMergeRefs,
	FloatingPortal,
	useId,
	useTransitionStyles,
} from '@floating-ui/react'
import * as React from 'react'
import cls from './AppTooltip.module.scss'
import type { Placement } from '@floating-ui/react'

interface TooltipOptions {
	initialOpen?: boolean
	placement?: Placement
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function useTooltip({
	initialOpen = false,
	placement = 'top',
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean | undefined>(initialOpen)

	const { delay } = useDelayGroupContext()

	const open = controlledOpen ?? uncontrolledOpen

	React.useEffect(() => {
		if (controlledOpen !== undefined) {
			setUncontrolledOpen(undefined)
		}
	}, [controlledOpen])

	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'start',
				padding: 5,
			}),
			shift({ padding: 5 }),
		],
	})

	const context = data.context

	const hover = useHover(context, {
		move: false,
		enabled: controlledOpen == null,
		delay,
	})
	const focus = useFocus(context, {
		enabled: controlledOpen == null,
	})
	const dismiss = useDismiss(context)
	const role = useRole(context, { role: 'tooltip' })

	const interactions = useInteractions([hover, focus, dismiss, role])

	return React.useMemo(
		() => ({
			open,
			setOpen,
			...interactions,
			...data,
		}),
		[open, setOpen, interactions, data]
	)
}

type ContextType = ReturnType<typeof useTooltip> | null

const TooltipContext = React.createContext<ContextType>(null)

export const useTooltipState = () => {
	const context = React.useContext(TooltipContext)

	if (context == null) {
		throw new Error('Tooltip components must be wrapped in <Tooltip />')
	}

	return context
}

export const useTooltipContext = () => {
	const context = React.useContext(TooltipContext)

	if (context == null) {
		throw new Error('Tooltip components must be wrapped in <Tooltip />')
	}

	return context
}

export function Tooltip({ children, ...options }: { children: React.ReactNode } & TooltipOptions) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const tooltip = useTooltip(options)
	return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>
}

export type TriggerElementType = 'button' | 'div'

interface CommonTriggerProps {
	closeOnClick?: boolean
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, CommonTriggerProps {
	as?: 'button'
}

interface DivProps extends React.HTMLAttributes<HTMLDivElement>, CommonTriggerProps {
	as: 'div'
}

type TriggerProps = ButtonProps | DivProps

export const TooltipTrigger = React.forwardRef<HTMLElement, TriggerProps & { asChild?: boolean }>(
	function TooltipTrigger(
		{ children, asChild = false, as = 'button', closeOnClick = true, ...props },
		propRef
	) {
		const state = useTooltipState()
		const childrenRef = (children as any).ref
		const ref = useMergeRefs([state.refs.setReference, propRef, childrenRef])

		const closeTooltip = React.useCallback(() => {
			closeOnClick && state.setOpen(false)
		}, [closeOnClick, state])

		// `asChild` allows the user to pass any element as the anchor
		if (asChild && React.isValidElement(children)) {
			return React.cloneElement(
				children,
				state.getReferenceProps({
					ref,
					...props,
					...children.props,
					'data-state': state.open ? 'open' : 'closed',
				})
			)
		}

		if (as === 'div') {
			return (
				<div
					ref={ref}
					// The user can style the trigger based on the state
					data-state={state.open ? 'open' : 'closed'}
					{...state.getReferenceProps(props)}
					onClick={closeTooltip}
				>
					{children}
				</div>
			)
		}

		return (
			<button
				ref={ref}
				// The user can style the trigger based on the state
				data-state={state.open ? 'open' : 'closed'}
				{...state.getReferenceProps(props)}
				onClick={closeTooltip}
			>
				{children}
			</button>
		)
	}
)

interface TooltipContentProps extends React.HTMLProps<HTMLDivElement> {
	style?: React.CSSProperties
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
	function TooltipContent(props, propRef) {
		const state = useTooltipState()
		const ref = useMergeRefs([state.refs.setFloating, propRef])
		const id = useId()
		const { isInstantPhase, currentId } = useDelayGroupContext()

		const instantDuration = 0
		const duration = 250

		useDelayGroup(state.context, { id })

		const { isMounted, styles } = useTransitionStyles(state.context, {
			duration: isInstantPhase
				? {
						open: instantDuration,
						// `id` is this component's `id`
						// `currentId` is the current group's `id`
						close: currentId === id ? duration : instantDuration,
				  }
				: duration,
			initial: {
				opacity: 0,
			},
		})

		if (!isMounted) return null

		return (
			<FloatingPortal>
				<div
					ref={ref}
					style={{
						...state.floatingStyles,
						...props.style,
						...styles,
					}}
					{...state.getFloatingProps(props)}
				/>
			</FloatingPortal>
		)
	}
)

export interface AppTooltipProps extends CommonTriggerProps {
	children: React.ReactNode
	tooltip: React.ReactNode
	open?: boolean
	setOpen?: (open: boolean) => void
	as?: TriggerElementType
}

export const AppTooltip: React.FC<AppTooltipProps> = React.memo((props: AppTooltipProps) => {
	const { tooltip, children, open, setOpen, as, closeOnClick } = props

	if (!tooltip) {
		return <>{children}</>
	}

	return (
		<Tooltip open={open} onOpenChange={setOpen}>
			<TooltipTrigger as={as} closeOnClick={closeOnClick}>
				{children}
			</TooltipTrigger>
			<TooltipContent className={cls.Tooltip}>{tooltip}</TooltipContent>
		</Tooltip>
	)
})
