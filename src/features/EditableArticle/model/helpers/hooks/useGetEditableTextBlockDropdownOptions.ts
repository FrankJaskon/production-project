import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch'
import { randomInteger } from '@/shared/lib/randomInteger/randomInteger'
import { NestedItem } from '@/shared/ui/redesigned/Popups/Dropdown/NestedDropdownItem/NestedDropdownItem'
import { ArticleOptionDropdownItem } from '../../../ui/EditableArticleOptions/OptionsDropdown/redesigned/OptionsDropdown'
import { editableArticleActions } from '../../slice/editableArticleSlice'
import { InsertDirectionType } from '../../types/editableArticleScheme'

export type UseGetEditableTextBlockDropdownOptionsType = (
	id: number,
	isTitle: boolean
) => (ArticleOptionDropdownItem | NestedItem)[][]

export const useGetEditableTextBlockDropdownOptions: UseGetEditableTextBlockDropdownOptionsType = (
	targetId,
	isTitle
) => {
	const { t } = useTranslation('article')
	const dispatch = useAppDispatch()

	const startArguments: { to: InsertDirectionType; id?: number } = { to: 'start', id: targetId }
	const endArguments: { to: InsertDirectionType; id?: number } = { to: 'end', id: targetId }

	return [
		[
			{
				trigger: {
					content: t('editable-article.options.move-option'),
				},
				options: [
					{
						content: t('editable-article.options.move-up'),
						onClick: () => {
							dispatch(editableArticleActions.moveEditableBlock(startArguments))
						},
						disabled: false,
					},
					{
						content: t('editable-article.options.move-down'),
						onClick: () => {
							dispatch(editableArticleActions.moveEditableBlock(endArguments))
						},
						disabled: false,
					},
				],
			},
		],
		[
			{
				trigger: {
					content: t('editable-article.options.add-option'),
				},
				options: [
					{
						content: t('editable-article.options.add-text-title'),
						onClick: () => {
							dispatch(
								editableArticleActions.setTextBlock({
									id: targetId,
									hasTitle: true,
									title: '',
								})
							)
						},
						disabled: isTitle,
					},
					{
						content: t('editable-article.options.add-text-paragraph'),
						onClick: () => {
							dispatch(
								editableArticleActions.setTextBlockParagraph({
									blockId: targetId,
									paragraphId: randomInteger(),
									value: '',
								})
							)
						},
					},
					{
						trigger: { content: t('editable-article.options.block-option') },
						options: [
							{
								trigger: {
									content: t('editable-article.options.add-text-block'),
								},
								options: [
									{
										content: t('editable-article.options.before'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewTextBlock(
													startArguments
												)
											)
										},
										disabled: false,
									},
									{
										content: t('editable-article.options.after'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewTextBlock(endArguments)
											)
										},
										disabled: false,
									},
								],
							},
							{
								trigger: {
									content: t('editable-article.options.add-img-block'),
								},
								options: [
									{
										content: t('editable-article.options.before'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewImageBlock(
													startArguments
												)
											)
										},
										disabled: false,
									},
									{
										content: t('editable-article.options.after'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewImageBlock(
													endArguments
												)
											)
										},
										disabled: false,
									},
								],
							},
							{
								trigger: {
									content: t('editable-article.options.add-code-block'),
								},
								options: [
									{
										content: t('editable-article.options.before'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewCodeBlock(
													startArguments
												)
											)
										},
										disabled: false,
									},
									{
										content: t('editable-article.options.after'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewCodeBlock(endArguments)
											)
										},
										disabled: false,
									},
								],
							},
							{
								trigger: {
									content: t('editable-article.options.add-video-block'),
								},
								options: [
									{
										content: t('editable-article.options.before'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewVideoBlock(
													startArguments
												)
											)
										},
										disabled: false,
									},
									{
										content: t('editable-article.options.after'),
										onClick: () => {
											dispatch(
												editableArticleActions.addNewVideoBlock(
													endArguments
												)
											)
										},
										disabled: false,
									},
								],
							},
						],
					},
				],
			},
		],
		[
			{
				trigger: {
					content: t('editable-article.options.remove-option'),
				},
				options: [
					{
						content: t('editable-article.options.remove-text-title'),
						onClick: () => {
							dispatch(
								editableArticleActions.setTextBlock({
									id: targetId,
									hasTitle: false,
									title: '',
								})
							)
						},
						disabled: !isTitle,
					},
					{
						content: t('editable-article.options.remove-text-block'),
						onClick: () => {
							dispatch(editableArticleActions.removeBlock(targetId))
						},
					},
				],
			},
		],
	] as NestedItem[][]
}
