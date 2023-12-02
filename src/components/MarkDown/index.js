import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { useEffect, useState } from 'react';
import style from './markdown.module.scss';

const MarkDown = ({ text }) => {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            <ReactMarkdown
                children={text}
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <div style={{ overflowY: 'auto' }}>
                                {/* <h5>{match[1]}</h5> */}
                                <SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    className={`${style.code_block} ${className}`}
                                    PreTag="div"
                                />
                            </div>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        );
                    },
                    table({ children }) {
                        return (
                            <table className={style.table}>{children}</table>
                        )
                    },
                    th({ children }) {
                        return (
                            <th className={style.th}>{children}</th>
                        )
                    },
                    td({ children }) {
                        return (
                            <td className={style.td}>{children}</td>
                        )
                    },
                    tr({ children }) {
                        return (
                            <tr className={style.tr}>{children}</tr>
                        )
                    },
                    a({ href, children }) {
                        return (
                            <a href={href} className={style.a}>{children}</a>
                        )
                    }
                }}
            />
        </div>
    );
}

export default MarkDown;