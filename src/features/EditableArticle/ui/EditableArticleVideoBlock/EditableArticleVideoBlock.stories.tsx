/* eslint-disable max-len */
import { Meta, StoryFn } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { AppThemes } from '@/shared/config/theme/ThemeContext'
import {
	EditableArticleVideoBlock,
	EditableArticleVideoBlockProps,
} from './EditableArticleVideoBlock'

export default {
	title: 'entities/Article/EditableArticleVideoBlock',
	component: EditableArticleVideoBlock,
	argTypes: {},
	args: {
		code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id='hello'></p>\n\n    <script>\n      document.getElementById('hello').innerHTML = 'Hello, world!';\n    </script>\n  </body>\n</html>;",
	},
	decorators: [StoreDecorator({})],
} as Meta<typeof EditableArticleVideoBlock>

const Template: StoryFn<typeof EditableArticleVideoBlock> = args => (
	<EditableArticleVideoBlock {...args} />
)

export const Basic: StoryFn<EditableArticleVideoBlockProps> = Template.bind({})
Basic.args = {}

export const DarkTheme: StoryFn<EditableArticleVideoBlockProps> = Template.bind({})
DarkTheme.args = {}
DarkTheme.decorators = [ThemeDecorator(AppThemes.DARK)]

export const PurpleTheme: StoryFn<EditableArticleVideoBlockProps> = Template.bind({})
PurpleTheme.args = {}
PurpleTheme.decorators = [ThemeDecorator(AppThemes.PURPLE)]
