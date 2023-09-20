/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import {
	Bold,
	Code,
	Italic,
	Strikethrough,
	Subscript,
	Superscript,
	Underline
} from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
	AutoImage,
	Image,
	ImageInsert,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListProperties } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		AutoImage,
		BlockQuote,
		Bold,
		Code,
		Essentials,
		Heading,
		Image,
		ImageInsert,
		ImageToolbar,
		ImageUpload,
		Italic,
		Link,
		List,
		ListProperties,
		Paragraph,
		RemoveFormat,
		SourceEditing,
		Strikethrough,
		Subscript,
		Superscript,
		Underline
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'subscript',
				'superscript',
				'code',
				'|',
				'removeFormat',
				'|',
				'bulletedList',
				'numberedList',
				'|',
				'blockQuote',
				'|',
				'link',
				'imageInsert',
				'imageUpload',
				'sourceEditing'
			]
		},
		language: 'vi',
		image: {
			toolbar: [
				'imageTextAlternative'
			]
		}
	};
}

export default Editor;
