import React, { useEffect, useState } from 'react';
import style from './editorial.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Editorial = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        import('./solution.md').then((res) => {
            fetch(res.default)
                .then((res) => res.text())
                .then((res) => setMarkdown(res))
                .catch((err) => console.log(err));
        });
    }, []);

    return (
        <div className={style.container}>
            <div className={style.title}>Solution Article</div>
            {/* <div className={style.approach}>
                <div className={style.subtitle}>Algorithm</div>
                <div className={style.normal_text}>
                    The brute force approach is simple. Loop through each element x and find if there is another value
                    that equals to target-x.
                </div>
                <div className={style.subtitle}>Implementation</div>
                <div className={style.code_block}>
                    <SyntaxHighlighter children={markdown} language="cpp" style={{}} />
                </div>
                <div className={style.subtitle}>Complexity Analysis</div>
                <ul className={style.normal_text}>
                    <li>
                        Time complexity: O(n^2).
                        <br />
                        For each element, we try to find its complement by looping through the rest of the array which
                        takes O(n) time. Therefore, the time complexity is O(n^2).
                    </li>
                    <li>
                        Space complexity: O(1). The space required does not depend on the size of the input array, so
                        only constant space is used.
                    </li>
                </ul>
            </div> */}
            <div className={style.approach}>
                <ReactMarkdown
                    children={markdown}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                                <div style={{ overflowY: 'auto' }}>
                                    <div className={style.subtitle}>{match[1]}</div>
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
                        h1({ node, children }) {
                            return <h1 className={style.subtitle}>{children}</h1>;
                        },
                        p({ node, children }) {
                            return <p className={style.normal_text}>{children}</p>;
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Editorial;
