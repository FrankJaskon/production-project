import { Meta, StoryFn } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { AppThemes } from '@/shared/config/theme/ThemeContext'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { Sidebar } from './Sidebar'

export default {
	title: 'app/Sidebar',
	component: Sidebar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [
		StoreDecorator({}),
		(Story: StoryFn) => <MainLayout sidebar={<Story />} header={<div />} content={<div />} />,
	],
} as Meta<typeof Sidebar>

const Template: StoryFn<typeof Sidebar> = args => <Sidebar {...args} />

export const Basic: StoryFn = Template.bind({})

export const SidebarAuthorized: StoryFn = Template.bind({})
SidebarAuthorized.decorators = [StoreDecorator({ user: { authData: {} } })]

export const DarkTheme: StoryFn = Template.bind({})
DarkTheme.decorators = [ThemeDecorator(AppThemes.DARK)]

export const PurpleTheme: StoryFn = Template.bind({})
PurpleTheme.decorators = [ThemeDecorator(AppThemes.PURPLE)]
