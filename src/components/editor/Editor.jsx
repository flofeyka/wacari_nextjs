import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useState } from 'react';
import Link from '@tiptap/extension-link'
import "./editor.scss";

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';

const MenuBar = ({ onMenuBarChange }) => {

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('Напишите ссылку которую хотите вставить', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])

    const { editor } = useCurrentEditor()

    const handleMenuBarChange = () => {
        onMenuBarChange(editor.getHTML());
    };

    if (!editor) {
        return null
    }

    const update = () => {
        onChange(editor.getHTML)
    }



    return (
        <div className='editor-btn'>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                h1
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                h2
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                h3
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
                h4
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
                h5
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
                h6
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                paragraph
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FormatBoldIcon />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FormatItalicIcon />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <StrikethroughSIcon />
            </button>

            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <FormatListBulletedIcon />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <FormatListNumberedIcon />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <FormatQuoteIcon />
            </button>
            <button type='button' onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                <LinkIcon />
            </button>
        </div>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
    }),

]


const Editor = ({ content, onUpdateEditor }) => {
    const onMenuBarChange = (newText) => {
        onUpdateEditor(newText);
    }

    return (
        <div className="editor">
            <EditorProvider
                slotBefore={<MenuBar onMenuBarChange={onMenuBarChange} />}
                extensions={extensions}
                content={content}
                onUpdate={({ editor }) => {
                    onMenuBarChange(editor.getHTML());
                }}

            >

            </EditorProvider>
        </div>
    )
}

export default Editor