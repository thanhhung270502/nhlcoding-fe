import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './test.module.scss';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function Test() {
    const [markdown, setMarkdown] = useState('# Markdown Preview');
    return (
        <main>
            <section className={style.markdown}>
                <textarea
                    className={style.input}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                ></textarea>
                <article className={style.result}>
                    <ReactMarkdown
                        children={markdown}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <SyntaxHighlighter
                                        {...props}
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        PreTag="div"
                                    />
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                </article>
            </section>
        </main>
    );
}

export default Test;
