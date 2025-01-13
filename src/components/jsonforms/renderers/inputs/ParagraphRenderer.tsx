// components/jsonforms/renderers/inputs/ParagraphRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { type ControlProps, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

// @ts-ignore
interface ParagraphRendererProps extends ControlProps {
    // noinspection Annotator
    uischema: {
        type: string;
        text?: string;
        options?: {
            format?: 'plain' | 'html' | 'markdown';
        };
    };
}

const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
    uischema,
    data,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const text = uischema.text || '';
    const options = uischema.options || {};
    const format = options.format || 'plain';

    const replaceVariables = (text: string, data: any): string => {
        return text.replace(/\{\{(\w+)}}/g, (match, variable) => {
            return data[variable] !== undefined
                ? String(data[variable])
                : match;
        });
    };

    const renderedText = replaceVariables(text, data);

    const renderContent = () => {
        switch (format) {
            case 'html':
                return (
                    <div
                        className="mb-1"
                        dangerouslySetInnerHTML={{ __html: renderedText }}
                    />    
                );
            case 'markdown':
                return (
                    <div className="mb-1">
                        <ReactMarkdown>{renderedText}</ReactMarkdown>
                    </div>
                );
            default:
                return <p className="mb-1">{renderedText}</p>;
        }
    };

    return renderContent();
};

const tester = rankWith(3, uiTypeIs('Text'));

ParagraphRenderer.displayName = 'Paragraph';

export default {
    tester,
    // @ts-ignore
    renderer: withJsonFormsControlProps(ParagraphRenderer),
    noPropsRenderer: ParagraphRenderer
};