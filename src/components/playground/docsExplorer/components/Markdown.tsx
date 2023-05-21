import React from 'react';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import styled from 'styled-components';

export const markdown = new MarkdownIt({
  breaks: true,
  linkify: true,
});

interface MarkdownProps {
  content: string;
}

const Content = styled.div`
  display: inline-block;

  & > p {
    margin: 0;
  }

  code {
    color: #201e1f;
    background: #f0f0f0;
    padding: 0 4px;
    border-radius: 4px;
  }
`;

export const Markdown = ({ content }: MarkdownProps) => {
  const html = markdown.render(content);
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <Content dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};
