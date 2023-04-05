import { ComponentStory, ComponentMeta, Story } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator'
import { AppThemes } from 'shared/config/theme/ThemeContext'
import { NotFound } from './NotFound'
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

export default {
	title: 'pages/NotFound',
	component: NotFound,
	argTypes: {},
	args: {},
	decorators: [StoreDecorator({})]
} as ComponentMeta<typeof NotFound>

const Template: ComponentStory<typeof NotFound> = (args) => <NotFound {...args} />

export const Basic: Story = Template.bind({})
Basic.args = {
}

export const DarkTheme: Story = Template.bind({})
DarkTheme.args = {
}
DarkTheme.decorators = [ThemeDecorator(AppThemes.DARK)]

export const PurpleTheme: Story = Template.bind({})
PurpleTheme.args = {
}
PurpleTheme.decorators = [ThemeDecorator(AppThemes.PURPLE)]